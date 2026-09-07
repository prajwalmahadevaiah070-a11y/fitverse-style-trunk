'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'
import { toast } from 'sonner'
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Flame,
  ImagePlus,
  Moon,
  Sparkles,
  Sun,
  User,
} from 'lucide-react'

import { Screen } from '@/components/Screen'
import { useFitVerse } from '@/lib/fitverse-store'
import { cn } from '@/lib/utils'
import { formatINR, type Gender } from '@/lib/fitverse-types'

// High-fidelity avatars for users without an instant photo
const PRESET_MANNEQUINS = [
  {
    id: 'mannequin-w',
    label: 'Women Couture Fit',
    gender: 'women',
    src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'mannequin-m',
    label: 'Men Royal Cut',
    gender: 'men',
    src: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'mannequin-k',
    label: 'Junior Festive',
    gender: 'kids',
    src: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80',
  },
]

type LightingMode = 'day' | 'sunset' | 'sangeet'

export default function StudioPage() {
  const { products, addToTrunk } = useFitVerse()
  const fileRef = useRef<HTMLInputElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  const [selectedGender, setSelectedGender] = useState<'all' | Gender>('all')
  const [activePhoto, setActivePhoto] = useState<string>(PRESET_MANNEQUINS[0].src)
  const [selectedGarmentId, setSelectedGarmentId] = useState<string>(products[0]?.id ?? '')
  const [lighting, setLighting] = useState<LightingMode>('day')
  const [monogram, setMonogram] = useState<string>('')
  const [monogramColor, setMonogramColor] = useState<'gold' | 'silver'>('gold')

  const filteredProducts = products.filter((p) => {
    if (selectedGender === 'all') return true
    return p.gender === selectedGender
  })

  const garment = products.find((p) => p.id === selectedGarmentId) ?? filteredProducts[0] ?? products[0]

  const handleCustomUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image')
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      setActivePhoto(reader.result as string)
      toast.success('Custom portrait loaded')
    }
    reader.readAsDataURL(file)
  }

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  // Lighting overlay profiles
  const lightingFilter = {
    day: 'brightness(102%) contrast(100%)',
    sunset: 'sepia(30%) saturate(140%) hue-rotate(-10deg) brightness(98%)',
    sangeet: 'contrast(115%) brightness(90%) drop-shadow(0 0 25px rgba(212, 175, 55, 0.25))',
  }[lighting]

  return (
    <Screen
      eyebrow="Petikara Digital Atelier"
      title="Interactive Try-On & Bespoke Styling"
      subtitle="Preview realistic drape, banquet lighting luster, and custom zardozi monogramming."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT / CENTER: THE LUXURY ATELIER CANVAS */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div
            className="relative w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden border border-border/80 bg-surface-raised shadow-2xl transition-all duration-700"
            style={{ filter: lightingFilter }}
          >
            {/* Mannequin / Upload Portrait */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activePhoto}
              alt="Atelier Model"
              className="h-full w-full object-cover transition-opacity duration-500"
            />

            {/* Couture Garment Overlay Layer */}
            {garment && (
              <div className="pointer-events-none absolute inset-0 mix-blend-multiply opacity-90 transition-all duration-500">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={(garment as any).imageUrl ?? 'https://images.unsplash.com/photo-1610030469983-98e550d6193c'}
                  alt={garment.name}
                  className="h-full w-full object-cover"
                />
              </div>
            )}

            {/* Bespoke Monogram Inscription Layer */}
            {monogram.trim() && (
              <div className="absolute bottom-6 right-6 pointer-events-none rounded-md bg-black/40 px-3 py-1 backdrop-blur-sm border border-gold/30">
                <span
                  className={cn(
                    'font-serif text-sm tracking-widest uppercase font-semibold',
                    monogramColor === 'gold'
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500'
                      : 'text-zinc-200'
                  )}
                >
                  {monogram}
                </span>
                <span className="block text-[8px] tracking-wider text-white/60 text-right uppercase mt-0.5">
                  Hand-Embroidered
                </span>
              </div>
            )}

            {/* Ambient Lighting Tag */}
            <div className="absolute top-4 left-4 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 border border-border/60 text-[10px] text-white/80 flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-gold animate-pulse" />
              {lighting === 'day' && 'Mandap Daylight (5500K)'}
              {lighting === 'sunset' && 'Golden Hour (3200K)'}
              {lighting === 'sangeet' && 'Chandelier Banquet (2700K)'}
            </div>
          </div>

          {/* Mannequin Quick Switchers */}
          <div className="mt-4 flex items-center gap-2">
            <span className="text-xs text-muted-foreground mr-1">Mannequin:</span>
            {PRESET_MANNEQUINS.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setActivePhoto(m.src)}
                className={cn(
                  'rounded-full px-3 py-1 text-xs border transition-all',
                  activePhoto === m.src
                    ? 'border-gold bg-gold/10 text-gold font-medium'
                    : 'border-border bg-card text-muted-foreground hover:text-foreground'
                )}
              >
                {m.gender.toUpperCase()}
              </button>
            ))}
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="rounded-full px-3 py-1 text-xs border border-border bg-card text-muted-foreground hover:border-gold hover:text-gold transition-all flex items-center gap-1"
            >
              <ImagePlus className="size-3" /> Upload
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleCustomUpload}
              className="hidden"
            />
          </div>
        </div>

        {/* RIGHT: BESPOKE PERSONALIZATION & LIGHTING CONTROLS */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Selected Piece Details */}
          {garment && (
            <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-gold">
                  {garment.brand} · {(garment as any).craftOrigin ?? garment.city}
                </span>
                <span className="text-lg font-serif font-bold text-foreground">
                  {formatINR(garment.price)}
                </span>
              </div>
              <h3 className="text-xl font-serif">{garment.name}</h3>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {garment.description}
              </p>
              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    addToTrunk(garment.id, garment.sizes[0] ?? 'Standard')
                    toast.success(`${garment.name} added to home trial trunk`)
                  }}
                  className="flex-1 rounded-full bg-gold-gradient py-2.5 text-xs font-semibold text-black shadow-gold"
                >
                  Add to Trial Trunk (₹199 Deposit)
                </button>
                <Link
                  href="/trunk"
                  className="rounded-full border border-border px-4 py-2.5 text-xs font-medium hover:bg-muted"
                >
                  View Trunk
                </Link>
              </div>
            </div>
          )}

          {/* Ceremony Lighting Simulator */}
          <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
            <label className="eyebrow block">Ceremony Lighting Simulator</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setLighting('day')}
                className={cn(
                  'flex flex-col items-center gap-1.5 rounded-xl border p-3 text-xs transition-all',
                  lighting === 'day' ? 'border-gold bg-gold/10 text-gold' : 'border-border bg-surface-raised'
                )}
              >
                <Sun className="size-4" />
                <span>Day Mandap</span>
              </button>
              <button
                type="button"
                onClick={() => setLighting('sunset')}
                className={cn(
                  'flex flex-col items-center gap-1.5 rounded-xl border p-3 text-xs transition-all',
                  lighting === 'sunset' ? 'border-gold bg-gold/10 text-gold' : 'border-border bg-surface-raised'
                )}
              >
                <Flame className="size-4" />
                <span>Sunset Sundowner</span>
              </button>
              <button
                type="button"
                onClick={() => setLighting('sangeet')}
                className={cn(
                  'flex flex-col items-center gap-1.5 rounded-xl border p-3 text-xs transition-all',
                  lighting === 'sangeet' ? 'border-gold bg-gold/10 text-gold' : 'border-border bg-surface-raised'
                )}
              >
                <Moon className="size-4" />
                <span>Sangeet Night</span>
              </button>
            </div>
          </div>

          {/* Bespoke Monogramming Engine */}
          <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <label className="eyebrow">Bespoke Monogram Inscription</label>
              <span className="text-[10px] text-gold uppercase tracking-wider font-semibold">
                Complimentary
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Personalize with your initials, wedding date, or family crest embroidered onto the cuff or latkan.
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                maxLength={10}
                value={monogram}
                onChange={(e) => setMonogram(e.target.value.toUpperCase())}
                placeholder="e.g. PK · 2026"
                className="flex-1 rounded-xl border border-input bg-surface-raised px-4 py-2.5 text-xs uppercase tracking-widest outline-none focus:border-gold"
              />
              <div className="inline-flex rounded-xl border border-border p-1 bg-surface-raised">
                <button
                  type="button"
                  onClick={() => setMonogramColor('gold')}
                  className={cn(
                    'px-2.5 py-1 text-xs rounded-lg font-medium transition-all',
                    monogramColor === 'gold' ? 'bg-gold text-black' : 'text-muted-foreground'
                  )}
                >
                  Zari Gold
                </button>
                <button
                  type="button"
                  onClick={() => setMonogramColor('silver')}
                  className={cn(
                    'px-2.5 py-1 text-xs rounded-lg font-medium transition-all',
                    monogramColor === 'silver' ? 'bg-white text-black' : 'text-muted-foreground'
                  )}
                >
                  Rupa Silver
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* BOTTOM: COUTURE SELECTION CAROUSEL WITH EQUAL GENDER BALANCE */}
      <div className="mt-12 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="eyebrow">Atelier Wardrobe</p>
            <h3 className="font-serif text-2xl">Curated Heritage Couture</h3>
          </div>

          {/* Gender Filter Tabs */}
          <div className="inline-flex items-center rounded-full border border-border/80 bg-surface-raised p-1 text-xs">
            {(
              [
                { id: 'all', label: 'All Collections' },
                { id: 'women', label: 'Women' },
                { id: 'men', label: 'Men' },
                { id: 'kids', label: 'Junior / Kids' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setSelectedGender(tab.id)
                  const firstMatch = products.find(
                    (p) => tab.id === 'all' || p.gender === tab.id
                  )
                  if (firstMatch) setSelectedGarmentId(firstMatch.id)
                }}
                className={cn(
                  'rounded-full px-4 py-1.5 font-medium transition-all',
                  selectedGender === tab.id
                    ? 'bg-gold font-semibold text-black shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Carousel With Unobtrusive Arrow Controls */}
        <div className="relative">
          <button
            type="button"
            onClick={() => scrollCarousel('left')}
            aria-label="Previous"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 grid size-10 place-items-center rounded-full border border-border bg-card/95 text-foreground shadow-xl backdrop-blur hover:border-gold hover:text-gold transition-colors"
          >
            <ChevronLeft className="size-5" />
          </button>

          {/* Scroll Track with generous padding so arrows never cover cards */}
          <div
            ref={carouselRef}
            className="flex gap-4 overflow-x-auto px-12 py-2 scroll-smooth hide-scrollbar"
          >
            {filteredProducts.map((p) => {
              const isSelected = p.id === selectedGarmentId
              const img = (p as any).imageUrl ?? 'https://images.unsplash.com/photo-1610030469983-98e550d6193c'
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedGarmentId(p.id)}
                  className={cn(
                    'group relative w-48 shrink-0 overflow-hidden rounded-2xl border text-left transition-all',
                    isSelected
                      ? 'border-gold bg-gold/10 ring-2 ring-gold/60 shadow-xl'
                      : 'border-border bg-card hover:border-border/80'
                  )}
                >
                  <div className="aspect-[4/5] w-full overflow-hidden bg-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img}
                      alt={p.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-3">
                    <span className="block truncate text-[10px] uppercase tracking-wider text-gold font-medium">
                      {p.brand}
                    </span>
                    <span className="line-clamp-1 text-xs font-serif font-semibold text-foreground">
                      {p.name}
                    </span>
                    <span className="mt-1 block text-xs font-medium text-muted-foreground">
                      {formatINR(p.price)}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>

          <button
            type="button"
            onClick={() => scrollCarousel('right')}
            aria-label="Next"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 grid size-10 place-items-center rounded-full border border-border bg-card/95 text-foreground shadow-xl backdrop-blur hover:border-gold hover:text-gold transition-colors"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </Screen>
  )
}
