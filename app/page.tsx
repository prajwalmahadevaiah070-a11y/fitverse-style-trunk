'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useFitVerse } from '@/lib/fitverse-store'
import { formatINR } from '@/lib/fitverse-types'

export default function HomePage() {
  const { products, addToTrunk } = useFitVerse()
  const [addedId, setAddedId] = useState<string | null>(null)

  const handleAdd = (id: string) => {
    addToTrunk(id, 'Bespoke')
    setAddedId(id)
    setTimeout(() => setAddedId(null), 2400)
  }

  const womenItems = (products || []).filter((p) => p.gender === 'women')
  const menItems = (products || []).filter((p) => p.gender === 'men')
  const kidsItems = (products || []).filter((p) => p.gender === 'kids')

  return (
    <div className="w-full bg-[#050505] text-white">
      
      {/* 1. 100VH FULL-BLEED MONUMENTAL HERO */}
      <section className="relative h-[92vh] min-h-[640px] w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=2400&q=95"
          alt="Petikara Haute Couture"
          className="h-full w-full object-cover object-center filter brightness-[0.85] contrast-[1.08]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-black/30" />

        <div className="absolute inset-0 flex flex-col items-center justify-end pb-24 px-6 text-center z-10">
          <p className="text-[9px] uppercase tracking-[0.5em] text-zinc-400 mb-4 font-light">
            AUTUMN / FESTIVE 2026 COUTURE
          </p>

          <h1 className="font-couture text-4xl sm:text-6xl lg:text-8xl font-normal tracking-[0.3em] text-white leading-tight">
            The Living Trunk
          </h1>

          <p className="text-[11px] uppercase tracking-[0.3em] text-zinc-300 font-light mt-4 max-w-xl leading-relaxed">
            Heirloom Handlooms delivered to your residence in an antique trunk for a private 1-hour fitting.
          </p>

          <div className="mt-10 flex flex-wrap justify-center items-center gap-6">
            <a
              href="#pillars"
              className="border border-white/80 bg-white text-black px-9 py-4 text-[9px] uppercase tracking-[0.35em] font-medium hover:bg-transparent hover:text-white transition-all"
            >
              Explore Collections
            </a>
            <Link
              href="/studio"
              className="border border-white/30 backdrop-blur-md px-9 py-4 text-[9px] uppercase tracking-[0.35em] font-light text-white hover:border-white transition-all"
            >
              Digital Atelier
            </Link>
          </div>
        </div>
      </section>

      {/* 2. THREE MONUMENTAL MAISON ENTRANCES (WOMEN / MEN / JUNIOR) */}
      <section id="pillars" className="grid grid-cols-1 md:grid-cols-3 w-full hairline-t hairline-b">
        {[
          {
            title: 'WOMEN',
            sub: 'Real Zari Kadhwa & Bridal Dabka',
            link: '#women',
            img: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=90',
          },
          {
            title: 'MEN',
            sub: 'Imperial Velvet & Chanderi Achkans',
            link: '#men',
            img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=90',
          },
          {
            title: 'JUNIOR',
            sub: 'Mulmul Linings · Zero Scratch',
            link: '#junior',
            img: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=1200&q=90',
          },
        ].map((pillar) => (
          <a
            key={pillar.title}
            href={pillar.link}
            className="group relative h-[80vh] min-h-[550px] overflow-hidden hairline-r flex items-end p-10 sm:p-14 text-left"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={pillar.img}
              alt={pillar.title}
              className="absolute inset-0 h-full w-full object-cover filter brightness-[0.8] contrast-[1.1] transition-transform duration-[1400ms] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />

            <div className="relative z-10 space-y-3">
              <h2 className="font-couture text-3xl sm:text-4xl lg:text-5xl font-normal tracking-[0.25em] text-white">
                {pillar.title}
              </h2>
              <p className="text-[9px] uppercase tracking-[0.3em] text-zinc-400 font-light">
                {pillar.sub}
              </p>
              <span className="inline-block text-[9px] uppercase tracking-[0.35em] text-white border-b border-white pb-1 pt-2">
                Enter Atelier →
              </span>
            </div>
          </a>
        ))}
      </section>

      {/* 3. THE 4-PIECE DOORSTEP RITUAL */}
      <section id="ritual" className="mx-auto max-w-7xl px-8 py-36 space-y-20 text-center">
        <div className="space-y-4 max-w-2xl mx-auto">
          <p className="text-[9px] uppercase tracking-[0.45em] text-zinc-400 font-light">
            THE MAISON SERVICE
          </p>
          <h2 className="font-couture text-3xl sm:text-5xl font-normal tracking-[0.25em] text-white">
            The Doorstep Fitting Ritual
          </h2>
          <div className="w-16 h-[1px] bg-white/30 mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-left">
          {[
            {
              roman: 'I',
              title: 'Curation of Four',
              desc: 'Select up to 4 heirloom creations across Women, Men, and Junior lines with zero upfront garment purchase.',
            },
            {
              roman: 'II',
              title: 'White-Glove Delivery',
              desc: 'Our style concierge delivers an antique wooden trunk directly to your Bangalore residence at your chosen hour.',
            },
            {
              roman: 'III',
              title: 'Private 1-Hour Fitting',
              desc: 'Try each piece in complete home privacy. Match them with your personal family heirloom jewelry at your pace.',
            },
            {
              roman: 'IV',
              title: 'Keep What You Adore',
              desc: 'Keep only what fits impeccably. The ₹199 doorstep trial deposit is fully adjusted upon final purchase.',
            },
          ].map((card) => (
            <div
              key={card.roman}
              className="hairline-t pt-8 space-y-4"
            >
              <span className="font-couture text-3xl text-zinc-500 font-light">{card.roman}</span>
              <h3 className="font-couture text-base tracking-[0.2em] text-white">{card.title}</h3>
              <p className="text-xs text-zinc-400 font-light leading-relaxed tracking-wider">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. WOMEN'S HAUTE COUTURE */}
      <section id="women" className="mx-auto max-w-7xl px-8 py-20 space-y-12">
        <div className="hairline-b pb-6 flex justify-between items-end">
          <div>
            <p className="text-[9px] uppercase tracking-[0.4em] text-zinc-400 font-light">HERITAGE WEAVES</p>
            <h2 className="font-couture text-2xl sm:text-4xl font-normal tracking-[0.25em] text-white mt-2">
              Women’s Couture
            </h2>
          </div>
          <Link href="/trunk" className="text-[9px] uppercase tracking-[0.3em] text-zinc-400 hover:text-white border-b border-zinc-500 pb-0.5">
            View Trunk (4)
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {womenItems.map((p) => {
            const isAdded = addedId === p.id
            return (
              <div key={p.id} className="group flex flex-col justify-between space-y-4 text-left">
                <div className="editorial-frame aspect-[3/4] w-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={(p as any).imageUrl}
                    alt={p.name}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute top-4 left-4 text-[8px] uppercase tracking-[0.3em] text-zinc-300 bg-black/70 px-2.5 py-1">
                    {(p as any).craftOrigin}
                  </div>
                </div>

                <div className="space-y-1.5 pt-1">
                  <p className="text-[9px] uppercase tracking-[0.3em] text-zinc-400 font-light">{p.brand}</p>
                  <h3 className="font-couture text-sm font-normal tracking-[0.15em] text-white">{p.name}</h3>
                  <p className="text-xs text-zinc-300 font-light tracking-wide">{formatINR(p.price)}</p>
                </div>

                <button
                  type="button"
                  onClick={() => handleAdd(p.id)}
                  className={`w-full py-3 text-[9px] uppercase tracking-[0.3em] transition-all border ${
                    isAdded
                      ? 'bg-white text-black border-white'
                      : 'border-white/20 text-white hover:border-white'
                  }`}
                >
                  {isAdded ? 'Added to Trunk ✓' : 'Add to Doorstep Trunk'}
                </button>
              </div>
            )
          })}
        </div>
      </section>

      {/* 5. MEN'S COUTURE */}
      <section id="men" className="mx-auto max-w-7xl px-8 py-20 space-y-12">
        <div className="hairline-b pb-6 flex justify-between items-end">
          <div>
            <p className="text-[9px] uppercase tracking-[0.4em] text-zinc-400 font-light">ROYAL REGALIA</p>
            <h2 className="font-couture text-2xl sm:text-4xl font-normal tracking-[0.25em] text-white mt-2">
              Men’s Couture
            </h2>
          </div>
          <Link href="/trunk" className="text-[9px] uppercase tracking-[0.3em] text-zinc-400 hover:text-white border-b border-zinc-500 pb-0.5">
            View Trunk (4)
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {menItems.map((p) => {
            const isAdded = addedId === p.id
            return (
              <div key={p.id} className="group flex flex-col justify-between space-y-4 text-left">
                <div className="editorial-frame aspect-[3/4] w-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={(p as any).imageUrl}
                    alt={p.name}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute top-4 left-4 text-[8px] uppercase tracking-[0.3em] text-zinc-300 bg-black/70 px-2.5 py-1">
                    {(p as any).craftOrigin}
                  </div>
                </div>

                <div className="space-y-1.5 pt-1">
                  <p className="text-[9px] uppercase tracking-[0.3em] text-zinc-400 font-light">{p.brand}</p>
                  <h3 className="font-couture text-sm font-normal tracking-[0.15em] text-white">{p.name}</h3>
                  <p className="text-xs text-zinc-300 font-light tracking-wide">{formatINR(p.price)}</p>
                </div>

                <button
                  type="button"
                  onClick={() => handleAdd(p.id)}
                  className={`w-full py-3 text-[9px] uppercase tracking-[0.3em] transition-all border ${
                    isAdded
                      ? 'bg-white text-black border-white'
                      : 'border-white/20 text-white hover:border-white'
                  }`}
                >
                  {isAdded ? 'Added to Trunk ✓' : 'Add to Doorstep Trunk'}
                </button>
              </div>
            )
          })}
        </div>
      </section>

      {/* 6. JUNIOR ATELIER (KIDS) */}
      <section id="junior" className="mx-auto max-w-7xl px-8 py-20 space-y-12">
        <div className="hairline-b pb-6 flex justify-between items-end">
          <div>
            <p className="text-[9px] uppercase tracking-[0.4em] text-zinc-400 font-light">NANHE THREADS</p>
            <h2 className="font-couture text-2xl sm:text-4xl font-normal tracking-[0.25em] text-white mt-2">
              Junior Atelier
            </h2>
          </div>
          <Link href="/trunk" className="text-[9px] uppercase tracking-[0.3em] text-zinc-400 hover:text-white border-b border-zinc-500 pb-0.5">
            View Trunk (4)
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {kidsItems.map((p) => {
            const isAdded = addedId === p.id
            return (
              <div key={p.id} className="group flex flex-col justify-between space-y-4 text-left">
                <div className="editorial-frame aspect-[3/4] w-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={(p as any).imageUrl}
                    alt={p.name}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute top-4 left-4 text-[8px] uppercase tracking-[0.3em] text-zinc-300 bg-black/70 px-2.5 py-1">
                    Hypoallergenic Mulmul
                  </div>
                </div>

                <div className="space-y-1.5 pt-1">
                  <p className="text-[9px] uppercase tracking-[0.3em] text-zinc-400 font-light">{p.brand}</p>
                  <h3 className="font-couture text-sm font-normal tracking-[0.15em] text-white">{p.name}</h3>
                  <p className="text-xs text-zinc-300 font-light tracking-wide">{formatINR(p.price)}</p>
                </div>

                <button
                  type="button"
                  onClick={() => handleAdd(p.id)}
                  className={`w-full py-3 text-[9px] uppercase tracking-[0.3em] transition-all border ${
                    isAdded
                      ? 'bg-white text-black border-white'
                      : 'border-white/20 text-white hover:border-white'
                  }`}
                >
                  {isAdded ? 'Added to Trunk ✓' : 'Add to Doorstep Trunk'}
                </button>
              </div>
            )
          })}
        </div>
      </section>

      {/* 7. ARCHITECTURAL FOOTER */}
      <footer className="hairline-t pt-28 pb-20 text-center space-y-8 mt-24">
        <p className="font-couture text-3xl sm:text-4xl tracking-[0.4em] text-white">
          PETIKARA
        </p>
        <p className="text-[9px] uppercase tracking-[0.4em] text-zinc-500 max-w-md mx-auto font-light leading-relaxed">
          Haute Couture Private Doorstep Trial Maison. Handwoven Heritage delivered across Bengaluru.
        </p>
        <p className="text-[8px] uppercase tracking-[0.4em] text-zinc-600">
          © {new Date().getFullYear()} Petikara. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
