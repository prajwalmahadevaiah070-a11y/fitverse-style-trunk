'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'
import { toast } from 'sonner'
import { ArrowRight, ChevronLeft, ChevronRight, ImagePlus, Sparkles, Trash2 } from 'lucide-react'

import { GarmentSwatch } from '@/components/GarmentSwatch'
import { Screen } from '@/components/Screen'
import { useFitVerse } from '@/lib/fitverse-store'
import { cn } from '@/lib/utils'
import type { Gender } from '@/lib/fitverse-types'

export default function StudioPage() {
  const { products, photos, addPhoto, removePhoto } = useFitVerse()
  const fileRef = useRef<HTMLInputElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  const [photo, setPhoto] = useState<string | null>(null)
  const [selectedGender, setSelectedGender] = useState<'all' | Gender>('all')
  const [garmentId, setGarmentId] = useState(products[0]?.id ?? '')
  const [scale, setScale] = useState(70)
  const [offsetY, setOffsetY] = useState(20)

  // Filter garments based on gender tab
  const filteredProducts = products.filter((p) => {
    if (selectedGender === 'all') return true
    return p.gender === selectedGender
  })

  const garment = products.find((p) => p.id === garmentId) ?? filteredProducts[0] ?? products[0]

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      toast.error('Please choose an image file')
      return
    }
    const reader = new FileReader()
    reader.onload = () => setPhoto(reader.result as string)
    reader.readAsDataURL(file)
  }

  const saveLook = () => {
    if (!photo) {
      toast.error('Add a photo first')
      return
    }
    addPhoto({ label: garment?.name ?? 'Look', dataUrl: photo })
    toast.success('Look saved to your studio')
  }

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -260 : 260
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <Screen
      eyebrow="Digital Try-On Studio"
      title="Style it on you"
      subtitle="Upload a photo and preview the drape before the trunk arrives."
    >
      <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-surface-raised">
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo} alt="Your uploaded photo" className="h-full w-full object-cover" />
        ) : (
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="grid h-full w-full place-items-center gap-2 text-muted-foreground"
          >
            <ImagePlus className="size-8" />
            <span className="text-sm">Tap to upload your photo</span>
            <span className="text-xs">Stays on your device</span>
          </button>
        )}

        {photo && garment && (
          <div
            className="pointer-events-none absolute left-1/2 -translate-x-1/2"
            style={{
              width: `${scale}%`,
              bottom: `${offsetY}%`,
            }}
          >
            <GarmentSwatch product={garment} className="h-auto w-full" opacity={0.88} />
          </div>
        )}
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="hidden"
      />

      {photo && (
        <div className="mx-auto mt-3 flex max-w-sm gap-2">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="flex-1 rounded-full border border-border py-2 text-xs hover:border-gold transition-colors"
          >
            Change photo
          </button>
          <button
            type="button"
            onClick={() => setPhoto(null)}
            className="flex-1 rounded-full border border-border py-2 text-xs text-destructive hover:bg-destructive/10 transition-colors"
          >
            Remove
          </button>
        </div>
      )}

      {/* CHOOSE A GARMENT SECTION */}
      <div className="mt-6 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="eyebrow">Choose a garment</p>

          {/* Gender Filter Pills */}
          <div className="inline-flex items-center rounded-full border border-border/70 bg-surface-raised p-1 text-xs self-start sm:self-auto">
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
                onClick={() => {
                  setSelectedGender(tab.id)
                  const firstOfGender = products.find(
                    (p) => tab.id === 'all' || p.gender === tab.id
                  )
                  if (firstOfGender) setGarmentId(firstOfGender.id)
                }}
                className={cn(
                  'rounded-full px-3.5 py-1 font-medium capitalize transition-all',
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

        {/* Carousel with Navigation Arrows */}
        <div className="relative group">
          {/* Scroll Left Button */}
          <button
            type="button"
            onClick={() => scrollCarousel('left')}
            aria-label="Scroll left"
            className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 hidden sm:grid size-8 place-items-center rounded-full border border-border bg-card/95 text-foreground shadow-md backdrop-blur hover:border-gold hover:text-gold transition-colors"
          >
            <ChevronLeft className="size-4" />
          </button>

          {/* Garments Container */}
          <div
            ref={carouselRef}
            className="hide-scrollbar -mx-4 flex gap-2.5 overflow-x-auto px-4 pb-2 scroll-smooth"
          >
            {filteredProducts.length > 0 ? (
              filteredProducts.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setGarmentId(p.id)}
                  className={cn(
                    'w-24 shrink-0 rounded-xl border p-2 text-left transition-all',
                    garmentId === p.id
                      ? 'border-gold bg-gold/10 ring-1 ring-gold shadow-md'
                      : 'border-border bg-card hover:border-border/80'
                  )}
                >
                  <GarmentSwatch product={p} className="h-16 w-full" />
                  <span className="mt-1 line-clamp-1 block text-[0.65rem] font-medium text-foreground">
                    {p.name}
                  </span>
                  <span className="line-clamp-1 block text-[0.6rem] text-muted-foreground">
                    {p.brand}
                  </span>
                </button>
              ))
            ) : (
              <p className="py-4 text-xs text-muted-foreground">
                No couture items found in this section yet.
              </p>
            )}
          </div>

          {/* Scroll Right Button */}
          <button
            type="button"
            onClick={() => scrollCarousel('right')}
            aria-label="Scroll right"
            className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 hidden sm:grid size-8 place-items-center rounded-full border border-border bg-card/95 text-foreground shadow-md backdrop-blur hover:border-gold hover:text-gold transition-colors"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      {photo && (
        <div className="mt-4 space-y-4 rounded-xl border border-border bg-card p-4">
          <label className="block text-xs">
            <span className="mb-1 flex justify-between text-muted-foreground">
              <span>Fit width</span>
              <span>{scale}%</span>
            </span>
            <input
              type="range"
              min={40}
              max={100}
              value={scale}
              onChange={(e) => setScale(Number(e.target.value))}
              className="w-full accent-[var(--gold)]"
            />
          </label>
          <label className="block text-xs">
            <span className="mb-1 flex justify-between text-muted-foreground">
              <span>Vertical placement</span>
              <span>{offsetY}%</span>
            </span>
            <input
              type="range"
              min={0}
              max={55}
              value={offsetY}
              onChange={(e) => setOffsetY(Number(e.target.value))}
              className="w-full accent-[var(--gold)]"
            />
          </label>
        </div>
      )}

      <div className="mt-5 flex gap-3">
        <button
          type="button"
          onClick={saveLook}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gold-gradient py-3 text-sm font-medium text-primary-foreground shadow-gold"
        >
          <Sparkles className="size-4" />
          Save this look
        </button>
        <Link
          href="/trunk"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium hover:bg-muted transition-colors"
        >
          Trunk <ArrowRight className="size-4" />
        </Link>
      </div>

      {photos.length > 0 && (
        <div className="mt-6">
          <p className="eyebrow mb-2">Saved looks</p>
          <div className="grid grid-cols-3 gap-3">
            {photos.map((ph) => (
              <div
                key={ph.id}
                className="group relative overflow-hidden rounded-lg border border-border"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ph.dataUrl}
                  alt={ph.label}
                  className="aspect-[3/4] w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removePhoto(ph.id)}
                  aria-label="Delete look"
                  className="absolute right-1 top-1 grid size-6 place-items-center rounded-full bg-background/70 text-destructive backdrop-blur hover:bg-background"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </Screen>
  )
}
