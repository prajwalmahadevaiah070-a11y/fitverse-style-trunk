'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Sparkles, ShoppingBag } from 'lucide-react'
import { useFitVerse } from '@/lib/fitverse-store'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/browse', label: 'Couture' },
  { href: '/studio', label: 'Try-On Studio' },
]

export function Navbar() {
  const pathname = usePathname()
  const { trunk } = useFitVerse()
  const trunkCount = trunk?.items?.length ?? 0

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Wordmark */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-serif text-2xl md:text-3xl font-semibold tracking-wider text-gold-gradient uppercase">
            Petikara
          </span>
        </Link>

        {/* Center Navigation Links (Hidden on Mobile) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors hover:text-gold ${
                  isActive ? 'text-gold font-semibold' : 'text-muted-foreground'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/studio"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-4 py-2 text-xs font-medium text-gold hover:bg-gold/20 transition-colors"
          >
            <Sparkles className="size-3.5" />
            Studio
          </Link>

          <Link
            href="/trunk"
            aria-label="View trial trunk"
            className="relative inline-flex items-center gap-2 rounded-full border border-border bg-surface-raised px-4 py-2 text-xs font-medium text-foreground hover:bg-muted transition-colors"
          >
            <ShoppingBag className="size-4 text-gold" />
            <span className="hidden sm:inline">Trunk</span>
            {trunkCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[11px] font-bold text-black">
                {trunkCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  )
}
