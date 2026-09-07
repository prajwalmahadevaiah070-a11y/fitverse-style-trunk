import { createFileRoute } from "@tanstack/react-router";
import { SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";

import { ProductCard } from "@/components/ProductCard";
import { Screen } from "@/components/Screen";
import { useFitVerse } from "@/lib/fitverse-store";
import {
  CATEGORY_TREE,
  GENDERS,
  formatINR,
  type Gender,
} from "@/lib/fitverse-types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/browse")({
  head: () => ({
    meta: [
      { title: "Browse Indian Fashion by Gender & Category | FitVerse" },
      {
        name: "description",
        content:
          "Filter handcrafted Indian fashion by gender, category, size, price and free doorstep try-on across 18 curated pieces.",
      },
      { property: "og:title", content: "Browse Indian Fashion | FitVerse" },
      {
        property: "og:description",
        content:
          "Sarees, sherwanis, lehengas and streetwear from Indian ateliers — filter, try on at home, keep what fits.",
      },
    ],
  }),
  component: BrowsePage,
});

const SORTS = [
  { id: "featured", label: "Featured" },
  { id: "low", label: "Price ↑" },
  { id: "high", label: "Price ↓" },
  { id: "rating", label: "Top rated" },
] as const;

function BrowsePage() {
  const { products } = useFitVerse();
  const [gender, setGender] = useState<Gender | "all">("all");
  const [category, setCategory] = useState<string | null>(null);
  const [subcategory, setSubcategory] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState(70000);
  const [size, setSize] = useState<string | null>(null);
  const [freeOnly, setFreeOnly] = useState(false);
  const [sort, setSort] = useState<(typeof SORTS)[number]["id"]>("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const categories = gender === "all" ? null : CATEGORY_TREE[gender];
  const allSizes = useMemo(
    () => Array.from(new Set(products.flatMap((p) => p.sizes))),
    [products],
  );

  const results = useMemo(() => {
    const list = products.filter((p) => {
      if (gender !== "all" && p.gender !== gender) return false;
      if (category && p.category !== category) return false;
      if (subcategory && p.subcategory !== subcategory) return false;
      if (p.price > maxPrice) return false;
      if (size && !p.sizes.includes(size)) return false;
      if (freeOnly && p.tryOnFee !== 0) return false;
      return true;
    });
    if (sort === "low") return [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") return [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") return [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [products, gender, category, subcategory, maxPrice, size, freeOnly, sort]);

  const activeCount =
    (gender !== "all" ? 1 : 0) +
    (category ? 1 : 0) +
    (subcategory ? 1 : 0) +
    (size ? 1 : 0) +
    (freeOnly ? 1 : 0) +
    (maxPrice < 70000 ? 1 : 0);

  const reset = () => {
    setGender("all");
    setCategory(null);
    setSubcategory(null);
    setSize(null);
    setFreeOnly(false);
    setMaxPrice(70000);
  };

  return (
    <Screen
      eyebrow="The Edit"
      title="Browse the marketplace"
      subtitle={`${results.length} pieces from ateliers across India, each available for a doorstep trial.`}
      action={
        <button
          onClick={() => setFiltersOpen((v) => !v)}
          className="flex shrink-0 items-center gap-2 rounded-full border border-border px-3.5 py-2 text-xs tracking-[0.12em] uppercase transition-colors hover:border-primary/50"
        >
          <SlidersHorizontal className="size-3.5" />
          Filters
          {activeCount > 0 && (
            <span className="grid size-4 place-items-center rounded-full bg-gold-gradient text-[0.5625rem] font-semibold text-primary-foreground">
              {activeCount}
            </span>
          )}
        </button>
      }
    >
      <div className="hide-scrollbar -mx-4 mb-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:px-0">
        {(["all", ...GENDERS.map((g) => g.id)] as const).map((g) => (
          <button
            key={g}
            onClick={() => {
              setGender(g);
              setCategory(null);
              setSubcategory(null);
            }}
            className={cn(
              "shrink-0 rounded-full border px-4 py-1.5 text-xs tracking-[0.14em] uppercase transition-colors",
              gender === g
                ? "border-transparent bg-gold-gradient text-primary-foreground"
                : "border-border text-muted-foreground hover:text-foreground",
            )}
          >
            {g === "all" ? "Everyone" : GENDERS.find((x) => x.id === g)!.label}
          </button>
        ))}
      </div>

      {categories && (
        <div className="hide-scrollbar -mx-4 mb-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:px-0">
          {Object.keys(categories).map((c) => (
            <button
              key={c}
              onClick={() => {
                setCategory(category === c ? null : c);
                setSubcategory(null);
              }}
              className={cn(
                "shrink-0 rounded-md border px-3 py-1.5 text-xs transition-colors",
                category === c
                  ? "border-primary/60 text-primary"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {c}
            </button>
          ))}
          {category &&
            (categories[category] ?? []).map((s) => (
              <button
                key={s}
                onClick={() => setSubcategory(subcategory === s ? null : s)}
                className={cn(
                  "shrink-0 rounded-md px-3 py-1.5 text-xs transition-colors",
                  subcategory === s
                    ? "bg-primary/15 text-primary"
                    : "bg-secondary text-muted-foreground hover:text-foreground",
                )}
              >
                {s}
              </button>
            ))}
        </div>
      )}

      {filtersOpen && (
        <div className="mb-6 space-y-5 rounded-xl border border-border bg-card p-4">
          <div className="flex items-center justify-between">
            <p className="eyebrow">Refine</p>
            <button
              onClick={reset}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
            >
              <X className="size-3" /> Clear all
            </button>
          </div>
          <div>
            <label htmlFor="price" className="mb-2 block text-sm">
              Max price · <span className="text-primary">{formatINR(maxPrice)}</span>
            </label>
            <input
              id="price"
              type="range"
              min={1000}
              max={70000}
              step={500}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[var(--gold)]"
            />
          </div>
          <div>
            <p className="mb-2 text-sm">Size</p>
            <div className="flex flex-wrap gap-2">
              {allSizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(size === s ? null : s)}
                  className={cn(
                    "rounded-md border px-2.5 py-1 text-xs transition-colors",
                    size === s
                      ? "border-primary bg-primary/15 text-primary"
                      : "border-border text-muted-foreground",
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <label className="flex items-center gap-2.5 text-sm">
            <input
              type="checkbox"
              checked={freeOnly}
              onChange={(e) => setFreeOnly(e.target.checked)}
              className="size-4 accent-[var(--gold)]"
            />
            Free doorstep try-on only
          </label>
          <div>
            <p className="mb-2 text-sm">Sort</p>
            <div className="flex flex-wrap gap-2">
              {SORTS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSort(s.id)}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs transition-colors",
                    sort === s.id
                      ? "border-primary text-primary"
                      : "border-border text-muted-foreground",
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {results.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
          Nothing matches those filters yet. Try widening the price or size.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {results.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </Screen>
  );
}
