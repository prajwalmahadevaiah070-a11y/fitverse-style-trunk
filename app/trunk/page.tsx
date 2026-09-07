'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useFitVerse } from '@/lib/fitverse-store'
import { formatINR } from '@/lib/fitverse-types'

export default function TrunkPage() {
  const { trunk, products, removeFromTrunk, clearTrunk, placeOrder } = useFitVerse()
  const [address, setAddress] = useState('')
  const [slot, setSlot] = useState('Tomorrow, 11:00 AM - 12:00 PM')
  const [confirmed, setConfirmed] = useState(false)

  const trunkItems = trunk
    .map((item) => {
      const product = products.find((p) => p.id === item.productId)
      return { ...item, product }
    })
    .filter((item): item is typeof item & { product: NonNullable<typeof item.product> } => Boolean(item.product))

  const totalValue = trunkItems.reduce((sum, item) => sum + item.product.price, 0)
  const deposit = 199

  const handleBookTrial = (e: React.FormEvent) => {
    e.preventDefault()
    if (!address.trim()) return

    placeOrder({
      items: trunk,
      customerName: 'Patron',
      customerPhone: '+91 98000 00000',
      address,
      preferredSlot: slot,
      garmentValue: totalValue,
    })

    setConfirmed(true)
    clearTrunk()
  }

  if (confirmed) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center space-y-6">
        <p className="text-[10px] uppercase tracking-[0.4em] text-[#d4af37]">BOOKING CONFIRMED</p>
        <h1 className="font-serif text-4xl sm:text-5xl font-light text-white tracking-wide">
          Your Antique Trunk is Being Prepared
        </h1>
        <div className="w-12 h-[1px] bg-[#d4af37] mx-auto" />
        <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed tracking-wider max-w-md mx-auto">
          Our white-glove style concierge will hand-deliver your curated trunk to {address} for your private 1-hour trial during: <br />
          <span className="text-white font-medium">{slot}</span>.
        </p>
        <p className="text-[11px] text-zinc-500 uppercase tracking-widest">
          Trial Security Deposit: ₹199 (Adjusted upon purchase)
        </p>
        <div className="pt-6">
          <Link
            href="/"
            className="inline-block border border-white/30 px-8 py-3.5 text-[10px] uppercase tracking-[0.25em] text-white hover:border-[#d4af37] hover:text-[#d4af37] transition-all"
          >
            Return to Atelier
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-6 sm:px-12 py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <p className="text-[10px] uppercase tracking-[0.4em] text-[#d4af37]">THE PRIVATE FITTING ROOM</p>
        <h1 className="font-serif text-4xl sm:text-5xl font-light tracking-wide text-white">
          Your Curated Doorstep Trunk
        </h1>
        <p className="text-xs text-zinc-400 font-light tracking-wider">
          Select up to 4 heirloom garments to experience at home before purchasing.
        </p>
      </div>

      {trunkItems.length === 0 ? (
        <div className="text-center py-20 border border-white/[0.08] bg-white/[0.02] space-y-6">
          <p className="font-serif text-2xl text-zinc-400 font-light">Your trunk is currently empty.</p>
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 max-w-xs mx-auto">
            Explore our collections and add up to 4 pieces for private doorstep fitting.
          </p>
          <div>
            <Link
              href="/#wardrobe"
              className="inline-block border border-[#d4af37] bg-[#d4af37] px-8 py-3 text-[10px] uppercase tracking-[0.25em] font-semibold text-black hover:bg-transparent hover:text-[#d4af37] transition-all"
            >
              Browse Collections
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Garment List */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 text-xs uppercase tracking-widest text-zinc-400">
              <span>Trunk Curation ({trunkItems.length} / 4 Outfits)</span>
              <button
                type="button"
                onClick={clearTrunk}
                className="text-zinc-500 hover:text-white transition-colors"
              >
                Clear All
              </button>
            </div>

            <div className="space-y-4">
              {trunkItems.map(({ product, size }) => (
                <div
                  key={product.id}
                  className="flex gap-6 border border-white/[0.08] bg-white/[0.02] p-4 items-center justify-between"
                >
                  <div className="flex gap-4 items-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={(product as any).imageUrl}
                      alt={product.name}
                      className="size-20 object-cover border border-white/[0.08]"
                    />
                    <div className="space-y-1 text-left">
                      <p className="text-[9px] uppercase tracking-[0.2em] text-[#d4af37]">
                        {product.brand} · {product.gender}
                      </p>
                      <h3 className="font-serif text-base text-white font-normal">{product.name}</h3>
                      <p className="text-xs text-zinc-400 font-light">Size: {size}</p>
                      <p className="text-xs text-white">{formatINR(product.price)}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFromTrunk(product.id)}
                    className="text-xs uppercase tracking-wider text-zinc-500 hover:text-red-400 transition-colors px-3 py-1"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Booking Form */}
          <div className="lg:col-span-5 border border-white/[0.08] bg-white/[0.02] p-8 space-y-6">
            <h2 className="font-serif text-2xl text-white font-light tracking-wide">
              Doorstep Trial Reservation
            </h2>

            <div className="space-y-3 text-xs tracking-wider border-b border-white/[0.08] pb-6">
              <div className="flex justify-between text-zinc-400">
                <span>Selected Garments Value</span>
                <span className="text-white">{formatINR(totalValue)}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Doorstep White-Glove Fitting</span>
                <span className="text-emerald-400 uppercase text-[10px]">Complimentary</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Private Trial Security Deposit</span>
                <span className="text-[#d4af37] font-semibold">{formatINR(deposit)}</span>
              </div>
              <p className="text-[10px] text-zinc-500 leading-relaxed pt-2">
                *The ₹199 trial deposit covers hand-delivery and is 100% adjusted towards any piece you decide to keep.
              </p>
            </div>

            <form onSubmit={handleBookTrial} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-[10px] uppercase tracking-[0.25em] text-zinc-400">
                  Bengaluru Residence Address
                </label>
                <textarea
                  required
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Apartment, Villa / Street, Locality"
                  className="w-full border border-white/[0.12] bg-[#0a0d12] p-3 text-xs text-white placeholder:text-zinc-600 outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] uppercase tracking-[0.25em] text-zinc-400">
                  Preferred 1-Hour Fitting Window
                </label>
                <select
                  value={slot}
                  onChange={(e) => setSlot(e.target.value)}
                  className="w-full border border-white/[0.12] bg-[#0a0d12] p-3 text-xs text-white outline-none focus:border-[#d4af37]"
                >
                  <option value="Tomorrow, 11:00 AM - 12:00 PM">Tomorrow, 11:00 AM - 12:00 PM</option>
                  <option value="Tomorrow, 03:00 PM - 04:00 PM">Tomorrow, 03:00 PM - 04:00 PM</option>
                  <option value="Tomorrow, 06:00 PM - 07:00 PM">Tomorrow, 06:00 PM - 07:00 PM</option>
                  <option value="Day After, 11:00 AM - 12:00 PM">Day After, 11:00 AM - 12:00 PM</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-[#d4af37] py-4 text-[10px] uppercase tracking-[0.25em] font-semibold text-black hover:bg-white transition-all mt-4"
              >
                Reserve Doorstep Trunk (₹199)
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
