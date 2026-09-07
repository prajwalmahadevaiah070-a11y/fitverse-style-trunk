'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Sparkles,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Clock,
  HeartHandshake,
  CheckCircle2,
  ChevronRight,
  Smile,
  Feather,
  Sparkle
} from 'lucide-react'
import { useFitVerse } from '@/lib/fitverse-store'
import { formatINR } from '@/lib/fitverse-types'
import { toast } from 'sonner'

// Living Editorial Slide Assets
const HERO_SLIDES = [
  {
    title: 'Heirloom Handlooms, Doorstep Fitting.',
    subtitle: 'From pure Banarasi Kadhwa weaves to imperial velvet bandhgalas — styled virtually, delivered in an antique wooden trunk for a private 1-hour home trial.',
    tag: 'Petikara Couture · Autumn / Festive 2026',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1920&q=85',
  },
  {
    title: 'The Royal Wardrobe for Men & Heirs.',
    subtitle: 'No crowded changing rooms. Impeccably tailored achkans, bundis, and boys’ brocade sets brought right to your living room.',
    tag: 'Men & Heirs · Bespoke Cut',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1920&q=85',
  },
  {
    title: 'Zero-Fuss Festive Dressing for Children.',
    subtitle: 'Hypoallergenic 100% mulmul linings with zero itch. Let your little ones try 4 pieces at home at their own pace.',
    tag: 'Nanhe Threads · Junior Atelier',
    image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=1920&q=85',
  },
]

