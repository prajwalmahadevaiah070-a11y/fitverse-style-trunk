'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Sparkles,
  ShoppingBag,
  ArrowRight,
  Clock,
  HeartHandshake,
  CheckCircle2,
  ChevronRight,
  Smile,
  ShieldCheck
} from 'lucide-react'
import { useFitVerse } from '@/lib/fitverse-store'
import { formatINR } from '@/lib/fitverse-types'
import { toast } from 'sonner'

const HERO_SLIDES = [
  {
    title: 'Redefining How Indian Couture Is Experienced.',
    subtitle: 'From pure Banarasi silks to royal velvet bandhgalas — style them in 3D, then try 4 heirloom pieces at home before paying.',
    tag: 'Petikara Doorstep Atelier',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1800&q=80',
  },
  {
    title: 'Royal Tailoring For Men & Little Princes.',
    subtitle: 'Zero crowded fitting rooms. Impeccable bespoke achkans and kids pure silk sets delivered for a private 1-hour home trial.',
    tag: 'Men & Heirs Collection',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1800&q=80',
  },
  {
    title: 'The No-Meltdown Festive Fitting For Kids.',
    subtitle: '100% mulmul hypoallergenic linings. Let your children try 4 festive sets at home with zero rush.',
    tag: 'Junior Festive Atelier',
    image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=1800&q=80',
  },
]

