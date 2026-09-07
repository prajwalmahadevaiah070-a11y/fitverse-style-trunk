import { createFileRoute } from "@tanstack/react-router";
import { IndianRupee, PackagePlus, Trash2, TrendingUp, Truck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { GarmentSwatch } from "@/components/GarmentSwatch";
import { Screen } from "@/components/Screen";
import { useFitVerse } from "@/lib/fitverse-store";
import {
  CATEGORY_TREE,
  GENDERS,
  formatINR,
  type Gender,
  type Product,
} from "@/lib/fitverse-types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/retailer")({
  head: () => ({
    meta: [
      { title: "Retailer Portal — List Stock, Trials & Earnings | FitVerse" },
      {
        name: "description",
        content:
          "Upload garments, watch your live doorstep trial queue and track conversion and payouts from one retailer dashboard.",
      },
      { property: "og:title", content: "Retailer Portal | FitVerse" },
      {
        property: "og:description",
        content:
          "For Indian boutiques and weavers: list pieces, manage home trials and see earnings in real time.",
      },
    ],
  }),
  component: RetailerPage,
});

const TABS = ["Upload", "Trial queue", "Earnings"] as const;

const QUEUE = [
  {
    id: "FV-2291",
    customer: "Ananya R.",
    area: "Indiranagar, Bengaluru",
    slot: "Today · 6–8 PM",
    pieces: 3,
    status: "Stylist en route",
  },
  {
    id: "FV-2288",
    customer: "Kabir S.",
    area: "Bandra West, Mumbai",
    slot: "Today · 8–9 PM",
    pieces: 2,
    status: "Packed",
  },
  {
    id: "FV-2274",
    customer: "Meher K.",
    area: "Jubilee Hills, Hyderabad",
    slot: "Tomorrow · 11 AM",
    pieces: 4,
    status: "Awaiting pickup",
  },
  {
    id: "FV-2265",
    customer: "Devika N.",
    area: "Alipore, Kolkata",
    slot: "Returned",
    pieces: 4,
    status: "2 kept · 2 returned",
  },
];

const MONTHS = [
  { m: "Apr", v: 42 },
  { m: "May", v: 55 },
  { m: "Jun", v: 48 },
  { m: "Jul", v: 71 },
  { m: "Aug", v: 84 },
  { m: "Sep", v: 96 },
];

