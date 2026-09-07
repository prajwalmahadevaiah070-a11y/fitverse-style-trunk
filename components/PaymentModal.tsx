'use client'

import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { toast } from 'sonner'
import { Banknote, Copy, MessageCircle, X } from 'lucide-react'

import {
  PAYMENT,
  formatINR,
  upiUri,
  type TrunkItem,
} from '@/lib/fitverse-types'
import { useFitVerse } from '@/lib/fitverse-store'
import { WHATSAPP_DISPATCH } from '@/lib/fitverse-types'

export type CheckoutDetails = {
  name: string
  phone: string
  address: string
  pincode: string
  slot: string
}

function copy(text: string, label: string) {
  navigator.clipboard?.writeText(text).then(
    () => toast.success(`${label} copied`),
    () => toast.error('Could not copy'),
  )
}

export function PaymentModal({
  details,
  items,
  onClose,
  onConfirmed,
}: {
  details: CheckoutDetails
  items: TrunkItem[]
  onClose: () => void
  onConfirmed: () => void
}) {
  const { productById, placeOrder, clearTrunk } = useFitVerse()
  const [utr, setUtr] = useState('')

  const lineItems = items
    .map((i) => {
      const p = productById(i.productId)
      if (!p) return null
      return {
        productId: p.id,
        name: p.name,
        brand: p.brand,
        size: i.size,
        price: p.price,
      }
    })
    .filter(Boolean) as {
    productId: string
    name: string
    brand: string
    size: string
    price: number
  }[]

  const garmentValue = lineItems.reduce((s, i) => s + i.price, 0)

  const confirm = () => {
    const ref = utr.trim()
    if (!/^\d{12}$/.test(ref)) {
      toast.error('Enter the 12-digit UPI UTR / transaction reference')
      return
    }
    if (lineItems.length === 0) {
      toast.error('Your trunk is empty')
      return
    }

    const order = placeOrder({
      name: details.name,
      phone: details.phone,
      address: details.address,
      pincode: details.pincode,
      slot: details.slot,
      items: lineItems,
      utr: ref,
      garmentValue,
    })

    const itemLines = lineItems
      .map((i) => `• ${i.name} (${i.brand}) — Size ${i.size} — ${formatINR(i.price)}`)
      .join('\n')

    const message = [
      `*New FitVerse Trial Order — ${order.id}*`,
      '',
      `*Name:* ${details.name}`,
      `*Phone:* ${details.phone}`,
      `*Address:* ${details.address}, ${details.pincode}`,
      `*Trial slot:* ${details.slot}`,
      '',
      '*Outfits requested:*',
      itemLines,
      '',
      `*Trial deposit:* ${formatINR(PAYMENT.amount)} (refundable)`,
      `*UPI UTR:* ${ref}`,
      `*Garment value:* ${formatINR(garmentValue)}`,
    ].join('\n')

    const waUrl = `https://wa.me/${WHATSAPP_DISPATCH}?text=${encodeURIComponent(message)}`

    clearTrunk()
    onConfirmed()

    if (typeof window !== 'undefined') {
      if (window.self !== window.top) {
        window.open(waUrl, '_blank', 'noopener,noreferrer')
      } else {
        window.location.href = waUrl
      }
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 sm:items-center sm:p-4">
      <div className="max-h-[92dvh] w-full max-w-md overflow-y-auto rounded-t-2xl border border-border bg-card sm:rounded-2xl">
        <div className="sticky top-0 flex items-center justify-between border-b border-border bg-card/95 px-5 py-4 backdrop-blur">
          <div>
            <p className="eyebrow">Refundable trial deposit</p>
            <h2 className="text-xl">{formatINR(PAYMENT.amount)} via UPI</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close payment"
            className="grid size-9 place-items-center rounded-full border border-border"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="space-y-5 p-5">
          <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-surface-raised p-5">
            <div className="rounded-xl bg-white p-3">
              <QRCodeSVG value={upiUri()} size={176} level="M" />
            </div>
            <p className="text-center text-xs text-muted-foreground">
              Scan with any UPI app to pay {formatINR(PAYMENT.amount)} to{' '}
              <span className="text-foreground">{PAYMENT.payee}</span>
            </p>
            <a
              href={upiUri()}
              className="text-xs text-gold underline underline-offset-2"
            >
              Open a UPI app on this device
            </a>
          </div>

          <div className="rounded-xl border border-border p-4">
            <p className="mb-3 inline-flex items-center gap-2 text-sm font-medium">
              <Banknote className="size-4 text-gold" />
              Or pay to bank account
            </p>
            <dl className="space-y-2 text-sm">
              <Row label="Bank" value={PAYMENT.bank} />
              <Row label="A/C No." value={PAYMENT.account} copyable />
              <Row label="IFSC" value={PAYMENT.ifsc} copyable />
              <Row label="Amount" value={formatINR(PAYMENT.amount)} />
            </dl>
          </div>

          <div>
            <label htmlFor="utr" className="eyebrow mb-1.5 block">
              Enter 12-digit UPI UTR / transaction reference
            </label>
            <input
              id="utr"
              inputMode="numeric"
              maxLength={12}
              value={utr}
              onChange={(e) => setUtr(e.target.value.replace(/\D/g, ''))}
              placeholder="e.g. 402512345678"
              className="w-full rounded-lg border border-input bg-surface-raised px-4 py-3 text-sm tracking-widest outline-none focus:border-primary/50"
            />
            <p className="mt-1 text-xs text-muted-foreground">
              Find this in your UPI app payment history after paying.
            </p>
          </div>

          <button
            type="button"
            onClick={confirm}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold-gradient py-3.5 text-sm font-semibold text-primary-foreground shadow-gold"
          >
            <MessageCircle className="size-4" />
            Confirm &amp; Dispatch on WhatsApp
          </button>
          <p className="text-center text-xs text-muted-foreground">
            Your order is saved and a pre-filled WhatsApp message opens for our
            dispatch team.
          </p>
        </div>
      </div>
    </div>
  )
}

function Row({
  label,
  value,
  copyable,
}: {
  label: string
  value: string
  copyable?: boolean
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="inline-flex items-center gap-2 font-medium">
        {value}
        {copyable && (
          <button
            type="button"
            onClick={() => copy(value, label)}
            aria-label={`Copy ${label}`}
            className="text-muted-foreground hover:text-gold"
          >
            <Copy className="size-3.5" />
          </button>
        )}
      </dd>
    </div>
  )
}
