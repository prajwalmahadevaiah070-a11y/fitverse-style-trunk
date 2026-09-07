'use client'

import { useState, useEffect, useCallback } from 'react'
import type { Product, TrunkItem, StudioPhoto, Order, OrderStatus } from './fitverse-types'

export const LUXURY_COUTURE_CATALOG: (Product & {
  imageUrl: string
  craftOrigin: string
  zariPurity?: string
})[] = [
  // --- WOMEN'S HAUTE COUTURE ---
  {
    id: 'pk-w-01',
    name: 'Kadhwa Vermilion Real Zari Bridal Silk',
    brand: 'Varanasi Royal Looms',
    city: 'Varanasi',
    gender: 'women',
    category: 'Ethnic',
    subcategory: 'Sarees',
    price: 48000,
    mrp: 58000,
    fabric: 'Pure Katan Mulberry Silk with Electroplated Sona Zari',
    colorName: 'Imperial Vermilion & Gold',
    swatch: ['#780016', '#d4af37'],
    sizes: ['Bespoke Drape'],
    rating: 5.0,
    reviews: 42,
    tryOnFee: 199,
    craftOrigin: 'Varanasi, Uttar Pradesh',
    description: 'Handcrafted across 210 hours on heirloom pit-looms using the pure Kadhwa interlocking weave technique.',
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=90',
  },
  {
    id: 'pk-w-02',
    name: 'Zardozi Dabka Embroidered Raw Silk Lehenga',
    brand: 'Mughal Atelier',
    city: 'Old Delhi',
    gender: 'women',
    category: 'Occasion',
    subcategory: 'Bridal',
    price: 86000,
    mrp: 110000,
    fabric: 'Hand-Dyed Raw Silk with Micro-Dabka & Seed Pearls',
    colorName: 'Nocturne Plum & Antique Silver',
    swatch: ['#3e1329', '#c0c0c0'],
    sizes: ['Custom Fitted'],
    rating: 5.0,
    reviews: 29,
    tryOnFee: 199,
    craftOrigin: 'Chandni Chowk, Delhi',
    description: 'A 24-panel grand flared architectural skirt laden with metallic zardozi threads and river pearls.',
    imageUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=90',
  },
  {
    id: 'pk-w-03',
    name: 'Temple Korvai Pure Kanchipuram Weave',
    brand: 'Temple Guild',
    city: 'Kanchipuram',
    gender: 'women',
    category: 'Ethnic',
    subcategory: 'Sarees',
    price: 52000,
    mrp: 64000,
    fabric: 'Triple-Warp Silk with Heavy Contrast Pallu',
    colorName: 'Peacock Emerald & Deep Crimson',
    swatch: ['#0f3b2c', '#800000'],
    sizes: ['Bespoke Drape'],
    rating: 4.9,
    reviews: 31,
    tryOnFee: 199,
    craftOrigin: 'Kanchipuram, Tamil Nadu',
    description: 'Distinct Korvai structural interlock with authentic petni borders and mythological Yali iconography.',
    imageUrl: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=90',
  },
  {
    id: 'pk-w-04',
    name: 'Mukaish & Chikankari Ivory Anarkali',
    brand: 'Nawabi Heritage',
    city: 'Lucknow',
    gender: 'women',
    category: 'Ethnic',
    subcategory: 'Anarkali',
    price: 38000,
    mrp: 46000,
    fabric: 'Pure Organza Georgette with Flattened Wire Mukaish',
    colorName: 'Alabaster Ivory & Silver Wire',
    swatch: ['#f4f1ea', '#d3d3d3'],
    sizes: ['XS', 'S', 'M', 'L', 'Custom'],
    rating: 4.9,
    reviews: 22,
    tryOnFee: 199,
    craftOrigin: 'Hazratganj, Lucknow',
    description: '36-panel ethereal silhouette adorned with thirty-two traditional Awadhi stitches and hand-hammered wire accents.',
    imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1200&q=90',
  },

  // --- MEN'S ROYAL COUTURE ---
  {
    id: 'pk-m-01',
    name: 'Prussian Velvet Royal Bandhgala',
    brand: 'Jodhpur Regalia',
    city: 'Jodhpur',
    gender: 'men',
    category: 'Ethnic',
    subcategory: 'Bandhgala',
    price: 46000,
    mrp: 56000,
    fabric: 'Architectural Micro-Velvet with Monogrammed Brass Crests',
    colorName: 'Deep Prussian Charcoal',
    swatch: ['#0b131e', '#d4af37'],
    sizes: ['38R', '40R', '42R', '44R', 'Custom'],
    rating: 5.0,
    reviews: 36,
    tryOnFee: 199,
    craftOrigin: 'Jodhpur, Rajasthan',
    description: 'Sharp, structured military shoulders with hand-carved heritage brass buttons and interior silk lining.',
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=90',
  },
  {
    id: 'pk-m-02',
    name: 'Ivory Chanderi Bridal Sherwani with Tissue Stole',
    brand: 'Darbar Bespoke',
    city: 'Lucknow',
    gender: 'men',
    category: 'Ethnic',
    subcategory: 'Sherwani',
    price: 64000,
    mrp: 78000,
    fabric: 'Silk Chanderi with Micro-Resham Needlework',
    colorName: 'Antique Ivory & Champagne Gold',
    swatch: ['#f5eee6', '#e5c158'],
    sizes: ['38R', '40R', '42R', '44R'],
    rating: 5.0,
    reviews: 18,
    tryOnFee: 199,
    craftOrigin: 'Lucknow, Uttar Pradesh',
    description: 'Exquisite bridal attire layered with tonal needlework and paired with an electroplated zari tissue stole.',
    imageUrl: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=90',
  },
  {
    id: 'pk-m-03',
    name: 'Burnished Ochre Matka Silk Achkan',
    brand: 'Peshwa Atelier',
    city: 'Pune',
    gender: 'men',
    category: 'Ethnic',
    subcategory: 'Sherwani',
    price: 52000,
    mrp: 62000,
    fabric: 'Pure Handspun Matka Silk with Brocade Accents',
    colorName: 'Burnished Ochre & Copper Zari',
    swatch: ['#8c6239', '#b38b59'],
    sizes: ['38', '40', '42', '44'],
    rating: 4.8,
    reviews: 14,
    tryOnFee: 199,
    craftOrigin: 'Maharashtra & Varanasi',
    description: 'Minimalist clean-cut silhouette tailored for aristocratic evening celebrations and imperial receptions.',
    imageUrl: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1200&q=90',
  },
  {
    id: 'pk-m-04',
    name: 'Textured Wild Tussar Nehru Vest',
    brand: 'Kabir Handloom',
    city: 'Bhagalpur',
    gender: 'men',
    category: 'Ethnic',
    subcategory: 'Nehru Jacket',
    price: 22000,
    mrp: 28000,
    fabric: 'Hand-Reeled Textured Wild Tussar Silk',
    colorName: 'Desert Sage & Antique Silver',
    swatch: ['#4b5320', '#c4c4c4'],
    sizes: ['38', '40', '42', '44'],
    rating: 4.8,
    reviews: 26,
    tryOnFee: 199,
    craftOrigin: 'Bhagalpur, Bihar',
    description: 'Crisp mandarin collar formal vest featuring organic wild tussar slubs and concealed horn buttons.',
    imageUrl: 'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?auto=format&fit=crop&w=1200&q=90',
  },

  // --- JUNIOR COUTURE (KIDS) ---
  {
    id: 'pk-k-01',
    name: "Boys' Royal Brocade Sherwani & Mulmul Dhoti",
    brand: 'Nanhe Threads',
    city: 'Jaipur',
    gender: 'kids',
    category: 'Ethnic',
    subcategory: 'Sherwani',
    price: 18500,
    mrp: 24000,
    fabric: 'Lightweight Spun Brocade with 100% Mulmul Facing',
    colorName: 'Royal Cream & Terracotta Dhoti',
    swatch: ['#faf0e6', '#c85a17'],
    sizes: ['4-5Y', '6-7Y', '8-9Y', '10-11Y'],
    rating: 5.0,
    reviews: 44,
    tryOnFee: 199,
    craftOrigin: 'Jaipur, Rajasthan',
    description: 'Guaranteed zero skin prickle. Completely lined with organic soft mulmul with concealed seams.',
    imageUrl: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=1200&q=90',
  },
  {
    id: 'pk-k-02',
    name: "Girls' Kanchipuram Pure Pattu Pavada Blouse",
    brand: 'Nanhe Threads',
    city: 'Kanchipuram',
    gender: 'kids',
    category: 'Ethnic',
    subcategory: 'Lehengas',
    price: 21000,
    mrp: 26000,
    fabric: 'Pure Mulberry Silk with Feather-Soft Inner Waistband',
    colorName: 'Kunkumam Crimson & Mango Ochre',
    swatch: ['#990000', '#fdb813'],
    sizes: ['3-4Y', '5-6Y', '7-8Y', '9-10Y'],
    rating: 5.0,
    reviews: 38,
    tryOnFee: 199,
    craftOrigin: 'Kanchipuram, Tamil Nadu',
    description: 'Authentic temple handloom adapted for young girls with elasticated comfort-fit waistbands and cotton facing.',
    imageUrl: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=1200&q=90',
  },
  {
    id: 'pk-k-03',
    name: "Boys' Chanderi Kurta with Micro-Jacquard Vest",
    brand: 'Awadh Juniors',
    city: 'Lucknow',
    gender: 'kids',
    category: 'Ethnic',
    subcategory: 'Kurta Sets',
    price: 16500,
    mrp: 20000,
    fabric: 'Pure Chanderi Silk with Fine Cotton Churidar',
    colorName: 'Pistachio Mist & Champagne',
    swatch: ['#93a28b', '#e6d7b8'],
    sizes: ['4-5Y', '6-7Y', '8-9Y', '10-12Y'],
    rating: 4.9,
    reviews: 21,
    tryOnFee: 199,
    craftOrigin: 'Lucknow, Uttar Pradesh',
    description: 'Effortless festive ensemble paired with a featherlight woven jacquard jacket and mother-of-pearl buttons.',
    imageUrl: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1200&q=90',
  },
  {
    id: 'pk-k-04',
    name: "Girls' Hand-Tied Bandhani Silk Lehenga Set",
    brand: 'Kutch Chotey',
    city: 'Bhuj',
    gender: 'kids',
    category: 'Ethnic',
    subcategory: 'Lehengas',
    price: 19500,
    mrp: 24500,
    fabric: 'Organic Silk Georgette with Pure Gota Patti Edging',
    colorName: 'Rani Rose & Golden Marigold',
    swatch: ['#c71585', '#ffaa00'],
    sizes: ['4-5Y', '6-7Y', '8-9Y', '10-12Y'],
    rating: 4.9,
    reviews: 27,
    tryOnFee: 199,
    craftOrigin: 'Bhuj, Gujarat',
    description: 'Centuries-old Bandhani tie-dye technique enhanced with soft, hand-stitched light gota trim that never scratches.',
    imageUrl: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1200&q=90',
  },
]

