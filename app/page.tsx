'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useFitVerse } from '@/lib/fitverse-store'
import { formatINR } from '@/lib/fitverse-types'

const HERO_SLIDES = [
  {
    title: 'Heirloom Handlooms, Doorstep Fitting.',
    subtitle:
      'From pure Banarasi Kadhwa weaves to imperial velvet bandhgalas — styled virtually, delivered in an antique wooden trunk for a private 1-hour home trial.',
    tag: 'Petikara Couture · Autumn / Festive 2026',
    image:
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1920&q=85',
  },
  {
    title: 'The Royal Wardrobe for Men & Heirs.',
    subtitle:
      'No crowded changing rooms. Impeccably tailored achkans, bundis, and boys’ brocade sets brought right to your living room.',
    tag: 'Men & Heirs · Bespoke Cut',
    image:
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1920&q=85',
  },
  {
    title: 'Zero-Fuss Festive Dressing for Children.',
    subtitle:
      'Hypoallergenic 100% mulmul linings with zero itch. Let your little ones try 4 pieces at home at their own pace.',
    tag: 'Nanhe Threads · Junior Atelier',
    image:
      'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=1920&q=85',
  },
]

export default function HomePage() {
  const { products, addToTrunk } = useFitVerse()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [activeTab, setActiveTab] = useState<'all' | 'women' | 'men' | 'kids'>('all')
  const [addedId, setAddedId] = useState<string | null>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)
    }, 6500)
    return () => clearInterval(timer)
  }, [])

  const filteredProducts = (products || []).filter((p) => {
    if (activeTab === 'all') return true
    return p.gender === activeTab
  })

  const handleAdd = (id: string, name: string) => {
    addToTrunk(id, 'Standard')
    setAddedId(id)
    setTimeout(() => setAddedId(null), 2200)
  }

  return (
    <div className="-mt-6 -mx-4 sm:-mx-6 lg:-mx-8 space-y-20 pb-16">
      {/* 1. SEAMLESS FULL-BLEED EDITORIAL HERO */}
      <section className="relative h-[90vh] min-h-[620px] w-full overflow-hidden border-b border-border/70">
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
              className="h-full w-full object-cover object-center scale-105 transition-transform duration-[8000ms] ease-out"
              style={{
                transform: index === currentSlide ? 'scale(1)' : 'scale(1.08)',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-black/35" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent" />
          </div>
        ))}

        <div className="relative z-20 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-20 pt-24 sm:px-8">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-black/50 px-4 py-1.5 backdrop-blur-md">
              <span className="size-2 rounded-full bg-gold animate-pulse" />
              <span className="text-[11px] font-medium uppercase tracking-widest text-gold-light">
                {HERO_SLIDES[currentSlide].tag}
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] text-white">
              {HERO_SLIDES[currentSlide].title}
            </h1>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-xl">
              {HERO_SLIDES[currentSlide].subtitle}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/studio"
                className="inline-flex items-center gap-2 rounded-full bg-gold-gradient px-8 py-3.5 text-xs sm:text-sm font-semibold text-black shadow-gold transition-transform hover:scale-[1.02]"
              >
                Launch 3D Try-On Studio →
              </Link>
              <a
                href="#curated-wardrobe"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-7 py-3.5 text-xs sm:text-sm font-medium text-white backdrop-blur-md hover:bg-white/20 transition-colors"
              >
                Browse Curated Trunk ↓
              </a>
            </div>
          </div>

          <div className="mt-12 flex items-center gap-3">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Slide ${idx + 1}`}
                className={`h-1.5 transition-all rounded-full ${
                  idx === currentSlide ? 'w-12 bg-gold' : 'w-2.5 bg-white/30 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-20">
        {/* 2. DOORSTEP TRIAL BLUEPRINT */}
        <section className="space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">
              The Doorstep Maison Experience
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl">How Your Petikara Trunk Works</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Tailored, unhurried luxury fittings delivered directly to your doorstep.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Select 4 Outfits',
                desc: 'Pick up to 4 pieces across Men, Women, and Kids collections without paying for garments upfront.',
              },
              {
                step: '02',
                title: 'Virtual 3D Drape',
                desc: 'Preview fabric textures, zari reflection, and banquet lighting in our Digital Atelier Studio.',
              },
              {
                step: '03',
                title: '1-Hour Private Trial',
                desc: 'Our style concierge delivers the trunk at your scheduled slot. Try pieces at home in comfort.',
              },
              {
                step: '04',
                title: 'Keep What You Love',
                desc: 'Pay only for what you keep. The ₹199 trial deposit is refunded or adjusted upon purchase.',
              },
            ].map((card) => (
              <div
                key={card.step}
                className="relative rounded-2xl border border-border/80 bg-card p-6 space-y-3 transition-all hover:border-gold/50 shadow-sm"
              >
                <span className="font-serif text-3xl font-bold text-gold">{card.step}</span>
                <h3 className="font-serif text-lg font-semibold">{card.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. KIDS & FAMILY SPOTLIGHT */}
        <section className="relative overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-br from-card via-card/90 to-surface-raised p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3.5 py-1 text-xs text-gold">
                <span>★</span> Junior Atelier: No Crowded Changing Rooms
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-semibold leading-tight">
                Indian Festive Wear That Kids <span className="italic text-gold">Actually</span> Love Wearing.
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Skip crowded bazaars and fitting room fatigue. Your little ones can try gentle, hypoallergenic handlooms at home while staying comfortable and relaxed.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-zinc-300">
                <div className="flex items-center gap-2.5">
                  <span className="text-gold font-bold">✓</span>
                  <span>100% Mulmul Hypoallergenic Linings</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-gold font-bold">✓</span>
                  <span>Zero-Itch Covered Zari Borders</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-gold font-bold">✓</span>
                  <span>Matching Father-Son & Mother-Daughter Sets</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-gold font-bold">✓</span>
                  <span>Unhurried 1-Hour Fitting at Home</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('kids')
                    document.getElementById('curated-wardrobe')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="inline-flex items-center gap-2 rounded-full border border-gold/60 bg-gold/10 px-6 py-2.5 text-xs font-semibold text-gold hover:bg-gold hover:text-black transition-all"
                >
                  Explore Junior Line →
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden border border-border shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=900&q=80"
                alt="Kids Festive Collection"
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

        {/* 4. BALANCED ATELIER WARDROBE */}
        <section id="curated-wardrobe" className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border/80 pb-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gold">The Collection</p>
              <h2 className="font-serif text-3xl sm:text-4xl">Artisanal Heirloom Pieces</h2>
            </div>

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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((p) => {
              const img =
                (p as any).imageUrl ??
                'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
              const isAdded = addedId === p.id
              return (
                <div
                  key={p.id}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-gold/60 hover:shadow-xl"
                >
                  <div>
                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img}
                        alt={p.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 rounded-full bg-black/60 backdrop-blur-md px-2.5 py-0.5 text-[10px] text-white/90 uppercase tracking-widest font-medium">
                        {p.gender}
                      </div>
                    </div>

                    <div className="p-4 space-y-1.5">
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
                      onClick={() => handleAdd(p.id, p.name)}
                      className={`w-full inline-flex items-center justify-center rounded-full py-2.5 text-xs font-semibold transition-all ${
                        isAdded
                          ? 'bg-emerald-600 text-white'
                          : 'border border-gold/60 bg-gold/10 text-gold hover:bg-gold hover:text-black'
                      }`}
                    >
                      {isAdded ? 'Added to Trunk ✓' : 'Add to Doorstep Trunk'}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* 5. FOOTER */}
        <footer className="border-t border-border/80 pt-12 pb-8 text-center text-xs text-muted-foreground space-y-3">
          <p className="font-serif text-xl tracking-wider text-gold-gradient uppercase font-semibold">
            Petikara
          </p>
          <p className="max-w-md mx-auto">
            Private Doorstep Trial Atelier for Indian Handwoven Couture. Delivered across Bengaluru with an unhurried 1-hour styling window.
          </p>
          <p className="text-[11px] text-muted-foreground/60">
            © {new Date().getFullYear()} Petikara. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  )
}
