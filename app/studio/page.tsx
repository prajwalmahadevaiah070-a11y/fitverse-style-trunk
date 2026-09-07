'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useFitVerse } from '@/lib/fitverse-store'
import { formatINR, type Gender } from '@/lib/fitverse-types'

const PRESET_PORTRAITS = [
  {
    id: 'w-port',
    label: 'Women',
    gender: 'women' as Gender,
    src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'm-port',
    label: 'Men',
    gender: 'men' as Gender,
    src: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'k-port',
    label: 'Junior',
    gender: 'kids' as Gender,
    src: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=900&q=80',
  },
]

export default function StudioPage() {
  const { products, addToTrunk } = useFitVerse()
  const [selectedGender, setSelectedGender] = useState<'all' | Gender>('all')
  const [activePhoto, setActivePhoto] = useState<string>(PRESET_PORTRAITS[0].src)
  const [selectedGarmentId, setSelectedGarmentId] = useState<string>(products[0]?.id ?? 'pk-w-01')
  const [lighting, setLighting] = useState<'mandap' | 'sangeet' | 'banquet'>('mandap')
  const [monogram, setMonogram] = useState<string>('')
  const [added, setAdded] = useState(false)

  const filteredProducts = (products || []).filter((p) => {
    if (selectedGender === 'all') return true
    return p.gender === selectedGender
  })

  const garment = products.find((p) => p.id === selectedGarmentId) ?? filteredProducts[0] ?? products[0]

  const lightingStyle = {
    mandap: 'brightness(102%) contrast(100%)',
    sangeet: 'sepia(25%) saturate(135%) hue-rotate(-10deg) brightness(98%)',
    banquet: 'contrast(115%) brightness(92%) drop-shadow(0 0 25px rgba(212, 175, 55, 0.25))',
  }[lighting]

  const handleAdd = () => {
    if (!garment) return
    addToTrunk(garment.id, 'Standard')
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="mx-auto max-w-7xl px-6 sm:px-12 py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <p className="text-[10px] uppercase tracking-[0.4em] text-[#d4af37]">DIGITAL ATELIER</p>
        <h1 className="font-serif text-4xl sm:text-5xl font-light tracking-wide text-white">
          Interactive Styling Studio
        </h1>
        <p className="text-xs text-zinc-400 font-light tracking-wider">
          Experience realistic ceremony drape, banquet luster, and bespoke monogramming.
        </p>
      </div>

      {/* Main Studio Spread */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Atelier Viewport */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div
            className="relative w-full max-w-md aspect-[3/4] overflow-hidden border border-white/[0.08] bg-black/60 shadow-2xl transition-all duration-700"
            style={{ filter: lightingStyle }}
          >
            {/* Base Portrait */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activePhoto}
              alt="Model"
              className="h-full w-full object-cover"
            />

            {/* Garment Drape Overlay */}
            {garment && (
              <div className="pointer-events-none absolute inset-0 mix-blend-multiply opacity-85 transition-opacity duration-500">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={(garment as any).imageUrl}
                  alt={garment.name}
                  className="h-full w-full object-cover"
                />
              </div>
            )}

            {/* Bespoke Monogram Inscription */}
            {monogram.trim() && (
              <div className="absolute bottom-6 right-6 border border-[#d4af37]/60 bg-black/70 px-3 py-1 backdrop-blur-md">
                <span className="font-serif text-xs uppercase tracking-[0.2em] text-[#d4af37]">
                  {monogram}
                </span>
              </div>
            )}

            {/* Lighting indicator */}
            <div className="absolute top-4 left-4 border border-white/20 bg-black/70 px-3 py-1 text-[9px] uppercase tracking-widest text-white">
              {lighting === 'mandap' && 'Mandap Daylight (5500K)'}
              {lighting === 'sangeet' && 'Sangeet Golden Hour (3200K)'}
              {lighting === 'banquet' && 'Chandelier Banquet (2700K)'}
            </div>
          </div>

          {/* Model Switcher */}
          <div className="mt-6 flex items-center gap-4 text-xs uppercase tracking-wider">
            <span className="text-zinc-500">Atelier Form:</span>
            {PRESET_PORTRAITS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setActivePhoto(p.src)}
                className={`transition-colors ${
                  activePhoto === p.src ? 'text-[#d4af37] border-b border-[#d4af37]' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Controls & Details */}
        <div className="lg:col-span-5 space-y-8 border border-white/[0.08] bg-white/[0.02] p-8">
          {garment && (
            <div className="space-y-4 border-b border-white/[0.08] pb-6">
              <p className="text-[9px] uppercase tracking-[0.25em] text-[#d4af37]">
                {garment.brand} · {(garment as any).craftOrigin ?? garment.city}
              </p>
              <h2 className="font-serif text-2xl text-white font-normal">{garment.name}</h2>
              <p className="text-xs text-zinc-400 font-light leading-relaxed tracking-wide">
                {garment.description}
              </p>
              <p className="font-serif text-xl text-white font-light">{formatINR(garment.price)}</p>

              <div className="pt-2 flex gap-4">
                <button
                  type="button"
                  onClick={handleAdd}
                  className={`flex-1 py-3 text-[10px] uppercase tracking-[0.25em] font-semibold transition-all ${
                    added
                      ? 'bg-white text-black'
                      : 'border border-[#d4af37] bg-[#d4af37] text-black hover:bg-transparent hover:text-[#d4af37]'
                  }`}
                >
                  {added ? 'Added to Trunk ✓' : 'Add to Doorstep Trunk'}
                </button>
                <Link
                  href="/trunk"
                  className="border border-white/20 px-6 py-3 text-[10px] uppercase tracking-[0.25em] text-white hover:border-white transition-all flex items-center"
                >
                  Trunk
                </Link>
              </div>
            </div>
          )}

          {/* Ceremony Lighting Toggle */}
          <div className="space-y-3">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#d4af37]">Ceremony Lighting</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'mandap', label: 'Mandap' },
                { id: 'sangeet', label: 'Sangeet' },
                { id: 'banquet', label: 'Banquet' },
              ].map((light) => (
                <button
                  key={light.id}
                  type="button"
                  onClick={() => setLighting(light.id as any)}
                  className={`border py-2 text-[10px] uppercase tracking-wider transition-all ${
                    lighting === light.id
                      ? 'border-[#d4af37] bg-[#d4af37]/10 text-[#d4af37]'
                      : 'border-white/[0.08] text-zinc-400 hover:text-white'
                  }`}
                >
                  {light.label}
                </button>
              ))}
            </div>
          </div>

          {/* Monogramming */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#d4af37]">Bespoke Monogram</p>
              <span className="text-[9px] uppercase tracking-widest text-emerald-400">Complimentary</span>
            </div>
            <input
              type="text"
              maxLength={10}
              value={monogram}
              onChange={(e) => setMonogram(e.target.value.toUpperCase())}
              placeholder="e.g. PK · 2026"
              className="w-full border border-white/[0.12] bg-[#0a0d12] p-3 text-xs uppercase tracking-widest text-white outline-none focus:border-[#d4af37]"
            />
          </div>
        </div>
      </div>

      {/* Wardrobe Selector */}
      <div className="space-y-6 pt-12 border-t border-white/[0.08]">
        <div className="flex justify-between items-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#d4af37]">Select Creation to Drape</p>
          <div className="flex gap-4 text-[10px] uppercase tracking-widest">
            {(['all', 'women', 'men', 'kids'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setSelectedGender(tab)}
                className={selectedGender === tab ? 'text-[#d4af37]' : 'text-zinc-500 hover:text-white'}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredProducts.map((p) => {
            const isSelected = p.id === (garment?.id ?? '')
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedGarmentId(p.id)}
                className={`text-left space-y-2 border p-2 transition-all ${
                  isSelected ? 'border-[#d4af37] bg-white/[0.04]' : 'border-white/[0.08] hover:border-white/30'
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={(p as any).imageUrl}
                  alt={p.name}
                  className="aspect-[3/4] w-full object-cover"
                />
                <p className="text-[8px] uppercase tracking-widest text-[#d4af37] truncate">{p.brand}</p>
                <p className="font-serif text-xs text-white truncate">{p.name}</p>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
