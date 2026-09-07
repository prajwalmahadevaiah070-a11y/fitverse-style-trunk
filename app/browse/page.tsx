'use client'

import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'

import { ProductCard } from '@/components/ProductCard'
import { Screen } from '@/components/Screen'
import { useFitVerse } from '@/lib/fitverse-store'
import { GENDERS, type Gender } from '@/lib/fitverse-types'
import { cn } from '@/lib/utils'

export default function BrowsePage() {
  const { products } = useFitVerse()
  const [gender, setGender] = useState<Gender | 'all'>('all')
  const [category, setCategory] = useState<string>('All')
  const [query, setQuery] = useState('')

  const categories = useMemo(() => {
    const pool =
      gender === 'all' ? products : products.filter((p) => p.gender === gender)
    return ['All', ...Array.from(new Set(pool.map((p) => p.category)))]
  }, [products, gender])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return products.filter((p) => {
      if (gender !== 'all' && p.gender !== gender) return false
      if (category !== 'All' && p.category !== category) return false
      if (
        q &&
        ![p.name, p.brand, p.city, p.subcategory, p.fabric]
          .join(' ')
          .toLowerCase()
          .includes(q)
      )
        return false
      return true
    })
  }, [products, gender, category, query])

  return (
    <Screen
      eyebrow="The full collection"
      title="Browse"
      subtitle={`${results.length} pieces ready for a home trial`}
    >
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search silks, brands, cities…"
          className="w-full rounded-full border border-input bg-card py-2.5 pl-10 pr-4 text-sm outline-none placeholder:text-muted-foreground focus:border-primary/50"
        />
      </div>

      <div className="hide-scrollbar -mx-4 mb-3 flex gap-2 overflow-x-auto px-4">
        <Chip
          active={gender === 'all'}
          onClick={() => {
            setGender('all')
            setCategory('All')
          }}
        >
          All
        </Chip>
        {GENDERS.map((g) => (
          <Chip
            key={g.id}
            active={gender === g.id}
            onClick={() => {
              setGender(g.id)
              setCategory('All')
            }}
          >
            {g.label}
          </Chip>
        ))}
      </div>

      <div className="hide-scrollbar -mx-4 mb-5 flex gap-2 overflow-x-auto px-4">
        {categories.map((c) => (
          <Chip key={c} active={category === c} onClick={() => setCategory(c)} subtle>
            {c}
          </Chip>
        ))}
      </div>

      {results.length === 0 ? (
        <p className="py-16 text-center text-sm text-muted-foreground">
          No pieces match that search yet.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {results.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </Screen>
  )
}

function Chip({
  active,
  subtle,
  onClick,
  children,
}: {
  active: boolean
  subtle?: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'shrink-0 rounded-full border px-4 py-1.5 text-xs tracking-wide transition-colors',
        active
          ? subtle
            ? 'border-gold/50 bg-gold/10 text-gold'
            : 'border-transparent bg-gold-gradient text-primary-foreground'
          : 'border-border bg-card text-muted-foreground hover:text-foreground',
      )}
    >
      {children}
    </button>
  )
}
