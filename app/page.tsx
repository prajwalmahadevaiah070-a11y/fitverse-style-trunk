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
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 md:pb-12">
      <section className="relative overflow-hidden pt-8 md:pt-14">
        <div className="pointer-events-none absolute -right-16 -top-10 h-72 w-72 rounded-full bg-gold/15 blur-3xl" />
        <p className="eyebrow">FitVerse · Handwoven India, home-tried</p>
        <h1 className="mt-3 text-4xl md:text-6xl font-semibold leading-[1.08] max-w-3xl">
          Try the finest{' '}
          <span className="text-gold-gradient">Indian couture</span> at your
          doorstep.
        </h1>
        <p className="mt-4 max-w-xl text-base md:text-lg text-muted-foreground">
          From Banarasi silks to modern bandhgalas — style them virtually, then
          have the trunk delivered for a one-hour home trial.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Link
            href="/browse"
            className="inline-flex items-center gap-2 rounded-full bg-gold-gradient px-6 py-3 text-sm font-medium text-primary-foreground shadow-gold transition-transform hover:scale-[1.02]"
          >
            Browse collection
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/studio"
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface-raised"
          >
            <Sparkles className="size-4 text-gold" />
            Open Try-On Studio
          </Link>
        </div>

        {/* 3 Silhouette Cards - Desktop grid & Mobile responsive */}
        <div className="mt-10 grid grid-cols-3 gap-4 md:gap-6 max-w-4xl">
          {featured.slice(0, 3).map((p) => (
            <Link
              key={p.id}
              href={`/product/${p.id}`}
              className="fabric-sheen aspect-[3/4] overflow-hidden rounded-2xl border border-border bg-surface-raised p-4 transition-transform hover:scale-[1.03]"
            >
              <GarmentSwatch product={p} className="h-full w-full" />
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mt-14">
        <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-luxe">
          <p className="eyebrow mb-6">How the trunk works</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STEPS.map((s, i) => (
              <div key={s.title} className="flex gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-full border border-gold/40 bg-gold/10 text-gold">
                  <s.icon className="size-5" />
                </span>
                <div>
                  <p className="text-base font-medium">
                    <span className="mr-1.5 text-gold">{i + 1}.</span>
                    {s.title}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="mt-14">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="eyebrow">Curated for you</p>
            <h2 className="text-2xl font-medium">Featured labels</h2>
          </div>
          <Link
            href="/browse"
            className="inline-flex items-center gap-1 text-sm text-gold hover:underline"
          >
            View all <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Trending */}
      <section className="mt-14">
        <p className="eyebrow mb-4">Trending in the trunk</p>
        <div className="hide-scrollbar -mx-4 flex gap-4 overflow-x-auto px-4 pb-2 md:grid md:grid-cols-6 md:gap-4 md:overflow-visible md:px-0">
          {trending.map((p) => (
            <Link
              key={p.id}
              href={`/product/${p.id}`}
              className="w-44 md:w-auto shrink-0 rounded-xl border border-border bg-card transition-transform hover:scale-[1.02]"
            >
              <div className="fabric-sheen aspect-[3/4] rounded-t-xl bg-surface-raised p-4">
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