// Zero-dependency storage listener
const STORAGE_KEY = 'petikara_couture_state'

type GlobalState = {
  products: Product[]
  trunk: TrunkItem[]
  photos: StudioPhoto[]
  orders: Order[]
}

const initialGlobalState: GlobalState = {
  products: LUXURY_COUTURE_CATALOG as Product[],
  trunk: [],
  photos: [],
  orders: [],
}

let memoryState: GlobalState = { ...initialGlobalState }
const listeners = new Set<() => void>()

function broadcast() {
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(memoryState))
    } catch {
      // ignore quota error
    }
  }
  listeners.forEach((l) => l())
}

if (typeof window !== 'undefined') {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      memoryState = {
        ...initialGlobalState,
        ...parsed,
        products: LUXURY_COUTURE_CATALOG,
      }
    }
  } catch {
    // ignore parse error
  }
}

export function useFitVerse() {
  const [, setTick] = useState(0)

  useEffect(() => {
    const update = () => setTick((t) => t + 1)
    listeners.add(update)
    return () => {
      listeners.delete(update)
    }
  }, [])

  const addToTrunk = useCallback((productId: string, size: string) => {
    if (memoryState.trunk.some((i) => i.productId === productId)) return
    if (memoryState.trunk.length >= 4) return
    memoryState.trunk = [...memoryState.trunk, { productId, size, addedAt: Date.now() }]
    broadcast()
  }, [])

  const removeFromTrunk = useCallback((productId: string) => {
    memoryState.trunk = memoryState.trunk.filter((i) => i.productId !== productId)
    broadcast()
  }, [])

  const clearTrunk = useCallback(() => {
    memoryState.trunk = []
    broadcast()
  }, [])

  const productById = useCallback((id: string) => {
    return memoryState.products.find((p) => p.id === id)
  }, [])

  const addPhoto = useCallback(({ label, dataUrl }: { label: string; dataUrl: string }) => {
    memoryState.photos = [
      { id: 'photo_' + Date.now(), label, dataUrl, createdAt: Date.now() },
      ...memoryState.photos,
    ]
    broadcast()
  }, [])

  const removePhoto = useCallback((id: string) => {
    memoryState.photos = memoryState.photos.filter((p) => p.id !== id)
    broadcast()
  }, [])

  const placeOrder = useCallback((data: Omit<Order, 'id' | 'createdAt' | 'status' | 'deposit'>) => {
    const order: Order = {
      ...data,
      id: 'PK-' + Math.floor(100000 + Math.random() * 900000),
      deposit: 199,
      status: 'Pending',
      createdAt: Date.now(),
    }
    memoryState.orders = [order, ...memoryState.orders]
    broadcast()
    return order
  }, [])

  const updateOrderStatus = useCallback((id: string, status: OrderStatus) => {
    memoryState.orders = memoryState.orders.map((o) => (o.id === id ? { ...o, status } : o))
    broadcast()
  }, [])

  const addProduct = useCallback((p: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...p,
      id: 'pk-custom-' + Date.now(),
    }
    memoryState.products = [newProduct, ...memoryState.products]
    broadcast()
  }, [])

  return {
    products: memoryState.products,
    trunk: memoryState.trunk,
    photos: memoryState.photos,
    orders: memoryState.orders,
    addToTrunk,
    removeFromTrunk,
    clearTrunk,
    productById,
    addPhoto,
    removePhoto,
    placeOrder,
    updateOrderStatus,
    addProduct,
  }
}

export function useAdminMetrics() {
  const { orders, products } = useFitVerse()
  const totalRevenue = orders.reduce((sum, o) => sum + (o.garmentValue || 0), 0)
  const pendingTrials = orders.filter((o) => o.status === 'Pending').length
  const completedOrders = orders.filter((o) => o.status === 'Kept').length

  return {
    totalOrders: orders.length,
    totalRevenue,
    pendingTrials,
    completedOrders,
    catalogCount: products.length,
  }
}
