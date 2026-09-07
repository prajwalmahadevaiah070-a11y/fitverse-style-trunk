'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useFitVerse } from '@/lib/fitverse-store'
import { formatINR } from '@/lib/fitverse-types'

const CAMPAIGNS = [
  {
    title: 'THE IMPERIAL WEAVES',
    subtitle: 'Heirloom Kadhwa Zari Silks & Handcrafted Bridal Lehengas',
    tag: 'FESTIVE / BRIDAL 2026',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1920&q=85',
  },
  {
    title: 'MEN & BESPOKE HEIRS',
    subtitle: 'Architectural Micro-Velvet Bandhgalas and Chanderi Achkans',
    tag: 'ROYAL PATRONS COLLECTION',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1920&q=85',
  },
  {
    title: 'THE JUNIOR ATELIER',
    subtitle: 'Pure Mulmul Linings, Zero Scratch. Gentle festive couture for children.',
    tag: 'NANHE THREADS',
    image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=1920&q=85',
  },
]

export default function HomePage() {
  const { products, addToTrunk } = useFitVerse()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [activeTab, setActiveTab] = useState<'all' | 'women' | 'men' | 'kids'>('all')
  const [addedId, setAddedId] = useState<string | null>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAMPAIGNS.length)
    }, 7000)
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
    <div className="w-full bg-[#0a0d12] text-[#f5f5f5] pb-32">
      {/* 1. MANISH MALHOTRA-STYLE FULL-BLEED CAMPAIGN CANVAS */}
      <section className="relative h-[92vh] min-h-[640px] w-full overflow-hidden border-b border-white/[0.08]">
        {CAMPAIGNS.map((slide, index) => (
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
                transition: 'transform 8s cubic-bezier(0.25, 1, 0.5, 1)',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d12] via-[#0a0d12]/40 to-black/30" />
          </div>
        ))}

        <div className="relative z-20 mx-auto flex h-full max-w-7xl flex-col justify-end px-8 pb-24 text-center items-center">
          <div className="max-w-3xl space-y-6">
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#d4af37]">
              {CAMPAIGNS[currentSlide].tag}
            </p>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light tracking-[0.2em] text-white">
              {CAMPAIGNS[currentSlide].title}
            </h1>

            <p className="text-xs sm:text-sm text-zinc-300 font-light tracking-[0.15em] uppercase max-w-xl mx-auto">
              {CAMPAIGNS[currentSlide].subtitle}
            </p>

            <div className="pt-4 flex justify-center items-center gap-6">
              <Link
                href="/studio"
                className="border border-[#d4af37] bg-[#d4af37] px-8 py-3.5 text-[10px] uppercase tracking-[0.25em] font-semibold text-black hover:bg-transparent hover:text-[#d4af37] transition-all"
              >
                Enter Digital Atelier
              </Link>
              <a
                href="#wardrobe"
                className="border border-white/40 bg-black/40 backdrop-blur-md px-8 py-3.5 text-[10px] uppercase tracking-[0.25em] font-medium text-white hover:border-white transition-all"
              >
                View Collections
              </a>
            </div>
          </div>

          <div className="mt-14 flex items-center gap-3">
            {CAMPAIGNS.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Campaign ${idx + 1}`}
                className={`h-[2px] transition-all ${
                  idx === currentSlide ? 'w-14 bg-[#d4af37]' : 'w-4 bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 2. THE 4-STEP DOORSTEP RITUAL */}
      <section id="ritual" className="mx-auto max-w-7xl px-8 mt-32">
        <div className="text-center max-w-xl mx-auto space-y-3 mb-20">
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#d4af37]">THE MAISON EXPERIENCE</p>
          <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-[0.15em] text-white">
            The Doorstep Ritual
          </h2>
          <div className="w-12 h-[1px] bg-[#d4af37] mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {[
            {
              roman: 'I',
              title: 'Curation of Four',
              desc: 'Select up to 4 heirloom creations across Women, Men, and Kids without paying for garments upfront.',
            },
            {
              roman: 'II',
              title: 'Virtual Atelier Drape',
              desc: 'Preview dynamic fabric reflection and banquet luster inside the Petikara digital lighting studio.',
            },
            {
              roman: 'III',
              title: 'The 1-Hour Fitting',
              desc: 'Delivered in an antique wooden trunk to your residence. Try pieces in private with your personal jewelry.',
            },
            {
              roman: 'IV',
              title: 'Bespoke Retention',
              desc: 'Retain only what you adore. Your ₹199 doorstep trial deposit is adjusted upon selection.',
            },
          ].map((card) => (
            <div
              key={card.roman}
              className="border-t border-white/[0.12] pt-8 space-y-4 text-left"
            >
              <span className="font-serif text-2xl text-[#d4af37] font-light">{card.roman}</span>
              <h3 className="font-serif text-lg tracking-[0.1em] text-white uppercase">{card.title}</h3>
              <p className="text-xs text-zinc-400 font-light leading-relaxed tracking-wider">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. JUNIOR ATELIER: PARENT & FAMILY LUXURY */}
      <section className="mx-auto max-w-7xl px-8 mt-36">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border border-white/[0.08] bg-white/[0.02] p-10 sm:p-16">
          <div className="lg:col-span-6 space-y-6">
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#d4af37]">THE JUNIOR MAISON</p>
            <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-wide text-white leading-tight">
              Festive Dressing for Heirs, Without the Tears.
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed tracking-wider">
              No long drives or chaotic fitting room queues. Children try gentle, 100% mulmul-lined silk pieces at home in their own sanctuary.
            </p>
            <div className="space-y-3 pt-2 text-xs text-zinc-300 font-light tracking-wider">
              <p>— 100% Breathable Mulmul Hypoallergenic Linings</p>
              <p>— Scratch-Free Handloom Seams & Concealed Zari</p>
              <p>— Harmonized Father-Son & Mother-Daughter Twinning</p>
            </div>
            <div className="pt-4">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('kids')
                  document.getElementById('wardrobe')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="border-b border-[#d4af37] pb-1 text-[10px] uppercase tracking-[0.3em] text-[#d4af37] hover:text-white transition-colors"
              >
                Explore Junior Line →
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 aspect-[4/3] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=900&q=80"
              alt="Junior Atelier"
              className="h-full w-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>
      </section>

      {/* 4. BALANCED COUTURE GALLERY (4 Women · 4 Men · 4 Kids) */}
      <section id="wardrobe" className="mx-auto max-w-7xl px-8 mt-36 space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-white/[0.08] pb-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#d4af37]">THE ATELIER WARDROBE</p>
            <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-wide text-white">
              Heirloom Creations
            </h2>
          </div>

          <div className="flex items-center gap-6 text-[10px] uppercase tracking-[0.25em]">
            {(
              [
                { id: 'all', label: 'All' },
                { id: 'women', label: 'Women' },
                { id: 'men', label: 'Men' },
                { id: 'kids', label: 'Junior' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`transition-colors ${
                  activeTab === tab.id ? 'text-[#d4af37] border-b border-[#d4af37] pb-1' : 'text-zinc-500 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((p) => {
            const img =
              (p as any).imageUrl ??
              'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
            const isAdded = addedId === p.id
            return (
              <div
                key={p.id}
                className="group relative flex flex-col justify-between text-left space-y-4"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-black/40">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img}
                    alt={p.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 text-[8px] uppercase tracking-[0.25em] text-white/80 bg-black/60 px-2 py-1">
                    {p.gender}
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-[9px] uppercase tracking-[0.25em] text-[#d4af37]">
                    {p.brand} · {p.city}
                  </p>
                  <h3 className="font-serif text-base font-normal tracking-wider text-white">
                    {p.name}
                  </h3>
                  <p className="text-xs text-zinc-400 font-light tracking-wide">{formatINR(p.price)}</p>
                </div>

                <button
                  type="button"
                  onClick={() => handleAdd(p.id)}
                  className={`w-full py-2.5 text-[9px] uppercase tracking-[0.25em] font-medium border transition-all ${
                    isAdded
                      ? 'border-white bg-white text-black'
                      : 'border-white/20 text-white hover:border-[#d4af37] hover:text-[#d4af37]'
                  }`}
                >
                  {isAdded ? 'Added to Trunk' : 'Select For Home Trial'}
                </button>
              </div>
            )
          })}
        </div>
      </section>

      {/* 5. EDITORIAL MAISON FOOTNOTE */}
      <footer className="mx-auto max-w-7xl px-8 mt-44 border-t border-white/[0.08] pt-20 text-center space-y-6">
        <p className="font-serif text-3xl tracking-[0.4em] text-white uppercase">
          PETIKARA
        </p>
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-500 max-w-md mx-auto font-light">
          Private Doorstep Trial Atelier for Indian Handwoven Couture. Bengaluru.
        </p>
        <p className="text-[9px] uppercase tracking-[0.3em] text-zinc-600">
          © {new Date().getFullYear()} Petikara. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
