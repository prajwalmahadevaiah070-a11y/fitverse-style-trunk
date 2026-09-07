'use client'

import Link from 'next/link'
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Truck,
  Star,
} from 'lucide-react'

import { ProductCard } from '@/components/ProductCard'
import { GarmentSwatch } from '@/components/GarmentSwatch'
import { useFitVerse } from '@/lib/fitverse-store'
import { formatINR, TRIAL_DEPOSIT } from '@/lib/fitverse-types'

const STEPS = [
  {
    icon: Sparkles,
    title: 'Style it digitally',
    body: 'Layer pieces on your photo in the Try-On Studio before anything ships.',
  },
  {
    icon: Truck,
    title: 'Trunk to your door',
    body: 'Pick a 1-hour slot. Up to four outfits arrive for a home trial.',
  },
  {
    icon: ShieldCheck,
    title: 'Pay only what you keep',
    body: `A refundable ${formatINR(TRIAL_DEPOSIT)} deposit holds your slot. Return the rest, free.`,
  },
]

export default function HomePage() {
  const { products } = useFitVerse()
  const featured = products.slice(0, 4)
  const trending = products.slice(4, 10)

  return (
    <div className="pb-4">
      <section className="relative overflow-hidden px-4 pt-8">
        <div className="pointer-events-none absolute -right-16 -top-10 h-56 w-56 rounded-full bg-gold/15 blur-3xl" />
        <p className="eyebrow">FitVerse · Handwoven India, home-tried</p>
        <h1 className="mt-3 text-4xl leading-[1.05]">
          Try the finest{' '}
          <span className="text-gold-gradient">Indian couture</span> at your
          doorstep.
        </h1>
        <p className="mt-3 max-w-md text-sm text-muted-foreground">
          From Banarasi silks to modern bandhgalas — style them virtually, then
          have the trunk delivered for a one-hour home trial.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/browse"
            className="inline-flex items-center gap-2 rounded-full bg-gold-gradient px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-gold"
          >
            Browse collection
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/studio"
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground"
          >
            <Sparkles className="size-4 text-gold" />
            Open Try-On Studio
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-3">
          {featured.slice(0, 3).map((p) => (
            <Link
              key={p.id}
              href={`/product/${p.id}`}
              className="fabric-sheen aspect-[3/4] overflow-hidden rounded-xl border border-border bg-surface-raised p-4"
            >
              <GarmentSwatch product={p} className="h-full w-full" />
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10 px-4">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-luxe">
          <p className="eyebrow mb-4">How the trunk works</p>
          <ol className="space-y-4">
            {STEPS.map((s, i) => (
              <li key={s.title} className="flex gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-full border border-gold/40 bg-gold/10 text-gold">
                  <s.icon className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-medium">
                    <span className="mr-1 text-gold">{i + 1}.</span>
                    {s.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mt-10 px-4">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <p className="eyebrow">Curated for you</p>
            <h2 className="text-xl">Featured labels</h2>
          </div>
          <Link
            href="/browse"
            className="inline-flex items-center gap-1 text-xs text-gold"
          >
            View all <ArrowRight className="size-3" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="mt-10 px-4">
        <p className="eyebrow mb-3">Trending in the trunk</p>
        <div className="hide-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-2">
          {trending.map((p) => (
            <Link
              key={p.id}
              href={`/product/${p.id}`}
              className="w-40 shrink-0 rounded-xl border border-border bg-card"
            >
              <div className="fabric-sheen aspect-[3/4] rounded-t-xl bg-surface-raised p-5">
                <GarmentSwatch product={p} className="h-full w-full" />
              </div>
              <div className="space-y-1 p-3">
                <h3 className="line-clamp-1 text-sm">{p.name}</h3>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold">{formatINR(p.price)}</span>
                  <span className="inline-flex items-center gap-0.5 text-gold">
                    <Star className="size-3 fill-gold" />
                    {p.rating}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
