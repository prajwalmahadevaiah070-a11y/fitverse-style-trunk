'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import { SEED_PRODUCTS } from './catalog'
import {
  PLATFORM_COMMISSION,
  TRIAL_DEPOSIT,
  TRUNK_CAP,
  type Order,
  type OrderStatus,
  type Product,
  type StudioPhoto,
  type TrunkItem,
} from './fitverse-types'

const KEYS = {
  catalog: 'fitverse.catalog.v1',
  trunk: 'fitverse.trunk.v1',
  photos: 'fitverse.photos.v1',
  orders: 'pending_orders',
}

function read<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function write<T>(key: string, value: T) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* quota or privacy mode — ignore */
  }
}

type AddResult = { ok: boolean; reason?: 'cap' | 'duplicate' }

type StoreValue = {
  hydrated: boolean
  products: Product[]
  trunk: TrunkItem[]
  photos: StudioPhoto[]
  orders: Order[]
  productById: (id: string) => Product | undefined
  addToTrunk: (productId: string, size: string) => AddResult
  removeFromTrunk: (productId: string) => void
  clearTrunk: () => void
  inTrunk: (productId: string) => boolean
  addPhoto: (photo: Omit<StudioPhoto, 'id' | 'createdAt'>) => StudioPhoto
  removePhoto: (id: string) => void
  addProduct: (p: Product) => void
  removeProduct: (id: string) => void
  placeOrder: (
    o: Omit<Order, 'id' | 'createdAt' | 'status' | 'deposit'>,
  ) => Order
  updateOrderStatus: (id: string, status: OrderStatus) => void
}

const StoreContext = createContext<StoreValue | null>(null)

const uid = () => Math.random().toString(36).slice(2, 10)

export function FitVerseProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false)
  const [products, setProducts] = useState<Product[]>(SEED_PRODUCTS)
  const [trunk, setTrunk] = useState<TrunkItem[]>([])
  const [photos, setPhotos] = useState<StudioPhoto[]>([])
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    // Catalog is persisted in LocalStorage. Seed it once from the curated
    // luxury Indian fashion collection, then it lives on the device.
    const storedCatalog = read<Product[] | null>(KEYS.catalog, null)
    if (storedCatalog && storedCatalog.length > 0) {
      setProducts(storedCatalog)
    } else {
      setProducts(SEED_PRODUCTS)
      write(KEYS.catalog, SEED_PRODUCTS)
    }
    setTrunk(read<TrunkItem[]>(KEYS.trunk, []))
    setPhotos(read<StudioPhoto[]>(KEYS.photos, []))
    // Orders start clean — no mock queues or sample test buyers.
    setOrders(read<Order[]>(KEYS.orders, []))
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated) write(KEYS.catalog, products)
  }, [products, hydrated])
  useEffect(() => {
    if (hydrated) write(KEYS.trunk, trunk)
  }, [trunk, hydrated])
  useEffect(() => {
    if (hydrated) write(KEYS.photos, photos)
  }, [photos, hydrated])
  useEffect(() => {
    if (hydrated) write(KEYS.orders, orders)
  }, [orders, hydrated])

  const productById = useCallback(
    (id: string) => products.find((p) => p.id === id),
    [products],
  )

  const addToTrunk = useCallback<StoreValue['addToTrunk']>((productId, size) => {
    let result: AddResult = { ok: true }
    setTrunk((prev) => {
      if (prev.some((i) => i.productId === productId)) {
        result = { ok: false, reason: 'duplicate' }
        return prev
      }
      if (prev.length >= TRUNK_CAP) {
        result = { ok: false, reason: 'cap' }
        return prev
      }
      return [...prev, { productId, size, addedAt: Date.now() }]
    })
    return result
  }, [])

  const value: StoreValue = {
    hydrated,
    products,
    trunk,
    photos,
    orders,
    productById,
    addToTrunk,
    removeFromTrunk: useCallback(
      (id) => setTrunk((prev) => prev.filter((i) => i.productId !== id)),
      [],
    ),
    clearTrunk: useCallback(() => {
      // Persist synchronously — the caller may navigate away (WhatsApp) before
      // the debounced effect below has a chance to flush.
      write(KEYS.trunk, [])
      setTrunk([])
    }, []),
    inTrunk: useCallback((id) => trunk.some((i) => i.productId === id), [trunk]),
    addPhoto: useCallback((photo) => {
      const next: StudioPhoto = { ...photo, id: uid(), createdAt: Date.now() }
      setPhotos((prev) => [next, ...prev].slice(0, 8))
      return next
    }, []),
    removePhoto: useCallback(
      (id) => setPhotos((prev) => prev.filter((p) => p.id !== id)),
      [],
    ),
    addProduct: useCallback(
      (p) => setProducts((prev) => [{ ...p, seller: true }, ...prev]),
      [],
    ),
    removeProduct: useCallback(
      (id) => setProducts((prev) => prev.filter((p) => p.id !== id)),
      [],
    ),
    placeOrder: useCallback((o) => {
      const next: Order = {
        ...o,
        id: 'FV' + uid().toUpperCase(),
        deposit: TRIAL_DEPOSIT,
        status: 'Pending',
        createdAt: Date.now(),
      }
      setOrders((prev) => [next, ...prev])
      return next
    }, []),
    updateOrderStatus: useCallback(
      (id, status) =>
        setOrders((prev) =>
          prev.map((o) => (o.id === id ? { ...o, status } : o)),
        ),
      [],
    ),
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useFitVerse() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useFitVerse must be used inside FitVerseProvider')
  return ctx
}

/** Aggregate revenue + settlement figures used by the admin portal. */
export function useAdminMetrics() {
  const { orders } = useFitVerse()
  return useMemo(() => {
    const totalOrders = orders.length
    const activeTrials = orders.filter((o) =>
      ['Pending', 'Dispatched', 'Trial Active'].includes(o.status),
    ).length
    const grossGarment = orders.reduce((s, o) => s + o.garmentValue, 0)
    const deposits = orders.reduce((s, o) => s + o.deposit, 0)
    const totalRevenue = grossGarment + deposits
    const commission = grossGarment * PLATFORM_COMMISSION

    const ledgerMap = new Map<
      string,
      { brand: string; pieces: number; gross: number }
    >()
    for (const o of orders) {
      for (const it of o.items) {
        const cur =
          ledgerMap.get(it.brand) ?? { brand: it.brand, pieces: 0, gross: 0 }
        cur.pieces += 1
        cur.gross += it.price
        ledgerMap.set(it.brand, cur)
      }
    }
    const ledger = Array.from(ledgerMap.values())
      .map((row) => ({
        ...row,
        commission: row.gross * PLATFORM_COMMISSION,
        payout: row.gross * (1 - PLATFORM_COMMISSION),
      }))
      .sort((a, b) => b.gross - a.gross)

    return {
      totalOrders,
      activeTrials,
      totalRevenue,
      commission,
      ledger,
    }
  }, [orders])
}
