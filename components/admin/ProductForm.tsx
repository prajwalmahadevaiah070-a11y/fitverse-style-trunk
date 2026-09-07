'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { PackagePlus } from 'lucide-react'

import { GarmentSwatch } from '@/components/GarmentSwatch'
import { useFitVerse } from '@/lib/fitverse-store'
import { GENDERS, type Gender, type Product } from '@/lib/fitverse-types'

const blank = {
  name: '',
  brand: '',
  city: '',
  gender: 'women' as Gender,
  category: '',
  subcategory: '',
  price: '',
  mrp: '',
  fabric: '',
  colorName: '',
  swatch0: '#4b1027',
  swatch1: '#c39b52',
  sizes: 'S, M, L, XL',
  description: '',
}

const inputCls =
  'w-full rounded-lg border border-input bg-surface-raised px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus:border-primary/50'

export function ProductForm() {
  const { addProduct } = useFitVerse()
  const [f, setF] = useState(blank)

  const set = (k: keyof typeof blank, v: string) =>
    setF((prev) => ({ ...prev, [k]: v }))

  const preview: Product = {
    id: 'preview',
    name: f.name || 'New outfit',
    brand: f.brand || 'Boutique',
    city: f.city || 'India',
    gender: f.gender,
    category: f.category || 'Ethnic',
    subcategory: f.subcategory || 'Kurta Sets',
    price: Number(f.price) || 0,
    mrp: Number(f.mrp) || 0,
    fabric: f.fabric,
    colorName: f.colorName || 'Colour',
    swatch: [f.swatch0, f.swatch1],
    sizes: [],
    rating: 4.6,
    reviews: 0,
    tryOnFee: 0,
    description: f.description,
  }

  const submit = () => {
    if (f.name.trim().length < 3) return toast.error('Enter the outfit name')
    if (!f.brand.trim()) return toast.error('Enter the boutique / brand')
    const price = Number(f.price)
    const mrp = Number(f.mrp)
    if (!price || price <= 0) return toast.error('Enter a valid price')
    if (!mrp || mrp < price) return toast.error('MRP must be greater than price')

    const sizes = f.sizes
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)

    addProduct({
      id: 'fv-' + Math.random().toString(36).slice(2, 8),
      name: f.name.trim(),
      brand: f.brand.trim(),
      city: f.city.trim() || 'India',
      gender: f.gender,
      category: f.category.trim() || 'Ethnic',
      subcategory: f.subcategory.trim() || 'New',
      price,
      mrp,
      fabric: f.fabric.trim() || 'Premium fabric',
      colorName: f.colorName.trim() || 'Signature',
      swatch: [f.swatch0, f.swatch1],
      sizes: sizes.length ? sizes : ['Free'],
      rating: 4.6,
      reviews: 0,
      tryOnFee: 0,
      description: f.description.trim() || 'Freshly onboarded to the FitVerse trunk.',
    })
    toast.success(`${f.name} is now live in the store`)
    setF(blank)
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <p className="mb-4 inline-flex items-center gap-2 text-sm font-medium">
        <PackagePlus className="size-4 text-gold" />
        Onboard a new outfit
      </p>

      <div className="flex gap-4">
        <div className="fabric-sheen hidden size-28 shrink-0 place-items-center rounded-xl bg-surface-raised p-3 sm:grid">
          <GarmentSwatch product={preview} className="h-full w-full" />
        </div>

        <div className="grid flex-1 grid-cols-2 gap-3">
          <input className={inputCls} placeholder="Outfit name" value={f.name} onChange={(e) => set('name', e.target.value)} />
          <input className={inputCls} placeholder="Boutique / brand" value={f.brand} onChange={(e) => set('brand', e.target.value)} />
          <input className={inputCls} placeholder="City" value={f.city} onChange={(e) => set('city', e.target.value)} />
          <select className={inputCls} value={f.gender} onChange={(e) => set('gender', e.target.value)}>
            {GENDERS.map((g) => (
              <option key={g.id} value={g.id} className="bg-surface-raised">
                {g.label}
              </option>
            ))}
          </select>
          <input className={inputCls} placeholder="Category (e.g. Ethnic)" value={f.category} onChange={(e) => set('category', e.target.value)} />
          <input className={inputCls} placeholder="Subcategory (e.g. Sarees)" value={f.subcategory} onChange={(e) => set('subcategory', e.target.value)} />
          <input className={inputCls} inputMode="numeric" placeholder="Price ₹" value={f.price} onChange={(e) => set('price', e.target.value.replace(/\D/g, ''))} />
          <input className={inputCls} inputMode="numeric" placeholder="MRP ₹" value={f.mrp} onChange={(e) => set('mrp', e.target.value.replace(/\D/g, ''))} />
          <input className={inputCls} placeholder="Fabric" value={f.fabric} onChange={(e) => set('fabric', e.target.value)} />
          <input className={inputCls} placeholder="Colour name" value={f.colorName} onChange={(e) => set('colorName', e.target.value)} />
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <input className={inputCls} placeholder="Sizes (comma separated)" value={f.sizes} onChange={(e) => set('sizes', e.target.value)} />
        <div className="flex items-center gap-2 rounded-lg border border-input bg-surface-raised px-3">
          <span className="text-xs text-muted-foreground">Swatch</span>
          <input type="color" value={f.swatch0} onChange={(e) => set('swatch0', e.target.value)} className="h-7 w-8 cursor-pointer rounded border-0 bg-transparent" aria-label="Primary colour" />
          <input type="color" value={f.swatch1} onChange={(e) => set('swatch1', e.target.value)} className="h-7 w-8 cursor-pointer rounded border-0 bg-transparent" aria-label="Accent colour" />
        </div>
      </div>

      <textarea className={`${inputCls} mt-3 resize-none`} rows={2} placeholder="Short description" value={f.description} onChange={(e) => set('description', e.target.value)} />

      <button
        type="button"
        onClick={submit}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold-gradient py-3 text-sm font-semibold text-primary-foreground shadow-gold"
      >
        <PackagePlus className="size-4" />
        Add outfit to store
      </button>
    </div>
  )
}
