'use client'

import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import {
  ArrowRight,
  Briefcase,
  ChevronLeft,
  ShieldCheck,
  Sparkles,
  Star,
} from 'lucide-react'

import { GarmentSwatch } from '@/components/GarmentSwatch'
import { useFitVerse } from '@/lib/fitverse-store'
import { formatINR, TRUNK_CAP } from '@/lib/fitverse-types'
import { cn } from '@/lib/utils'

export default function ProductPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const { productById, addToTrunk, inTrunk, trunk, hydrated } = useFitVerse()
  const product = productById(id)
  const [size, setSize] = useState<string | null>(null)

  if (!hydrated) {
    return (
      <div className="grid min-h-[60dvh] place-items-center text-sm text-muted-foreground">
        Loading…
      </div>
    )
  }

  if (!product) {
    return (
      <div className="grid min-h-[60dvh] place-items-center gap-3 px-6 text-center">
        <p className="text-sm text-muted-foreground">This piece is no longer available.</p>
        <Link href="/browse" className="text-sm text-gold">
          Back to browse
        </Link>
      </div>
    )
  }

  const already = inTrunk(product.id)
  const off = Math.round(((product.mrp - product.price) / product.mrp) * 100)

  const handleAdd = () => {
    if (!size && product.sizes.length > 1) {
      toast.error('Select a size to add to your trunk')
      return
    }
    const res = addToTrunk(product.id, size ?? product.sizes[0])
    if (res.ok) {
      toast.success(`${product.name} added to your trunk`)
    } else if (res.reason === 'cap') {
      toast.error(`Your trunk holds ${TRUNK_CAP} outfits. Remove one first.`)
    } else {
      toast.message('Already in your trunk')
    }
  }

  return (
    <div className="pb-6">
      <div className="fabric-sheen relative aspect-square bg-surface-raised">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Go back"
          className="absolute left-4 top-4 z-10 grid size-9 place-items-center rounded-full border border-border bg-background/70 backdrop-blur"
        >
          <ChevronLeft className="size-5" />
        </button>
        <div className="grid h-full place-items-center p-10">
          <GarmentSwatch
            product={product}
            className="h-full w-full drop-shadow-[0_20px_40px_oklch(0_0_0/50%)]"
          />
        </div>
        {off > 0 && (
          <span className="absolute right-4 top-4 rounded-full bg-background/70 px-3 py-1 text-xs font-medium text-gold backdrop-blur">
            {off}% off
          </span>
        )}
      </div>

      <div className="space-y-5 px-4 pt-5">
        <div>
          <p className="eyebrow">
            {product.brand} · {product.city}
          </p>
          <h1 className="mt-1 text-2xl">{product.name}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <span className="text-xl font-semibold">{formatINR(product.price)}</span>
            <span className="text-sm text-muted-foreground line-through">
              {formatINR(product.mrp)}
            </span>
            <span className="inline-flex items-center gap-1 text-sm text-gold">
              <Star className="size-3.5 fill-gold" />
              {product.rating}
              <span className="text-muted-foreground">({product.reviews})</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {[product.swatch[0], product.swatch[1]].map((c) => (
            <span
              key={c}
              className="size-6 rounded-full border border-border"
              style={{ backgroundColor: c }}
            />
          ))}
          <span className="text-sm text-muted-foreground">{product.colorName}</span>
        </div>

        <div>
          <p className="eyebrow mb-2">Select size</p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                className={cn(
                  'min-w-11 rounded-lg border px-3 py-2 text-sm transition-colors',
                  size === s
                    ? 'border-gold bg-gold/10 text-gold'
                    : 'border-border text-foreground hover:border-gold/40',
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>
          <dl className="mt-3 grid grid-cols-2 gap-3 text-xs">
            <div>
              <dt className="text-muted-foreground">Fabric</dt>
              <dd className="mt-0.5">{product.fabric}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Home try-on</dt>
              <dd className="mt-0.5 text-success">
                {product.tryOnFee === 0 ? 'Free' : formatINR(product.tryOnFee)}
              </dd>
            </div>
          </dl>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-gold/30 bg-gold/5 p-3 text-xs text-muted-foreground">
          <ShieldCheck className="size-4 shrink-0 text-gold" />
          Add up to {TRUNK_CAP} pieces to your trunk and try them at home. Pay
          only for what you keep.
        </div>

        <div className="flex gap-3">
          <Link
            href="/studio"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-border py-3 text-sm font-medium"
          >
            <Sparkles className="size-4 text-gold" />
            Try on
          </Link>
          {already ? (
            <Link
              href="/trunk"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-secondary py-3 text-sm font-medium"
            >
              In trunk ({trunk.length}) <ArrowRight className="size-4" />
            </Link>
          ) : (
            <button
              type="button"
              onClick={handleAdd}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gold-gradient py-3 text-sm font-medium text-primary-foreground shadow-gold"
            >
              <Briefcase className="size-4" />
              Add to trunk
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