export default function HomePage() {
  const { products, addToTrunk } = useFitVerse()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [activeTab, setActiveTab] = useState<'all' | 'women' | 'men' | 'kids'>('all')

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const filteredProducts = products.filter((p) => {
    if (activeTab === 'all') return true
    return p.gender === activeTab
  })

  return (
    <div className="space-y-16 sm:space-y-24 -mt-6">

      {/* 1. FULL BLEED EDITORIAL HERO (MATCHING REFERENCE AESTHETIC) */}
      <section className="relative -mx-4 sm:-mx-6 lg:-mx-8 h-[82vh] min-h-[550px] overflow-hidden rounded-b-3xl border-b border-border/70 shadow-sm bg-[#1c1815]">
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={slide.title}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.image}
              alt={slide.title}
              className="h-full w-full object-cover object-center"
            />
            {/* Warm Luxury Filter Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/20" />
          </div>
        ))}

        {/* Hero Copy */}
        <div className="relative z-20 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-16 sm:px-10">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-light/40 bg-black/40 px-3.5 py-1 backdrop-blur-md">
              <Sparkles className="size-3.5 text-gold-light" />
              <span className="text-[11px] font-medium uppercase tracking-widest text-gold-light">
                {HERO_SLIDES[currentSlide].tag}
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl font-semibold leading-[1.08] text-white">
              {HERO_SLIDES[currentSlide].title}
            </h1>

            <p className="text-sm sm:text-base text-zinc-200 leading-relaxed max-w-xl">
              {HERO_SLIDES[currentSlide].subtitle}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/studio"
                className="inline-flex items-center gap-2 rounded-full bg-gold-gradient px-7 py-3 text-xs sm:text-sm font-semibold text-white shadow-gold transition-transform hover:scale-[1.02]"
              >
                <Sparkles className="size-4" />
                Launch 3D Studio
              </Link>
              <Link
                href="#curated-wardrobe"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-xs sm:text-sm font-medium text-white backdrop-blur-md hover:bg-white/20 transition-colors"
              >
                Explore Wardrobe <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>

          {/* Slide Indicator Bar */}
          <div className="mt-8 flex items-center gap-2">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Slide ${idx + 1}`}
                className={`h-1.5 transition-all rounded-full ${
                  idx === currentSlide ? 'w-8 bg-gold' : 'w-2 bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 2. THE 4-PIECE DOORSTEP TRIAL PROCESS */}
      <section className="mx-auto max-w-7xl px-2">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">The Doorstep Maison Experience</p>
          <h2 className="font-serif text-3xl sm:text-4xl">How Doorstep Trial Works</h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Pick 4 pieces across Men, Women, and Kids. Delivered in a signature wooden trunk for a 1-hour private fitting at home.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Curate 4 Outfits',
              desc: 'Select any 4 garments across Sarees, Sherwanis, and Kids sets.',
              icon: ShoppingBag,
            },
            {
              step: '02',
              title: 'Try in 3D Studio',
              desc: 'Preview realistic fabric drape and test banquet banquet lighting.',
              icon: Sparkles,
            },
            {
              step: '03',
              title: '1-Hour Home Trial',
              desc: 'Hand-delivered at your preferred hour slot in Bengaluru.',
              icon: Clock,
            },
            {
              step: '04',
              title: 'Keep What Fits',
              desc: 'Pay only for what you keep. The ₹199 trial deposit is refunded or adjusted.',
              icon: HeartHandshake,
            },
          ].map((card) => (
            <div
              key={card.step}
              className="rounded-2xl border border-border bg-card p-6 space-y-3 shadow-sm hover:border-gold/60 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="grid size-10 place-items-center rounded-xl bg-gold/10 text-gold border border-gold/30">
                  <card.icon className="size-5" />
                </div>
                <span className="font-serif text-2xl font-bold text-muted-foreground/30">{card.step}</span>
              </div>
              <h3 className="font-serif text-lg font-semibold">{card.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. KIDS & FAMILY SECTION */}
      <section className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-[#f8f5f0] to-[#f0ece1] p-8 sm:p-12 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs text-gold font-medium">
              <Smile className="size-3.5" /> Zero-Fuss Kids Dressing
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-semibold leading-tight text-foreground">
              No More Changing Room Meltdowns for Kids.
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Skip crowded bazaars. Let your children try 4 festive kurtas and lehengas in their own room with zero pressure.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-medium text-foreground/80">
                <CheckCircle2 className="size-4 text-gold shrink-0" />
                <span>100% Mulmul Hypoallergenic Soft Linings</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-foreground/80">
                <CheckCircle2 className="size-4 text-gold shrink-0" />
                <span>Zero-Itch Zari Stitching</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-foreground/80">
                <CheckCircle2 className="size-4 text-gold shrink-0" />
                <span>Father & Son / Mother & Daughter Sets</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-foreground/80">
                <CheckCircle2 className="size-4 text-gold shrink-0" />
                <span>Full 1-Hour Patience Window</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('kids')
                  document.getElementById('curated-wardrobe')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-2.5 text-xs font-semibold text-white hover:bg-gold transition-colors"
              >
                Browse Kids Festive Sets <ChevronRight className="size-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden border border-border shadow-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=900&q=80"
              alt="Kids Festive Happiness"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 4. CURATED WARDROBE (4 ITEMS PER GENDER WITH REAL PHOTOS) */}
      <section id="curated-wardrobe" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border pb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">The Wardrobe</p>
            <h2 className="font-serif text-3xl sm:text-4xl">Heirloom Handlooms & Tailoring</h2>
          </div>

          {/* Gender Filter Pills */}
          <div className="inline-flex items-center rounded-full border border-border bg-card p-1 text-xs shadow-sm">
            {(
              [
                { id: 'all', label: 'All' },
                { id: 'women', label: 'Women' },
                { id: 'men', label: 'Men' },
                { id: 'kids', label: 'Kids' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-full px-4 py-1.5 font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-foreground font-semibold text-white shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((p) => {
            const img = (p as any).imageUrl ?? 'https://images.unsplash.com/photo-1610030469983-98e550d6193c'
            return (
              <div
                key={p.id}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card shadow-sm hover:border-gold/60 transition-all"
              >
                <div>
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img}
                      alt={p.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 rounded-full bg-white/90 px-2.5 py-0.5 text-[10px] font-medium text-foreground uppercase tracking-wider backdrop-blur-sm">
                      {p.gender}
                    </div>
                  </div>

                  <div className="p-4 space-y-1">
                    <p className="text-[10px] uppercase tracking-wider text-gold font-semibold">
                      {p.brand} · {p.city}
                    </p>
                    <h3 className="font-serif text-base font-semibold leading-snug line-clamp-1">{p.name}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">{p.description}</p>
                    <p className="pt-1 font-serif text-sm font-bold text-foreground">{formatINR(p.price)}</p>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <button
                    type="button"
                    onClick={() => {
                      addToTrunk(p.id, p.sizes[0] ?? 'Standard')
                      toast.success(`${p.name} added to your trunk!`)
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-border bg-secondary py-2.5 text-xs font-semibold text-foreground hover:bg-gold hover:text-white transition-colors"
                  >
                    <ShoppingBag className="size-3.5" />
                    Add to Doorstep Trunk
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* 5. LUXURY ATELIER FOOTNOTE */}
      <footer className="border-t border-border pt-12 pb-8 text-center text-xs text-muted-foreground space-y-3">
        <p className="font-serif text-xl tracking-wider uppercase font-semibold text-foreground">
          Petikara
        </p>
        <p className="max-w-md mx-auto">
          Private Doorstep Trial Maison for Indian Couture. Hand-delivered across Bengaluru with an unhurried 1-hour styling window.
        </p>
        <p className="text-[11px] text-muted-foreground/60">
          © {new Date().getFullYear()} Petikara. All rights reserved.
        </p>
      </footer>

    </div>
  )
}
