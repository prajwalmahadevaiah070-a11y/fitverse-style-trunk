import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Check, Sparkles, Star, Truck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { GarmentSwatch } from "@/components/GarmentSwatch";
import { ProductCard } from "@/components/ProductCard";
import { useFitVerse } from "@/lib/fitverse-store";
import { TRUNK_CAP, formatINR } from "@/lib/fitverse-types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$id")({
  head: () => ({
    meta: [
      { title: "Product Details & Home Try-On | FitVerse" },
      {
        name: "description",
        content:
          "See fabric, fit and pricing, layer the piece in the Try-On Studio, then add it to your Trial Trunk for a doorstep fitting.",
      },
      { property: "og:title", content: "Product Details | FitVerse" },
      {
        property: "og:description",
        content: "Fabric notes, sizes and a free doorstep try-on for handcrafted Indian fashion.",
      },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const { productById, products, addToTrunk, inTrunk, trunk } = useFitVerse();
  const product = productById(id);
  const [size, setSize] = useState<string | null>(null);

  if (!product) {
    return (
      <main className="mx-auto max-w-3xl px-4 pt-20 pb-28 text-center md:pt-28">
        <h1 className="text-2xl font-semibold">This piece is no longer listed</h1>
        <Link to="/browse" className="mt-4 inline-block text-sm text-primary underline">
          Back to browsing
        </Link>
      </main>
    );
  }

  const already = inTrunk(product.id);
  const similar = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const add = () => {
    const chosen = size ?? (product.sizes.length === 1 ? product.sizes[0]! : null);
    if (!chosen) {
      toast.error("Pick a size first");
      return;
    }
    const res = addToTrunk(product.id, chosen);
    if (res.ok) toast.success(`Added to Trial Trunk · ${trunk.length + 1}/${TRUNK_CAP}`);
    else if (res.reason === "cap")
      toast.error(`Your trunk holds ${TRUNK_CAP} pieces per visit. Remove one first.`);
    else toast.info("Already in your trunk");
  };

  return (
    <main className="mx-auto w-full max-w-3xl pb-32 md:max-w-5xl md:pt-20">
      <div
        className="fabric-sheen relative aspect-[4/5] w-full md:aspect-[16/9] md:rounded-2xl"
        style={{
          background: `radial-gradient(110% 80% at 40% 0%, ${product.swatch[0]}55, transparent), var(--color-surface)`,
        }}
      >
        <button
          onClick={() => navigate({ to: "/browse" })}
          className="absolute top-4 left-4 z-10 grid size-9 place-items-center rounded-full border border-border bg-background/70 backdrop-blur"
          aria-label="Go back"
        >
          <ArrowLeft className="size-4" />
        </button>
        <GarmentSwatch product={product} className="absolute inset-0 size-full p-12" />
      </div>

      <div className="px-4 md:px-0">
        <p className="eyebrow mt-5">
          {product.brand} · {product.city}
        </p>
        <h1 className="mt-1.5 text-3xl leading-tight font-semibold">{product.name}</h1>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <span className="text-2xl font-semibold text-primary">{formatINR(product.price)}</span>
          <span className="text-sm text-muted-foreground line-through">
            {formatINR(product.mrp)}
          </span>
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            <Star className="size-3.5 fill-primary text-primary" /> {product.rating} ·{" "}
            {product.reviews} reviews
          </span>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{product.description}</p>

        <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-lg border border-border bg-card p-3">
            <dt className="eyebrow mb-1">Fabric</dt>
            <dd>{product.fabric}</dd>
          </div>
          <div className="rounded-lg border border-border bg-card p-3">
            <dt className="eyebrow mb-1">Colour</dt>
            <dd className="flex items-center gap-2">
              <span
                className="size-4 shrink-0 rounded-full border border-border"
                style={{
                  background: `linear-gradient(135deg, ${product.swatch[0]}, ${product.swatch[1]})`,
                }}
              />
              {product.colorName}
            </dd>
          </div>
        </dl>

        <div className="mt-6">
          <p className="eyebrow mb-2">Select size</p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={cn(
                  "min-w-12 rounded-md border px-3 py-2 text-sm transition-colors",
                  size === s
                    ? "border-primary bg-primary/15 text-primary"
                    : "border-border text-muted-foreground hover:text-foreground",
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 flex items-start gap-2.5 rounded-lg border border-primary/25 bg-primary/[0.06] p-3.5 text-sm">
          <Truck className="mt-0.5 size-4 shrink-0 text-primary" />
          <p className="text-muted-foreground">
            {product.tryOnFee === 0 ? (
              <>
                <span className="text-foreground">Free doorstep try-on.</span> A stylist brings it
                home, you keep only what fits.
              </>
            ) : (
              <>
                <span className="text-foreground">
                  Try-on at {formatINR(product.tryOnFee)}
                </span>{" "}
                — adjusted against your purchase if you keep the piece.
              </>
            )}
          </p>
        </div>

        {similar.length > 0 && (
          <section className="mt-10">
            <h2 className="mb-3 text-xl font-semibold">Wear it with</h2>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {similar.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      <div className="fixed inset-x-0 bottom-[4.25rem] z-40 border-t border-border/70 bg-background/95 px-4 py-3 backdrop-blur-xl md:bottom-0">
        <div className="mx-auto flex max-w-3xl gap-2.5 md:max-w-5xl">
          <Link
            to="/studio"
            search={{ garment: product.id }}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-primary/50 py-3 text-sm tracking-[0.1em] text-primary uppercase"
          >
            <Sparkles className="size-4" /> Try on
          </Link>
          <button
            onClick={add}
            disabled={already}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gold-gradient py-3 text-sm font-semibold tracking-[0.1em] text-primary-foreground uppercase shadow-gold disabled:opacity-60"
          >
            {already ? <Check className="size-4" /> : null}
            {already ? "In trunk" : "Add to trunk"}
          </button>
        </div>
      </div>
    </main>
  );
}
