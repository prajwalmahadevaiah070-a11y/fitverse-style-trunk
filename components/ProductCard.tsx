import Link from 'next/link'
import { Star } from 'lucide-react'

import { GarmentSwatch } from '@/components/GarmentSwatch'
import { formatINR, type Product } from '@/lib/fitverse-types'

export function ProductCard({ product }: { product: Product }) {
  const off = Math.round(((product.mrp - product.price) / product.mrp) * 100)
  return (
    <Link
      href={`/product/${product.id}`}
      className="group block overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/40"
    >
      <div className="fabric-sheen relative aspect-[3/4] bg-surface-raised">
        <div className="grid h-full place-items-center p-6">
          <GarmentSwatch
            product={product}
            className="h-full w-full drop-shadow-[0_10px_20px_oklch(0_0_0/40%)]"
          />
        </div>
        {off > 0 && (
          <span className="absolute left-2 top-2 rounded-full bg-background/70 px-2 py-0.5 text-[0.65rem] font-medium tracking-wide text-gold backdrop-blur">
            {off}% off
          </span>
        )}
        {product.seller && (
          <span className="absolute right-2 top-2 rounded-full bg-gold-gradient px-2 py-0.5 text-[0.65rem] font-medium text-primary-foreground">
            New
          </span>
        )}
      </div>
      <div className="space-y-1 p-3">
        <p className="text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground">
          {product.brand} · {product.city}
        </p>
        <h3 className="line-clamp-1 font-sans text-sm">{product.name}</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-semibold text-foreground">
            {formatINR(product.price)}
          </span>
          <span className="text-xs text-muted-foreground line-through">
            {formatINR(product.mrp)}
          </span>
        </div>
        <div className="flex items-center gap-2 pt-0.5 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-0.5 text-gold">
            <Star className="size-3 fill-gold" />
            {product.rating}
          </span>
          <span>({product.reviews})</span>
          {product.tryOnFee === 0 && (
            <span className="ml-auto rounded bg-secondary px-1.5 py-0.5 text-[0.6rem] uppercase tracking-wide text-success">
              Free try-on
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
