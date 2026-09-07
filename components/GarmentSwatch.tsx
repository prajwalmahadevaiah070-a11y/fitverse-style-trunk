import type { Product } from '@/lib/fitverse-types'

type Shape = 'saree' | 'dress' | 'top' | 'jacket' | 'pants'

function shapeFor(p: Product): Shape {
  const s = (p.subcategory + p.category).toLowerCase()
  if (s.includes('saree')) return 'saree'
  if (
    s.includes('lehenga') ||
    s.includes('anarkali') ||
    s.includes('dress') ||
    s.includes('bridal')
  )
    return 'dress'
  if (s.includes('denim') || s.includes('pant')) return 'pants'
  if (
    s.includes('jacket') ||
    s.includes('blazer') ||
    s.includes('sherwani') ||
    s.includes('bandh')
  )
    return 'jacket'
  return 'top'
}

const PATHS: Record<Shape, string> = {
  saree:
    'M50 8 C34 14 30 30 34 48 C38 70 30 84 24 96 L76 96 C74 78 72 56 70 40 C68 22 64 12 50 8 Z',
  dress: 'M50 10 L64 18 L60 40 L78 96 L22 96 L40 40 L36 18 Z',
  top: 'M36 14 L50 20 L64 14 L76 26 L68 34 L68 84 L32 84 L32 34 L24 26 Z',
  jacket: 'M36 12 L50 22 L64 12 L78 26 L70 34 L70 92 L30 92 L30 34 L22 26 Z',
  pants: 'M32 16 L68 16 L66 94 L54 94 L50 52 L46 94 L34 94 Z',
}

export function GarmentSwatch({
  product,
  className = '',
  opacity = 1,
}: {
  product: Product
  className?: string
  opacity?: number
}) {
  const shape = shapeFor(product)
  const gid = `g-${product.id}-${shape}`
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label={`${product.name} in ${product.colorName}`}
      style={{ opacity }}
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={product.swatch[0]} />
          <stop offset="100%" stopColor={product.swatch[1]} />
        </linearGradient>
      </defs>
      <path
        d={PATHS[shape]}
        fill={`url(#${gid})`}
        stroke="oklch(1 0 0 / 18%)"
        strokeWidth="0.6"
      />
    </svg>
  )
}
