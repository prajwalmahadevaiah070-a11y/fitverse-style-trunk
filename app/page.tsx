'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useFitVerse } from '@/lib/fitverse-store'
import { formatINR } from '@/lib/fitverse-types'

export default function HomePage() {
  const { products, addToTrunk } = useFitVerse()
  const [addedId, setAddedId] = useState<string | null>(null)

  const handleAdd = (id: string) => {
    addToTrunk(id, 'Standard')
    setAddedId(id)
    setTimeout(() => setAddedId(null), 2000)
  }

  const womenItems = (products || []).filter((p) => p.gender === 'women')
  const menItems = (products || []).filter((p) => p.gender === 'men')
  const kidsItems = (products || []).filter((p) => p.gender === 'kids')

  return (
    <div className="w-full bg-black text-white pb-32">
      
      {/* 1. 100VH FULL BLEED EDITORIAL HERO */}
      <section className="relative h-[94vh] min-h-[640px] w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=2400&q=90"
          alt="Petikara Campaign"
          className="h-full w-full object-cover object-center scale-100 animate-pulse duration-[10000ms]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/40" />

        <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 px-6 text-center z-10">
          <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-300 mb-3">
            FESTIVE / COUTURE 2026
          </p>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light tracking-[0.25em] text-white uppercase max-w-4xl leading-tight">
            The Royal Atelier
          </h1>
          <p className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-light mt-4 max-w-md">
            Handcrafted Banarasi, Jodhpur Velvet, and Chanderi Weaves. Delivered to your doorstep for a private 1-hour fitting.
          </p>
          <div className="mt-8 flex items-center gap-6">
            <a
              href="#categories"
              className="border border-white/60 bg-white/10 backdrop-blur-sm px-8 py-3 text-[10px] uppercase tracking-[0.25em] text-white hover:bg-white hover:text-black transition-all"
            >
              Explore Collections
            </a>
            <Link
              href="/studio"
              className="border border-white/30 px-8 py-3 text-[10px] uppercase tracking-[0.25em] text-white hover:border-white transition-all"
            >
              Digital Studio
            </Link>
          </div>
        </div>
      </section>

      {/* 2. THREE-PILLAR CATEGORY GRID (Women / Men / Kids) */}
      <section id="categories" className="grid grid-cols-1 md:grid-cols-3 w-full border-t border-b border-white/[0.08]">
        {[
          {
            title: 'WOMEN',
            sub: 'Heirloom Kadhwa & Bridal Weaves',
            link: '#women',
            img: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85',
          },
          {
            title: 'MEN',
            sub: 'Royal Bandhgalas & Achkans',
            link: '#men',
            img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85',
          },
          {
            title: 'JUNIOR ATELIER',
            sub: 'Hypoallergenic Linings · Zero Scratch',
            link: '#kids',
            img: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=1200&q=85',
          },
        ].map((col) => (
          <a
            key={col.title}
            href={col.link}
            className="group relative h-[75vh] min-h-[500px] overflow-hidden border-b md:border-b-0 md:border-r border-white/[0.08] flex items-end p-10 text-left"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={col.img}
              alt={col.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105 filter brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            <div className="relative z-10 space-y-2">
              <h2 className="font-serif text-3xl sm:text-4xl font-light tracking-[0.2em] text-white">
                {col.title}
              </h2>
              <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 font-light">
                {col.sub}
              </p>
              <span className="inline-block pt-2 text-[10px] uppercase tracking-[0.3em] text-white border-b border-white pb-1">
                View Gallery →
              </span>
            </div>
          </a>
        ))}
      </section>

      {/* 3. THE 4-PIECE DOORSTEP RITUAL */}
      <section className="mx-auto max-w-6xl px-6 py-28 text-center space-y-16">
        <div className="space-y-3">
          <p className="text-[10px] uppercase tracking-[0.35em] text-zinc-400">THE MAISON SERVICE</p>
          <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-[0.2em] text-white">
            The Doorstep Fitting Ritual
          </h2>
          <div className="w-12 h-[1px] bg-white/40 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-left">
          {[
            {
              roman: 'I',
              title: 'Curate 4 Outfits',
              desc: 'Select any 4 pieces across Women, Men, and Kids. Pay only a ₹199 trial deposit.',
            },
            {
              roman: 'II',
              title: 'White-Glove Delivery',
              desc: 'Our style concierge delivers the antique wooden trunk to your residence at your selected slot.',
            },
            {
              roman: 'III',
              title: 'Private 1-Hour Fitting',
              desc: 'Try garments at your pace, in your home, with family and your personal jewelry.',
            },
            {
              roman: 'IV',
              title: 'Keep What You Love',
              desc: 'Keep only what fits perfectly. The trial deposit is 100% adjusted into your purchase.',
            },
          ].map((step) => (
            <div key={step.roman} className="space-y-3 border-t border-white/[0.12] pt-6">
              <span className="font-serif text-2xl text-zinc-400 font-light">{step.roman}</span>
              <h3 className="font-serif text-lg tracking-[0.1em] text-white uppercase">{step.title}</h3>
              <p className="text-xs text-zinc-400 font-light leading-relaxed tracking-wider">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. WOMEN'S HAUTE COUTURE GALLERY */}
      <section id="women" className="mx-auto max-w-7xl px-6 py-16 space-y-10">
        <div className="border-b border-white/[0.08] pb-6 flex justify-between items-end">
          <div>
            <p className="text-[9px] uppercase tracking-[0.35em] text-zinc-400">HERITAGE TEXTILES</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-light tracking-[0.15em] text-white mt-1">
              Women’s Couture
            </h2>
          </div>
          <Link href="/trunk" className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 hover:text-white">
            Trunk View →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {womenItems.map((p) => {
            const isAdded = addedId === p.id
            return (
              <div key={p.id} className="group flex flex-col justify-between space-y-4">
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-950">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={(p as any).imageUrl}
                    alt={p.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] uppercase tracking-[0.25em] text-zinc-400">{p.brand}</p>
                  <h3 className="font-serif text-base font-normal tracking-wide text-white">{p.name}</h3>
                  <p className="text-xs text-zinc-300 font-light">{formatINR(p.price)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleAdd(p.id)}
                  className={`w-full py-2.5 text-[9px] uppercase tracking-[0.25em] border transition-all ${
                    isAdded ? 'bg-white text-black border-white' : 'border-white/20 text-white hover:border-white'
                  }`}
                >
                  {isAdded ? 'Added to Trunk' : 'Add to Doorstep Trunk'}
                </button>
              </div>
            )
          })}
        </div>
      </section>

      {/* 5. MEN'S REGAL ATELIER GALLERY */}
      <section id="men" className="mx-auto max-w-7xl px-6 py-16 space-y-10">
        <div className="border-b border-white/[0.08] pb-6 flex justify-between items-end">
          <div>
            <p className="text-[9px] uppercase tracking-[0.35em] text-zinc-400">ROYAL PATRONS</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-light tracking-[0.15em] text-white mt-1">
              Men’s Couture
            </h2>
          </div>
          <Link href="/trunk" className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 hover:text-white">
            Trunk View →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {menItems.map((p) => {
            const isAdded = addedId === p.id
            return (
              <div key={p.id} className="group flex flex-col justify-between space-y-4">
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-950">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={(p as any).imageUrl}
                    alt={p.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] uppercase tracking-[0.25em] text-zinc-400">{p.brand}</p>
                  <h3 className="font-serif text-base font-normal tracking-wide text-white">{p.name}</h3>
                  <p className="text-xs text-zinc-300 font-light">{formatINR(p.price)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleAdd(p.id)}
                  className={`w-full py-2.5 text-[9px] uppercase tracking-[0.25em] border transition-all ${
                    isAdded ? 'bg-white text-black border-white' : 'border-white/20 text-white hover:border-white'
                  }`}
                >
                  {isAdded ? 'Added to Trunk' : 'Add to Doorstep Trunk'}
                </button>
              </div>
            )
          })}
        </div>
      </section>

      {/* 6. JUNIOR ATELIER (KIDS) */}
      <section id="kids" className="mx-auto max-w-7xl px-6 py-16 space-y-10">
        <div className="border-b border-white/[0.08] pb-6 flex justify-between items-end">
          <div>
            <p className="text-[9px] uppercase tracking-[0.35em] text-zinc-400">NANHE THREADS</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-light tracking-[0.15em] text-white mt-1">
              Junior Atelier
            </h2>
          </div>
          <Link href="/trunk" className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 hover:text-white">
            Trunk View →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {kidsItems.map((p) => {
            const isAdded = addedId === p.id
            return (
              <div key={p.id} className="group flex flex-col justify-between space-y-4">
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-950">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={(p as any).imageUrl}
                    alt={p.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] uppercase tracking-[0.25em] text-zinc-400">{p.brand}</p>
                  <h3 className="font-serif text-base font-normal tracking-wide text-white">{p.name}</h3>
                  <p className="text-xs text-zinc-300 font-light">{formatINR(p.price)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleAdd(p.id)}
                  className={`w-full py-2.5 text-[9px] uppercase tracking-[0.25em] border transition-all ${
                    isAdded ? 'bg-white text-black border-white' : 'border-white/20 text-white hover:border-white'
                  }`}
                >
                  {isAdded ? 'Added to Trunk' : 'Add to Doorstep Trunk'}
                </button>
              </div>
            )
          })}
        </div>
      </section>

      {/* 7. EDITORIAL FOOTER */}
      <footer className="border-t border-white/[0.08] pt-24 pb-16 text-center space-y-6">
        <p className="font-serif text-3xl sm:text-4xl tracking-[0.35em] text-white uppercase">
          PETIKARA
        </p>
        <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 max-w-sm mx-auto font-light">
          Private Doorstep Trial Atelier for Indian Handwoven Couture. Bengaluru.
        </p>
        <p className="text-[9px] uppercase tracking-[0.3em] text-zinc-600">
          © {new Date().getFullYear()} Petikara Maison. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