export default function HomePage() {
  const { products, addToTrunk } = useFitVerse()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [activeTab, setActiveTab] = useState<'all' | 'women' | 'men' | 'kids'>('all')

  // Auto slide crossfade
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)
    }, 6500)
    return () => clearInterval(timer)
  }, [])

  const filteredProducts = products.filter((p) => {
    if (activeTab === 'all') return true
    return p.gender === activeTab
  })

  return (
    <div className="space-y-20 -mt-6">

      {/* 1. FULL-BLEED LIVING EDITORIAL HERO */}
      <section className="relative -mx-4 sm:-mx-6 lg:-mx-8 h-[88vh] min-h-[580px] overflow-hidden border-b border-border/60">
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={slide.title}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Ambient Background Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.image}
              alt={slide.title}
              className="h-full w-full object-cover object-center scale-105 transition-transform duration-[8000ms] ease-out"
              style={{
                transform: index === currentSlide ? 'scale(1)' : 'scale(1.08)',
              }}
            />
            {/* Cinematic Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-black/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent" />
          </div>
        ))}

        {/* Hero Content Overlay */}
        <div className="relative z-20 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-16 pt-20 sm:px-8">
          <div className="max-w-2xl space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-black/40 px-3.5 py-1 backdrop-blur-md">
              <Sparkles className="size-3.5 text-gold animate-pulse" />
              <span className="text-[11px] font-medium uppercase tracking-widest text-gold-light">
                {HERO_SLIDES[currentSlide].tag}
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-semibold leading-[1.08] text-white">
              {HERO_SLIDES[currentSlide].title}
            </h1>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-xl">
              {HERO_SLIDES[currentSlide].subtitle}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                href="/studio"
                className="inline-flex items-center gap-2 rounded-full bg-gold-gradient px-7 py-3.5 text-xs sm:text-sm font-semibold text-black shadow-gold transition-transform hover:scale-[1.02]"
              >
                <Sparkles className="size-4" />
                Launch 3D Try-On Studio
              </Link>
              <Link
                href="#curated-wardrobe"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-xs sm:text-sm font-medium text-white backdrop-blur-md hover:bg-white/20 transition-colors"
              >
                Browse Heirloom Trunk <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>

          {/* Slide Indicator Dots */}
          <div className="mt-10 flex items-center gap-3">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Slide ${idx + 1}`}
                className={`h-1.5 transition-all rounded-full ${
                  idx === currentSlide ? 'w-10 bg-gold' : 'w-2 bg-white/30 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 2. THE DOORSTEP TRIAL BLUEPRINT (Why Petikara) */}
      <section className="mx-auto max-w-7xl px-2">
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">The Doorstep Maison Experience</p>
          <h2 className="font-serif text-3xl sm:text-4xl">How Your Petikara Trunk Works</h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Experience luxury fitting the way royal households did — tailored, unhurried, and in the comfort of your sanctuary.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Select Any 4 Outfits',
              desc: 'Mix and match between Bridal Sarees, Men’s Bandhgalas, and Kids Kurta sets without buying upfront.',
              icon: ShoppingBag,
            },
            {
              step: '02',
              title: 'Virtual 3D Drape Preview',
              desc: 'Preview realistic fabric drape and test banquet banquet lighting in our Digital Atelier Studio.',
              icon: Sparkle,
            },
            {
              step: '03',
              title: '1-Hour Private Trial',
              desc: 'Our style concierge delivers the trunk at your preferred time. Try pieces with your own jewelry and family.',
              icon: Clock,
            },
            {
              step: '04',
              title: 'Keep What You Love',
              desc: 'Keep only the pieces that make you feel magnificent. The ₹199 trial deposit is instantly refunded or adjusted.',
              icon: HeartHandshake,
            },
          ].map((card) => (
            <div
              key={card.step}
              className="relative rounded-2xl border border-border/80 bg-card p-6 space-y-3 transition-all hover:border-gold/50"
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

      {/* 3. KIDS & FAMILY SPOTLIGHT ("The No-Tears Fitting Room") */}
      <section className="relative overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-br from-card via-card/80 to-surface-raised p-8 sm:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs text-gold">
              <Smile className="size-3.5" /> For Parents: No More Fitting Room Meltdowns
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-semibold leading-tight">
              Indian Festive Wear That Kids <span className="italic text-gold">Actually</span> Love Wearing.
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Dragging children to crowded bazaars and fitting rooms ruins wedding excitement. With Petikara, your little ones try gentle, handwoven pieces in the warmth of home while watching their favorite cartoons.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-xs text-zinc-300">
                <CheckCircle2 className="size-4 text-gold shrink-0" />
                <span>100% Mulmul Hypoallergenic Soft Linings</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-zinc-300">
                <CheckCircle2 className="size-4 text-gold shrink-0" />
                <span>Zero-Itch Seamless Zari Edges</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-zinc-300">
                <CheckCircle2 className="size-4 text-gold shrink-0" />
                <span>Father-Son & Mother-Daughter Twinning</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-zinc-300">
                <CheckCircle2 className="size-4 text-gold shrink-0" />
                <span>Full 1-Hour Patience Window at Home</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('kids')
                  document.getElementById('curated-wardrobe')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="inline-flex items-center gap-2 rounded-full border border-gold/60 bg-gold/10 px-6 py-2.5 text-xs font-semibold text-gold hover:bg-gold hover:text-black transition-all"
              >
                Explore Junior Heritage Line <ChevronRight className="size-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden border border-border shadow-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=900&q=80"
              alt="Kids Festive Happiness"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-xs text-white/90">
              <p className="font-serif text-sm font-semibold">Bespoke Comfort Guaranteed</p>
              <p className="text-[11px] text-white/70">Pure Chanderi & Spun Brocade built for play.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BALANCED ATELIER WARDROBE (Women, Men, Kids) */}
      <section id="curated-wardrobe" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border/80 pb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">The Collection</p>
            <h2 className="font-serif text-3xl sm:text-4xl">Artisanal Heirloom Pieces</h2>
          </div>

          {/* Gender Filter Selector */}
          <div className="inline-flex items-center rounded-full border border-border/80 bg-surface-raised p-1 text-xs">
            {(
              [
                { id: 'all', label: 'All Collections' },
                { id: 'women', label: 'Women' },
                { id: 'men', label: 'Men' },
                { id: 'kids', label: 'Kids & Juniors' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-full px-4 py-1.5 font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-gold font-semibold text-black shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((p) => {
            const img = (p as any).imageUrl ?? 'https://images.unsplash.com/photo-1610030469983-98e550d6193c'
            return (
              <div
                key={p.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-gold/60 hover:shadow-xl"
              >
                <div>
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img}
                      alt={p.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 rounded-full bg-black/60 backdrop-blur-md px-2.5 py-0.5 text-[10px] text-white/90 uppercase tracking-widest">
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
                      toast.success(`${p.name} added to your home trial trunk!`)
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-gold/60 bg-gold/10 py-2.5 text-xs font-semibold text-gold transition-colors hover:bg-gold hover:text-black"
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
      <footer className="border-t border-border/80 pt-12 pb-8 text-center text-xs text-muted-foreground space-y-3">
        <p className="font-serif text-xl tracking-wider text-gold-gradient uppercase font-semibold">
          Petikara
        </p>
        <p className="max-w-md mx-auto">
          Private Doorstep Trial Atelier for Indian Handwoven Couture. Hand-delivered across Bengaluru with an unhurried 1-hour styling window.
        </p>
        <p className="text-[11px] text-muted-foreground/60">
          © {new Date().getFullYear()} Petikara. All rights reserved.
        </p>
      </footer>

    </div>
  )
}
