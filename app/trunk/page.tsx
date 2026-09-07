'use client'

import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'
import {
  Briefcase,
  CalendarClock,
  CheckCircle2,
  MapPin,
  Trash2,
} from 'lucide-react'

import { GarmentSwatch } from '@/components/GarmentSwatch'
import { PaymentModal, type CheckoutDetails } from '@/components/PaymentModal'
import { Screen } from '@/components/Screen'
import { useFitVerse } from '@/lib/fitverse-store'
import {
  formatINR,
  TRIAL_DEPOSIT,
  TRUNK_CAP,
} from '@/lib/fitverse-types'
import { cn } from '@/lib/utils'

const SLOTS = [
  'Today · 6–7 PM',
  'Today · 7–8 PM',
  'Tomorrow · 10–11 AM',
  'Tomorrow · 12–1 PM',
  'Tomorrow · 5–6 PM',
  'Tomorrow · 7–8 PM',
]

const empty: CheckoutDetails = {
  name: '',
  phone: '',
  address: '',
  pincode: '',
  slot: '',
}

export default function TrunkPage() {
  const { trunk, productById, removeFromTrunk, hydrated } = useFitVerse()
  const [form, setForm] = useState<CheckoutDetails>(empty)
  const [showPayment, setShowPayment] = useState(false)
  const [done, setDone] = useState(false)

  const items = trunk
    .map((i) => ({ item: i, product: productById(i.productId) }))
    .filter((x) => x.product)
  const garmentValue = items.reduce((s, x) => s + (x.product?.price ?? 0), 0)

  const set = (k: keyof CheckoutDetails, v: string) =>
    setForm((f) => ({ ...f, [k]: v }))

  const validate = () => {
    if (form.name.trim().length < 2) return 'Enter your full name'
    if (!/^\d{10}$/.test(form.phone)) return 'Enter a valid 10-digit phone number'
    if (form.address.trim().length < 8) return 'Enter your complete street address'
    if (!/^\d{6}$/.test(form.pincode)) return 'Enter a valid 6-digit pincode'
    if (!form.slot) return 'Pick a preferred 1-hour trial slot'
    return null
  }

  const proceed = () => {
    const err = validate()
    if (err) {
      toast.error(err)
      return
    }
    setShowPayment(true)
  }

  if (!hydrated) {
    return (
      <div className="grid min-h-[60dvh] place-items-center text-sm text-muted-foreground">
        Loading…
      </div>
    )
  }

  if (done) {
    return (
      <Screen eyebrow="Trunk dispatched" title="You're all set">
        <div className="grid place-items-center gap-4 rounded-2xl border border-border bg-card p-8 text-center">
          <CheckCircle2 className="size-12 text-success" />
          <p className="text-sm text-muted-foreground">
            Your order is saved and the dispatch team has your details on
            WhatsApp. Keep your {formatINR(TRIAL_DEPOSIT)} receipt handy — it is
            fully refundable.
          </p>
          <Link
            href="/browse"
            className="rounded-full bg-gold-gradient px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-gold"
          >
            Continue browsing
          </Link>
        </div>
      </Screen>
    )
  }

  if (items.length === 0) {
    return (
      <Screen eyebrow="Your trunk" title="Nothing packed yet">
        <div className="grid place-items-center gap-4 rounded-2xl border border-dashed border-border p-10 text-center">
          <Briefcase className="size-10 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Add up to {TRUNK_CAP} outfits to try at home. You only pay a
            refundable {formatINR(TRIAL_DEPOSIT)} deposit to book your slot.
          </p>
          <Link
            href="/browse"
            className="rounded-full bg-gold-gradient px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-gold"
          >
            Browse collection
          </Link>
        </div>
      </Screen>
    )
  }

  return (
    <Screen
      eyebrow="Doorstep trial"
      title="Your trunk"
      subtitle={`${items.length} of ${TRUNK_CAP} outfits · ${formatINR(garmentValue)} garment value`}
    >
      <ul className="space-y-3">
        {items.map(({ item, product }) => (
          <li
            key={item.productId}
            className="flex gap-3 rounded-xl border border-border bg-card p-3"
          >
            <div className="fabric-sheen size-20 shrink-0 rounded-lg bg-surface-raised p-2">
              <GarmentSwatch product={product!} className="h-full w-full" />
            </div>
            <div className="flex flex-1 flex-col">
              <p className="text-[0.7rem] uppercase tracking-wide text-muted-foreground">
                {product!.brand}
              </p>
              <p className="line-clamp-1 text-sm">{product!.name}</p>
              <p className="text-xs text-muted-foreground">Size {item.size}</p>
              <div className="mt-auto flex items-center justify-between">
                <span className="text-sm font-semibold">
                  {formatINR(product!.price)}
                </span>
                <button
                  type="button"
                  onClick={() => removeFromTrunk(item.productId)}
                  aria-label="Remove from trunk"
                  className="inline-flex items-center gap-1 text-xs text-destructive"
                >
                  <Trash2 className="size-3.5" />
                  Remove
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 space-y-4 rounded-2xl border border-border bg-card p-4">
        <p className="inline-flex items-center gap-2 text-sm font-medium">
          <MapPin className="size-4 text-gold" />
          Delivery details
        </p>

        <Field label="Full name">
          <input
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            placeholder="e.g. Meera Nair"
            className={inputCls}
          />
        </Field>

        <Field label="Phone number">
          <input
            inputMode="numeric"
            maxLength={10}
            value={form.phone}
            onChange={(e) => set('phone', e.target.value.replace(/\D/g, ''))}
            placeholder="10-digit mobile"
            className={inputCls}
          />
        </Field>

        <Field label="Complete street address">
          <textarea
            value={form.address}
            onChange={(e) => set('address', e.target.value)}
            placeholder="Flat / house no., street, area, city"
            rows={3}
            className={cn(inputCls, 'resize-none')}
          />
        </Field>

        <Field label="Pincode">
          <input
            inputMode="numeric"
            maxLength={6}
            value={form.pincode}
            onChange={(e) => set('pincode', e.target.value.replace(/\D/g, ''))}
            placeholder="6-digit pincode"
            className={inputCls}
          />
        </Field>

        <div>
          <p className="eyebrow mb-2 inline-flex items-center gap-1.5">
            <CalendarClock className="size-3.5" />
            Preferred 1-hour trial slot
          </p>
          <div className="grid grid-cols-2 gap-2">
            {SLOTS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => set('slot', s)}
                className={cn(
                  'rounded-lg border px-3 py-2 text-xs transition-colors',
                  form.slot === s
                    ? 'border-gold bg-gold/10 text-gold'
                    : 'border-border text-muted-foreground hover:text-foreground',
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-gold/30 bg-gold/5 p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Refundable trial deposit</span>
          <span className="font-semibold">{formatINR(TRIAL_DEPOSIT)}</span>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          Pay only the deposit now. Settle for the pieces you keep after your
          trial; the deposit is refunded.
        </p>
      </div>

      <button
        type="button"
        onClick={proceed}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold-gradient py-3.5 text-sm font-semibold text-primary-foreground shadow-gold"
      >
        Pay {formatINR(TRIAL_DEPOSIT)} deposit &amp; book trial
      </button>

      {showPayment && (
        <PaymentModal
          details={form}
          items={trunk}
          onClose={() => setShowPayment(false)}
          onConfirmed={() => {
            setShowPayment(false)
            setDone(true)
          }}
        />
      )}
    </Screen>
  )
}

const inputCls =
  'w-full rounded-lg border border-input bg-surface-raised px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-primary/50'

function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="eyebrow mb-1.5 block">{label}</span>
      {children}
    </label>
  )
}
