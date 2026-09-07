'use client'

import { useEffect, useRef, useState } from 'react'
import { Lock, ShieldCheck } from 'lucide-react'

const DEFAULT_PIN = '1234'
const SESSION_KEY = 'fitverse.admin.unlocked'

export function PinGate({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false)
  const [unlocked, setUnlocked] = useState(false)
  const [pin, setPin] = useState('')
  const [error, setError] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setUnlocked(sessionStorage.getItem(SESSION_KEY) === '1')
    setReady(true)
  }, [])

  useEffect(() => {
    if (ready && !unlocked) inputRef.current?.focus()
  }, [ready, unlocked])

  const submit = (value: string) => {
    if (value === DEFAULT_PIN) {
      sessionStorage.setItem(SESSION_KEY, '1')
      setUnlocked(true)
      setError(false)
    } else {
      setError(true)
      setPin('')
    }
  }

  if (!ready) {
    return (
      <div className="grid min-h-[70dvh] place-items-center text-sm text-muted-foreground">
        Loading…
      </div>
    )
  }

  if (unlocked) {
    return (
      <>
        <button
          type="button"
          onClick={() => {
            sessionStorage.removeItem(SESSION_KEY)
            setUnlocked(false)
            setPin('')
          }}
          className="fixed right-4 top-4 z-30 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground"
        >
          Lock portal
        </button>
        {children}
      </>
    )
  }

  return (
    <div className="grid min-h-[80dvh] place-items-center px-6">
      <div className="w-full max-w-xs rounded-2xl border border-border bg-card p-7 text-center shadow-luxe">
        <div className="mx-auto mb-4 grid size-14 place-items-center rounded-full border border-gold/40 bg-gold/10">
          <Lock className="size-6 text-gold" />
        </div>
        <p className="eyebrow">FitVerse Operations</p>
        <h1 className="mt-1 text-2xl">Private admin portal</h1>
        <p className="mt-2 text-xs text-muted-foreground">
          Enter your 4-digit PIN to access orders, revenue and settlements.
        </p>

        <input
          ref={inputRef}
          inputMode="numeric"
          maxLength={4}
          value={pin}
          onChange={(e) => {
            const v = e.target.value.replace(/\D/g, '').slice(0, 4)
            setPin(v)
            setError(false)
            if (v.length === 4) submit(v)
          }}
          className="mt-5 w-full rounded-lg border border-input bg-surface-raised py-3 text-center text-2xl tracking-[0.6em] outline-none focus:border-primary/50"
          placeholder="••••"
          aria-label="Admin PIN"
        />
        {error && (
          <p className="mt-2 text-xs text-destructive">Incorrect PIN. Try again.</p>
        )}

        <button
          type="button"
          onClick={() => submit(pin)}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold-gradient py-3 text-sm font-semibold text-primary-foreground shadow-gold"
        >
          <ShieldCheck className="size-4" />
          Unlock
        </button>
      </div>
    </div>
  )
}
