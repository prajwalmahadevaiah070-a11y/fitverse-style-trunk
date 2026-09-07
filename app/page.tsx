'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useFitVerse } from '@/lib/fitverse-store'
import { formatINR } from '@/lib/fitverse-types'

export default function HomePage() {
  const { products, trunk, addToTrunk, removeFromTrunk } = useFitVerse()
  const [activeTab, setActiveTab] = useState<'all' | 'women' | 'men' | 'kids'>('all')

  const womenItems = (products || []).filter((p) => p.gender === 'women')
  const menItems = (products || []).filter((p) => p.gender === 'men')
  const kidsItems = (products || []).filter((p) => p.gender === 'kids')

  const isItemInTrunk = (id: string) => trunk.some((t) => t.productId === id)

  const toggleTrunk = (id: string) => {
    if (isItemInTrunk(id)) {
      removeFromTrunk(id)
    } else {
      if (trunk.length >= 4) {
        alert('Your trunk can hold up to 4 garments. Please remove one to add this piece.')
        return
      }
      addToTrunk(id, 'Bespoke Fit')
    }
  }

  return (
    <div className="w-full bg-[#050505] text-white pb-32">

      {/* 1. MONUMENTAL HERO: DIRECT PATHWAY */}
      <section className="relative h-[90vh] min-h-[620px] w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=2400&q=95"
          alt="Petikara Campaign"
          className="h-full w-full object-cover object-center filter brightness-[0.8] contrast-[1.08]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-black/40" />

        <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 px-6 text-center z-10">
          <p className="text-[9px] uppercase tracking-[0.45em] text-zinc-400 mb-3">
            ROYAL HERITAGE ATELIER · FESTIVE 2026
          </p>

          <h1 className="font-couture text-4xl sm:text-6xl lg:text-7xl font-normal tracking-[0.3em] text-white leading-tight">
            The Living Trunk
          </h1>

          <p className="text-[11px] uppercase tracking-[0.3em] text-zinc-300 font-light mt-4 max-w-xl leading-relaxed">
            Select 4 bespoke garments online. We deliver an antique trunk to your Bangalore residence for a private 1-hour fitting.
          </p>

          {/* Explicit Navigation Paths */}
          <div className="mt-8 flex flex-wrap justify-center items-center gap-5">
            <a
              href="#women"
              className="border border-white/80 bg-white text-black px-7 py-3 text-[9px] uppercase tracking-[0.3em] font-medium hover:bg-transparent hover:text-white transition-all"
            >
              Shop Women
            </a>
            <a
              href="#men"
              className="border border-white/40 bg-black/40 backdrop-blur-md px-7 py-3 text-[9px] uppercase tracking-[0.3em] text-white hover:border-white transition-all"
            >
              Shop Men
            </a>
            <a
              href="#junior"
              className="border border-white/40 bg-black/40 backdrop-blur-md px-7 py-3 text-[9px] uppercase tracking-[0.3em] text-white hover:border-white transition-all"
            >
              Shop Junior
            </a>
          </div>
        </div>
      </section>

      {/* 2. THREE-STEP PROCESS BANNER */}
      <section id="how-it-works" className="w-full border-t border-b border-white/[0.08] bg-[#090c10] py-8 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center sm:text-left">
          <div className="flex items-center gap-4 justify-center sm:justify-start">
            <span className="font-couture text-2xl text-zinc-500">01</span>
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.25em] font-semibold text-white">Select Any 4 Outfits</h4>
              <p className="text-[11px] text-zinc-400 font-light mt-0.5">Pick across Sarees, Sherwanis & Kids wear.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 justify-center sm:justify-start border-t sm:border-t-0 sm:border-l border-white/[0.08] pt-4 sm:pt-0 sm:pl-8">
            <span className="font-couture text-2xl text-zinc-500">02</span>
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.25em] font-semibold text-white">Doorstep White-Glove Trunk</h4>
              <p className="text-[11px] text-zinc-400 font-light mt-0.5">Delivered to your home at your scheduled hour.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 justify-center sm:justify-start border-t sm:border-t-0 sm:border-l border-white/[0.08] pt-4 sm:pt-0 sm:pl-8">
            <span className="font-couture text-2xl text-zinc-500">03</span>
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.25em] font-semibold text-white">1-Hour Fitting (₹199 Deposit)</h4>
              <p className="text-[11px] text-zinc-400 font-light mt-0.5">Keep what you love; deposit adjusted upon purchase.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WOMEN'S HAUTE COUTURE */}
      <section id="women" className="mx-auto max-w-7xl px-6 py-20 space-y-10">
        <div className="border-b border-white/[0.08] pb-4 flex justify-between items-end">
          <div>
            <p className="text-[9px] uppercase tracking-[0.35em] text-zinc-400">HERITAGE SILKS & BRIDAL LEHENGAS</p>
            <h2 className="font-couture text-2xl sm:text-4xl font-normal tracking-[0.25em] text-white mt-1">
              Women’s Collection
            </h2>
          </div>
          <span className="text-[9px] uppercase tracking-[0.25em] text-zinc-500">
            {womenItems.length} Heirlooms Available
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {womenItems.map((p) => {
            const inTrunk = isItemInTrunk(p.id)
            return (
              <div key={p.id} className="group flex flex-col justify-between space-y-3 text-left">
                {/* Image Frame with Slide-Up Action on Hover */}
                <div className="editorial-frame relative aspect-[3/4] w-full bg-black/60">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={(p as any).imageUrl}
                    alt={p.name}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute top-3 left-3 text-[8px] uppercase tracking-[0.25em] text-zinc-300 bg-black/70 px-2 py-1">
                    {(p as any).craftOrigin}
                  </div>

                  {/* Hover Slide-Up Action */}
                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black via-black/80 to-transparent sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={() => toggleTrunk(p.id)}
                      className={`w-full py-2.5 text-[9px] uppercase tracking-[0.25em] font-medium border transition-all ${
                        inTrunk
                          ? 'bg-white text-black border-white'
                          : 'border-white bg-black/60 text-white hover:bg-white hover:text-black'
                      }`}
                    >
                      {inTrunk ? 'Remove from Trunk ✕' : '+ Add to Trial Trunk'}
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-[9px] uppercase tracking-[0.25em] text-zinc-400">{p.brand}</p>
                  <h3 className="font-couture text-sm font-normal tracking-wide text-white line-clamp-1">{p.name}</h3>
                  <p className="text-xs text-zinc-300 font-light">{formatINR(p.price)}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* 4. MEN'S REGAL COUTURE */}
      <section id="men" className="mx-auto max-w-7xl px-6 py-16 space-y-10 border-t border-white/[0.08]">
        <div className="border-b border-white/[0.08] pb-4 flex justify-between items-end">
          <div>
            <p className="text-[9px] uppercase tracking-[0.35em] text-zinc-400">JODHPUR BANDHGALAS & ACHKANS</p>
            <h2 className="font-couture text-2xl sm:text-4xl font-normal tracking-[0.25em] text-white mt-1">
              Men’s Collection
            </h2>
          </div>
          <span className="text-[9px] uppercase tracking-[0.25em] text-zinc-500">
            {menItems.length} Heirlooms Available
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {menItems.map((p) => {
            const inTrunk = isItemInTrunk(p.id)
            return (
              <div key={p.id} className="group flex flex-col justify-between space-y-3 text-left">
                <div className="editorial-frame relative aspect-[3/4] w-full bg-black/60">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={(p as any).imageUrl}
                    alt={p.name}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute top-3 left-3 text-[8px] uppercase tracking-[0.25em] text-zinc-300 bg-black/70 px-2 py-1">
                    {(p as any).craftOrigin}
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black via-black/80 to-transparent sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={() => toggleTrunk(p.id)}
                      className={`w-full py-2.5 text-[9px] uppercase tracking-[0.25em] font-medium border transition-all ${
                        inTrunk
                          ? 'bg-white text-black border-white'
                          : 'border-white bg-black/60 text-white hover:bg-white hover:text-black'
                      }`}
                    >
                      {inTrunk ? 'Remove from Trunk ✕' : '+ Add to Trial Trunk'}
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-[9px] uppercase tracking-[0.25em] text-zinc-400">{p.brand}</p>
                  <h3 className="font-couture text-sm font-normal tracking-wide text-white line-clamp-1">{p.name}</h3>
                  <p className="text-xs text-zinc-300 font-light">{formatINR(p.price)}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* 5. JUNIOR ATELIER (KIDS) */}
      <section id="junior" className="mx-auto max-w-7xl px-6 py-16 space-y-10 border-t border-white/[0.08]">
        <div className="border-b border-white/[0.08] pb-4 flex justify-between items-end">
          <div>
            <p className="text-[9px] uppercase tracking-[0.35em] text-zinc-400">HYPOALLERGENIC MULMUL · ZERO ITCH</p>
            <h2 className="font-couture text-2xl sm:text-4xl font-normal tracking-[0.25em] text-white mt-1">
              Junior Atelier
            </h2>
          </div>
          <span className="text-[9px] uppercase tracking-[0.25em] text-zinc-500">
            {kidsItems.length} Heirlooms Available
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {kidsItems.map((p) => {
            const inTrunk = isItemInTrunk(p.id)
            return (
              <div key={p.id} className="group flex flex-col justify-between space-y-3 text-left">
                <div className="editorial-frame relative aspect-[3/4] w-full bg-black/60">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={(p as any).imageUrl}
                    alt={p.name}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute top-3 left-3 text-[8px] uppercase tracking-[0.25em] text-zinc-300 bg-black/70 px-2 py-1">
                    Mulmul Lining
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black via-black/80 to-transparent sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={() => toggleTrunk(p.id)}
                      className={`w-full py-2.5 text-[9px] uppercase tracking-[0.25em] font-medium border transition-all ${
                        inTrunk
                          ? 'bg-white text-black border-white'
                          : 'border-white bg-black/60 text-white hover:bg-white hover:text-black'
                      }`}
                    >
                      {inTrunk ? 'Remove from Trunk ✕' : '+ Add to Trial Trunk'}
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-[9px] uppercase tracking-[0.25em] text-zinc-400">{p.brand}</p>
                  <h3 className="font-couture text-sm font-normal tracking-wide text-white line-clamp-1">{p.name}</h3>
                  <p className="text-xs text-zinc-300 font-light">{formatINR(p.price)}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* 6. PERSISTENT FLOATING TRUNK BAR */}
      {trunk.length > 0 && (
        <div className="fixed bottom-6 inset-x-0 z-50 flex justify-center px-4 animate-slide-up">
          <div className="flex items-center justify-between gap-6 border border-white/20 bg-black/90 backdrop-blur-md px-6 py-3.5 shadow-2xl max-w-lg w-full">
            <div>
              <p className="text-[9px] uppercase tracking-[0.3em] text-zinc-400">Doorstep Trial Selection</p>
              <p className="font-couture text-sm text-white">
                {trunk.length} of 4 Outfits Chosen
              </p>
            </div>
            <Link
              href="/trunk"
              className="bg-white text-black px-6 py-2 text-[9px] uppercase tracking-[0.3em] font-medium hover:bg-zinc-200 transition-colors"
            >
              Book Fitting →
            </Link>
          </div>
        </div>
      )}

      {/* 7. ARCHITECTURAL FOOTER */}
      <footer className="border-t border-white/[0.08] pt-24 pb-16 text-center space-y-6 mt-16">
        <p className="font-couture text-3xl sm:text-4xl tracking-[0.4em] text-white">
          PETIKARA
        </p>
        <p className="text-[9px] uppercase tracking-[0.4em] text-zinc-500 max-w-md mx-auto font-light leading-relaxed">
          Haute Couture Private Doorstep Trial Maison · Bangalore
        </p>
        <p className="text-[8px] uppercase tracking-[0.4em] text-zinc-600">
          © {new Date().getFullYear()} Petikara. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