function RetailerPage() {
  const { sellerProducts, addSellerProduct, removeSellerProduct, hydrated } = useFitVerse();
  const [tab, setTab] = useState<(typeof TABS)[number]>("Upload");

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState<Gender>("women");
  const [category, setCategory] = useState("Ethnic");
  const [subcategory, setSubcategory] = useState("Sarees");
  const [price, setPrice] = useState("");
  const [mrp, setMrp] = useState("");
  const [fabric, setFabric] = useState("");
  const [colorName, setColorName] = useState("");
  const [swatchA, setSwatchA] = useState("#4b1027");
  const [swatchB, setSwatchB] = useState("#c39b52");
  const [sizes, setSizes] = useState("S, M, L");
  const [description, setDescription] = useState("");
  const [freeTryOn, setFreeTryOn] = useState(true);

  const tree = CATEGORY_TREE[gender];

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const p = Number(price);
    const m = Number(mrp) || p;
    if (!name.trim() || !brand.trim() || !p) {
      toast.error("Name, boutique and price are required");
      return;
    }
    const product: Product = {
      id: "seller-" + Math.random().toString(36).slice(2, 8),
      name: name.trim(),
      brand: brand.trim(),
      city: city.trim() || "India",
      gender,
      category,
      subcategory,
      price: p,
      mrp: Math.max(m, p),
      fabric: fabric.trim() || "As described by seller",
      colorName: colorName.trim() || "Custom",
      swatch: [swatchA, swatchB],
      sizes: sizes
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      rating: 4.5,
      reviews: 0,
      tryOnFee: freeTryOn ? 0 : 299,
      description: description.trim() || "Listed by the boutique for doorstep trials.",
      seller: true,
    };
    addSellerProduct(product);
    toast.success(`${product.name} is live in the marketplace`);
    setName("");
    setPrice("");
    setMrp("");
    setDescription("");
  };

  const earnings = 268400 + sellerProducts.length * 4200;

  return (
    <Screen
      eyebrow="Retailer Portal"
      title="Your boutique on FitVerse"
      subtitle="List stock in under a minute, track every doorstep trial and watch what converts."
    >
      <div className="hide-scrollbar -mx-4 mb-6 flex gap-2 overflow-x-auto px-4 md:mx-0 md:px-0">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "shrink-0 rounded-full border px-4 py-1.5 text-xs tracking-[0.14em] uppercase transition-colors",
              tab === t
                ? "border-transparent bg-gold-gradient text-primary-foreground"
                : "border-border text-muted-foreground",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Upload" && (
        <div className="grid gap-5 md:grid-cols-[1fr_1fr] md:items-start">
          <form onSubmit={submit} className="space-y-4 rounded-xl border border-border bg-card p-4">
            <p className="eyebrow flex items-center gap-1.5">
              <PackagePlus className="size-3.5" /> New listing
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Garment name" value={name} onChange={setName} />
              <Field label="Boutique / weaver" value={brand} onChange={setBrand} />
              <Field label="City" value={city} onChange={setCity} />
              <Field label="Fabric" value={fabric} onChange={setFabric} />
              <Field label="Selling price (₹)" value={price} onChange={setPrice} type="number" />
              <Field label="MRP (₹)" value={mrp} onChange={setMrp} type="number" />
              <Field label="Colour name" value={colorName} onChange={setColorName} />
              <Field label="Sizes (comma separated)" value={sizes} onChange={setSizes} />
            </div>

            <div>
              <p className="eyebrow mb-2">Audience</p>
              <div className="flex flex-wrap gap-2">
                {GENDERS.map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => {
                      setGender(g.id);
                      const firstCat = Object.keys(CATEGORY_TREE[g.id])[0]!;
                      setCategory(firstCat);
                      setSubcategory(CATEGORY_TREE[g.id][firstCat]![0]!);
                    }}
                    className={cn(
                      "rounded-full border px-3 py-1 text-xs",
                      gender === g.id ? "border-primary text-primary" : "border-border text-muted-foreground",
                    )}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="eyebrow mb-1.5 block">Category</span>
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setSubcategory(tree[e.target.value]![0]!);
                  }}
                  className="w-full rounded-lg border border-input bg-background p-2.5 text-sm"
                >
                  {Object.keys(tree).map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="eyebrow mb-1.5 block">Subcategory</span>
                <select
                  value={subcategory}
                  onChange={(e) => setSubcategory(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background p-2.5 text-sm"
                >
                  {(tree[category] ?? []).map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-xs">
                <span className="eyebrow">Swatch</span>
                <input
                  type="color"
                  value={swatchA}
                  onChange={(e) => setSwatchA(e.target.value)}
                  className="size-8 rounded border border-border bg-transparent"
                  aria-label="Primary colour"
                />
                <input
                  type="color"
                  value={swatchB}
                  onChange={(e) => setSwatchB(e.target.value)}
                  className="size-8 rounded border border-border bg-transparent"
                  aria-label="Accent colour"
                />
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={freeTryOn}
                  onChange={(e) => setFreeTryOn(e.target.checked)}
                  className="size-4 accent-[var(--gold)]"
                />
                Free doorstep try-on
              </label>
            </div>

            <label className="block">
              <span className="eyebrow mb-1.5 block">Description</span>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-lg border border-input bg-background p-3 text-sm outline-none focus:border-primary"
              />
            </label>

            <button
              type="submit"
              className="w-full rounded-lg bg-gold-gradient py-3 text-sm font-semibold tracking-[0.1em] text-primary-foreground uppercase shadow-gold"
            >
              Publish listing
            </button>
            <p className="text-center text-[0.6875rem] text-muted-foreground">
              Saved on this device — your listings appear across Browse and the Try-On Studio.
            </p>
          </form>

          <div>
            <p className="eyebrow mb-2">
              Your listings {hydrated ? `(${sellerProducts.length})` : ""}
            </p>
            {hydrated && sellerProducts.length === 0 ? (
              <p className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
                Nothing listed yet. Publish your first piece and it goes live instantly.
              </p>
            ) : (
              <ul className="space-y-2">
                {sellerProducts.map((p) => (
                  <li
                    key={p.id}
                    className="flex items-center gap-3 rounded-xl border border-border bg-card p-3"
                  >
                    <span
                      className="size-14 shrink-0 rounded-lg"
                      style={{ background: "var(--color-surface-raised)" }}
                    >
                      <GarmentSwatch product={p} className="size-full p-1.5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm">{p.name}</span>
                      <span className="eyebrow">
                        {p.subcategory} · {p.sizes.join(" / ")}
                      </span>
                      <span className="block text-sm text-primary">{formatINR(p.price)}</span>
                    </span>
                    <button
                      onClick={() => removeSellerProduct(p.id)}
                      aria-label={`Delist ${p.name}`}
                      className="grid size-8 place-items-center rounded-full bg-secondary text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {tab === "Trial queue" && (
        <ul className="space-y-2.5">
          {QUEUE.map((q) => (
            <li key={q.id} className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium">
                    {q.customer} · {q.pieces} pieces
                  </p>
                  <p className="eyebrow mt-1">{q.area}</p>
                  <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Truck className="size-3.5 text-primary" /> {q.slot}
                  </p>
                </div>
                <span className="rounded-full border border-primary/40 px-2.5 py-1 text-[0.625rem] tracking-[0.12em] text-primary uppercase">
                  {q.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}

      {tab === "Earnings" && (
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <Stat label="Payout this month" value={formatINR(earnings)} icon={IndianRupee} />
            <Stat label="Trials completed" value="128" icon={Truck} />
            <Stat label="Keep rate" value="61%" icon={TrendingUp} />
            <Stat label="Avg. order" value={formatINR(9450)} icon={IndianRupee} />
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="eyebrow mb-4">Monthly payouts (₹ thousands)</p>
            <div className="flex h-40 items-end gap-3">
              {MONTHS.map((mo) => (
                <div key={mo.m} className="flex flex-1 flex-col items-center gap-2">
                  <div
                    className="w-full rounded-t bg-gold-gradient"
                    style={{ height: `${mo.v}%` }}
                  />
                  <span className="eyebrow">{mo.m}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground">
            Next settlement lands <span className="text-foreground">Friday</span>. FitVerse retains
            an 8% commission on kept pieces and nothing on returns.
          </div>
        </div>
      )}
    </Screen>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="eyebrow mb-1.5 block">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-input bg-background p-2.5 text-sm outline-none focus:border-primary"
      />
    </label>
  );
}

function Stat({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: typeof IndianRupee;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-3.5">
      <Icon className="size-4 text-primary" />
      <p className="mt-2 text-lg font-semibold">{value}</p>
      <p className="eyebrow mt-0.5">{label}</p>
    </div>
  );
}
