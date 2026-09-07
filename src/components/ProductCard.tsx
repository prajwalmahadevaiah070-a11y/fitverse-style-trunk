import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";

import { GarmentSwatch } from "@/components/GarmentSwatch";
import { formatINR, type Product } from "@/lib/fitverse-types";

export function ProductCard({ product }: { product: Product }) {
  const off = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  return (
    <Link
      to="/product/$id"
      params={{ id: product.id }}
      className="group flex flex-col overflow-hidden rounded-xl border border-border/70 bg-card transition-colors hover:border-primary/45"
    >
      <div
        className="fabric-sheen relative aspect-[3/4] w-full"
        style={{
          background: `radial-gradient(120% 90% at 30% 0%, ${product.swatch[1]}22, transparent), var(--color-surface-raised)`,
        }}
      >
        <GarmentSwatch product={product} className="absolute inset-0 size-full p-5" />
        {off > 0 && (
          <span className="absolute top-2 left-2 rounded-full bg-background/80 px-2 py-0.5 text-[0.625rem] tracking-[0.12em] text-primary uppercase backdrop-blur">
            {off}% off
          </span>
        )}
        {product.seller && (
          <span className="absolute top-2 right-2 rounded-full bg-gold-gradient px-2 py-0.5 text-[0.5625rem] font-semibold tracking-[0.1em] text-primary-foreground uppercase">
            Yours
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3">
        <p className="eyebrow truncate">
          {product.brand} · {product.city}
        </p>
        <h3 className="line-clamp-2 text-base leading-snug font-medium">{product.name}</h3>
        <div className="mt-auto flex items-baseline gap-2 pt-1.5">
          <span className="text-sm font-semibold text-primary">{formatINR(product.price)}</span>
          <span className="text-xs text-muted-foreground line-through">
            {formatINR(product.mrp)}
          </span>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="size-3 fill-primary text-primary" />
          {product.rating}
          <span className="opacity-60">({product.reviews})</span>
          {product.tryOnFee === 0 && (
            <span className="ml-auto text-[0.625rem] tracking-[0.1em] text-success uppercase">
              Free try-on
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
