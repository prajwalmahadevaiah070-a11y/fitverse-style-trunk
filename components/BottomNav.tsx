'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Search, Sparkles, Briefcase } from 'lucide-react'

import { useFitVerse } from '@/lib/fitverse-store'
import { cn } from '@/lib/utils'

// Public customer navigation only. Retailer, Admin and Queue are intentionally
// excluded — the admin portal is reached privately at /admin-portal.
const ITEMS = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/browse', label: 'Browse', icon: Search },
  { to: '/studio', label: 'Try-On', icon: Sparkles },
  { to: '/trunk', label: 'Trunk', icon: Briefcase },
] as const

export function BottomNav() {
  const pathname = usePathname()
  const { trunk } = useFitVerse()

  // Keep the private admin portal free of the customer chrome.
  if (pathname.startsWith('/admin-portal')) return null

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-[520px] border-t border-border bg-background/85 backdrop-blur-xl">
      <div className="flex items-stretch justify-around px-2 pb-[env(safe-area-inset-bottom)] pt-2">
        {ITEMS.map(({ to, label, icon: Icon }) => {
          const active = to === '/' ? pathname === '/' : pathname.startsWith(to)
          const badge = to === '/trunk' ? trunk.length : 0
          return (
            <Link
              key={to}
              href={to}
              className={cn(
                'relative flex flex-1 flex-col items-center gap-1 rounded-lg py-1.5 text-[0.65rem] tracking-[0.08em] uppercase transition-colors',
                active ? 'text-gold' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              <span className="relative">
                <Icon className="size-5" />
                {badge > 0 && (
                  <span className="absolute -right-2 -top-1.5 grid size-4 place-items-center rounded-full bg-gold-gradient text-[0.55rem] font-semibold text-primary-foreground">
                    {badge}
                  </span>
                )}
              </span>
              {label}
              {active && (
                <span className="absolute -bottom-0.5 h-0.5 w-6 rounded-full bg-gold-gradient" />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
