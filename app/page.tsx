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

  const handleAdd = (id: string) => {
    addToTrunk(id, 'Standard')
    setAddedId(id)
    setTimeout(() => setAddedId(null), 2000)
  }

  return (
    <div className="w-full bg-[#0b0f14] text-[#f5f5f5] pb-24">
      {/* 1. CINEMATIC FULL-BLEED LIVING HERO */}
      <section className="relative h-[90vh] min-h-[640px] w-full overflow-hidden border-b border-[#222a35]">
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
              style={{
                transform: index === currentSlide ? 'scale(1)' : 'scale(1.06)',
                transition: 'transform 7s ease-out',
              }}
            />
            {/* Cinematic Luxury Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f14] via-[#0b0f14]/50 to-black/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f14]/90 via-[#0b0f14]/40 to-transparent" />
          </div>
        ))}

        <div className="relative z-20 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-20 pt-20 sm:px-8">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/60 bg-black/60 px-4 py-1.5 backdrop-blur-md">
              <span className="size-2 rounded-full bg-[#d4af37] animate-pulse" />
              <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f3e5ab]">
                {HERO_SLIDES[currentSlide].tag}
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.08] text-white tracking-wide">
              {HERO_SLIDES[currentSlide].title}
            </h1>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-xl font-light">
              {HERO_SLIDES[currentSlide].subtitle}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/studio"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#e8d082] via-[#d4af37] to-[#b89324] px-8 py-3.5 text-xs sm:text-sm font-semibold text-black shadow-lg shadow-[#d4af37]/20 transition-transform hover:scale-[1.03]"
              >
                Launch 3D Try-On Studio →
              </Link>
              <a
                href="#curated-wardrobe"
                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-8 py-3.5 text-xs sm:text-sm font-medium text-white backdrop-blur-md hover:bg-white/20 transition-all"
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
                  idx === currentSlide ? 'w-12 bg-[#d4af37]' : 'w-2.5 bg-white/30 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 2. THE DOORSTEP TRIAL BLUEPRINT */}
      <section className="mx-auto max-w-7xl px-6 sm:px-8 mt-24">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d4af37]">
            The Doorstep Maison Experience
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal">How Your Petikara Trunk Works</h2>
          <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
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
              desc: 'Our style concierge delivers the trunk at your scheduled slot. Try pieces at home in complete comfort.',
            },
            {
              step: '04',
              title: 'Keep What You Love',
              desc: 'Pay only for what you keep. The ₹199 trial deposit is fully adjusted upon purchase.',
            },
          ].map((card) => (
            <div
              key={card.step}
              className="relative rounded-2xl border border-[#222a35] bg-[#121820] p-7 space-y-4 transition-all hover:border-[#d4af37]/60 hover:shadow-xl"
            >
              <span className="font-serif text-3xl font-bold text-[#d4af37]">{card.step}</span>
              <h3 className="font-serif text-xl font-semibold text-white">{card.title}</h3>
              <p className="text-xs text-gray-400 font-light leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. KIDS & FAMILY SPOTLIGHT */}
      <section className="mx-auto max-w-7xl px-6 sm:px-8 mt-24">
        <div className="relative overflow-hidden rounded-3xl border border-[#d4af37]/40 bg-gradient-to-br from-[#121820] via-[#121820]/90 to-[#0b0f14] p-8 sm:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/50 bg-[#d4af37]/10 px-4 py-1.5 text-xs text-[#d4af37]">
                <span>★</span> Junior Atelier: No Crowded Changing Rooms
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-tight text-white">
                Indian Festive Wear That Kids <span className="italic text-[#d4af37]">Actually</span> Love Wearing.
              </h2>
              <p className="text-sm text-gray-300 font-light leading-relaxed">
                Skip crowded bazaars and fitting room fatigue. Your little ones can try gentle, hypoallergenic handlooms at home while staying completely relaxed.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs text-gray-300">
                <div className="flex items-center gap-3">
                  <span className="text-[#d4af37] font-bold">✓</span>
                  <span>100% Mulmul Hypoallergenic Linings</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#d4af37] font-bold">✓</span>
                  <span>Zero-Itch Covered Zari Borders</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#d4af37] font-bold">✓</span>
                  <span>Matching Father-Son & Mother-Daughter Sets</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#d4af37] font-bold">✓</span>
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
                  className="inline-flex items-center gap-2 rounded-full border border-[#d4af37] bg-[#d4af37]/10 px-7 py-3 text-xs font-semibold text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-all"
                >
                  Explore Junior Heritage Line →
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#222a35] shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=900&q=80"
                alt="Kids Festive Collection"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-xs text-white">
                <p className="font-serif text-base font-semibold">Bespoke Comfort Guaranteed</p>
                <p className="text-[11px] text-gray-300">Pure Chanderi & Spun Brocade built for comfort and play.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BALANCED ATELIER WARDROBE */}
      <section id="curated-wardrobe" className="mx-auto max-w-7xl px-6 sm:px-8 mt-24 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[#222a35] pb-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d4af37]">The Collection</p>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white">Artisanal Heirloom Pieces</h2>
          </div>

          <div className="inline-flex items-center rounded-full border border-[#222a35] bg-[#121820] p-1 text-xs">
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
                className={`rounded-full px-5 py-2 font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#d4af37] font-semibold text-black shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {filteredProducts.map((p) => {
            const img =
              (p as any).imageUrl ??
              'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
            const isAdded = addedId === p.id
            return (
              <div
                key={p.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#222a35] bg-[#121820] transition-all hover:border-[#d4af37]/60 hover:shadow-2xl"
              >
                <div>
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-black/40">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img}
                      alt={p.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 rounded-full bg-black/70 backdrop-blur-md px-3 py-1 text-[9px] text-white uppercase tracking-[0.2em] font-semibold">
                      {p.gender}
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#d4af37] font-semibold">
                      {p.brand} · {p.city}
                    </p>
                    <h3 className="font-serif text-lg font-semibold leading-snug line-clamp-1 text-white">{p.name}</h3>
                    <p className="text-xs text-gray-400 font-light line-clamp-2 leading-relaxed">{p.description}</p>
                    <p className="pt-2 font-serif text-base font-bold text-[#f5f5f5]">{formatINR(p.price)}</p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    type="button"
                    onClick={() => handleAdd(p.id)}
                    className={`w-full inline-flex items-center justify-center rounded-full py-3 text-xs font-semibold uppercase tracking-wider transition-all ${
                      isAdded
                        ? 'bg-emerald-600 text-white'
                        : 'border border-[#d4af37] bg-[#d4af37]/10 text-[#d4af37] hover:bg-[#d4af37] hover:text-black'
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

      {/* 5. EDITORIAL FOOTER */}
      <footer className="mx-auto max-w-7xl px-6 sm:px-8 mt-28 border-t border-[#222a35] pt-14 text-center text-xs text-gray-500 space-y-4">
        <p className="font-serif text-2xl tracking-[0.25em] text-[#d4af37] uppercase font-semibold">
          Petikara
        </p>
        <p className="max-w-md mx-auto font-light leading-relaxed">
          Private Doorstep Trial Atelier for Indian Handwoven Couture. Delivered across Bengaluru with an unhurried 1-hour styling window.
        </p>
        <p className="text-[11px] text-gray-600">
          © {new Date().getFullYear()} Petikara. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
