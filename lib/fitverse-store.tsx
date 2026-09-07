'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product, TrunkItem, StudioPhoto, Order, OrderStatus } from './fitverse-types'

export const LUXURY_COUTURE_CATALOG: (Product & {
  imageUrl: string
  craftOrigin: string
  zariPurity?: string
})[] = [
  // --- WOMEN'S COUTURE ---
  {
    id: 'pk-w-01',
    name: 'Kadhwa Real Zari Banarasi Silk Saree',
    brand: 'Raghurai Weaves',
    city: 'Varanasi',
    gender: 'women',
    category: 'Ethnic',
    subcategory: 'Sarees',
    price: 34500,
    mrp: 42000,
    fabric: 'Pure Katan Silk with Tested Gold Zari',
    colorName: 'Royal Vermilion & Sona Rupa',
    swatch: ['#800020', '#d4af37'],
    sizes: ['Free Size'],
    rating: 4.9,
    reviews: 38,
    tryOnFee: 199,
    craftOrigin: 'Varanasi, Uttar Pradesh',
    zariPurity: 'Electroplated Sona Zari',
    description: 'Handwoven across 180 hours using heirloom Kadwa motifs of stylized paisleys and marigold buds.',
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'pk-w-02',
    name: 'Hand-Embroidered Raw Silk Bridal Lehenga',
    brand: 'Chandni Couture',
    city: 'Old Delhi',
    gender: 'women',
    category: 'Occasion',
    subcategory: 'Bridal',
    price: 68000,
    mrp: 85000,
    fabric: 'Raw Silk with Dabka & Zardozi Work',
    colorName: 'Gulabi Rose & Antique Gold',
    swatch: ['#9b111e', '#c5a059'],
    sizes: ['S', 'M', 'L', 'Bespoke'],
    rating: 5.0,
    reviews: 24,
    tryOnFee: 199,
    craftOrigin: 'Chandni Chowk, Delhi',
    zariPurity: 'Micro-Dabka Handwork',
    description: '16-kali flared lehenga featuring artisanal zardozi embroidery accented with hand-beaded pearls.',
    imageUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'pk-w-03',
    name: 'Pure Kanchipuram Korvai Silk Saree',
    brand: 'Meenakshi Silks',
    city: 'Kanchipuram',
    gender: 'women',
    category: 'Ethnic',
    subcategory: 'Sarees',
    price: 42000,
    mrp: 49000,
    fabric: 'Mulberry Silk with Temple Border',
    colorName: 'Peacock Teal & Deep Coral',
    swatch: ['#005f73', '#ee9b00'],
    sizes: ['Free Size'],
    rating: 4.9,
    reviews: 41,
    tryOnFee: 199,
    craftOrigin: 'Kanchipuram, Tamil Nadu',
    zariPurity: 'Pure Silver Dipped Gold Zari',
    description: 'Heirloom Korvai interlacing technique binding contrasting body and heavy pallu borders.',
    imageUrl: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'pk-w-04',
    name: 'Mukaish & Chikankari Georgette Anarkali',
    brand: 'Awadh Atelier',
    city: 'Lucknow',
    gender: 'women',
    category: 'Ethnic',
    subcategory: 'Anarkali',
    price: 26500,
    mrp: 32000,
    fabric: 'Pure Viscose Georgette with Mukaish',
    colorName: 'Ivory Pearl & Muted Silver',
    swatch: ['#f8f9fa', '#ced4da'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.8,
    reviews: 19,
    tryOnFee: 199,
    craftOrigin: 'Lucknow, Uttar Pradesh',
    description: '32-kali floor-grazing silhouette adorned with fine Bakhiya, Phanda, and metal wire Mukaish detailing.',
    imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=80',
  },

  // --- MEN'S COUTURE ---
  {
    id: 'pk-m-01',
    name: 'Royal Heritage Velvet Bandhgala',
    brand: 'Hukum Bespoke',
    city: 'Jodhpur',
    gender: 'men',
    category: 'Ethnic',
    subcategory: 'Bandhgala',
    price: 38000,
    mrp: 46000,
    fabric: 'Micro-Velvet with Hand-Carved Brass Buttons',
    colorName: 'Midnight Prussian Blue',
    swatch: ['#0d1b2a', '#e0e1dd'],
    sizes: ['38R', '40R', '42R', '44R'],
    rating: 5.0,
    reviews: 32,
    tryOnFee: 199,
    craftOrigin: 'Jodhpur, Rajasthan',
    description: 'Impeccably tailored bandhgala with structured shoulder contours, welt pockets, and crest buttons.',
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'pk-m-02',
    name: 'Ivory Chikankari Sherwani with Tissue Stole',
    brand: 'Nawab & Co.',
    city: 'Lucknow',
    gender: 'men',
    category: 'Ethnic',
    subcategory: 'Sherwani',
    price: 52000,
    mrp: 64000,
    fabric: 'Silk-Cotton Chanderi with Hand Chikankari',
    colorName: 'Warm Alabaster Ivory',
    swatch: ['#fdf0d5', '#669bbc'],
    sizes: ['38R', '40R', '42R', '44R'],
    rating: 4.9,
    reviews: 28,
    tryOnFee: 199,
    craftOrigin: 'Hazratganj, Lucknow',
    description: 'Regal bridal sherwani featuring tonal floral needlework paired with a zari tissue drape stole.',
    imageUrl: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'pk-m-03',
    name: 'Raw Silk Achkan with Handwoven Brocade',
    brand: 'Peshwa & Sons',
    city: 'Pune',
    gender: 'men',
    category: 'Ethnic',
    subcategory: 'Sherwani',
    price: 44000,
    mrp: 52000,
    fabric: 'Pure Matka Silk with Benarasi Zari Cuffs',
    colorName: 'Burnished Ochre & Gold',
    swatch: ['#b08968', '#ddb892'],
    sizes: ['38', '40', '42', '44'],
    rating: 4.8,
    reviews: 17,
    tryOnFee: 199,
    craftOrigin: 'Varanasi / Pune',
    description: 'Clean front-slit achkan paired with handwoven pure silk brocade trims.',
    imageUrl: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'pk-m-04',
    name: 'Tussar Silk Bundi / Nehru Jacket',
    brand: 'Kabir Handloom',
    city: 'Bhagalpur',
    gender: 'men',
    category: 'Ethnic',
    subcategory: 'Nehru Jacket',
    price: 16500,
    mrp: 21000,
    fabric: 'Bhagalpuri Wild Tussar Silk',
    colorName: 'Sage Olive & Desert Khaki',
    swatch: ['#588157', '#344e41'],
    sizes: ['38', '40', '42', '44'],
    rating: 4.7,
    reviews: 44,
    tryOnFee: 199,
    craftOrigin: 'Bhagalpur, Bihar',
    description: 'Crisp mandarin collar sleeveless bundi crafted from textured hand-reeled wild tussar yarn.',
    imageUrl: 'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?auto=format&fit=crop&w=900&q=80',
  },

  // --- KIDS' COUTURE ---
  {
    id: 'pk-k-01',
    name: "Boys' Royal Brocade Sherwani & Dhoti Set",
    brand: 'Nanhe Threads',
    city: 'Jaipur',
    gender: 'kids',
    category: 'Ethnic',
    subcategory: 'Sherwani',
    price: 14500,
    mrp: 18000,
    fabric: 'Hypoallergenic Silk Brocade with Cotton Lining',
    colorName: 'Royal Cream & Crimson Dhoti',
    swatch: ['#f4f1de', '#e07a5f'],
    sizes: ['4-5Y', '6-7Y', '8-9Y', '10-11Y'],
    rating: 4.9,
    reviews: 29,
    tryOnFee: 199,
    craftOrigin: 'Jaipur, Rajasthan',
    description: 'Gentle on delicate skin with 100% mulmul internal facing and lightweight spun brocade.',
    imageUrl: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'pk-k-02',
    name: "Girls' Kanchipuram Pattu Pavada Blouse Set",
    brand: 'Nanhe Threads',
    city: 'Kanchipuram',
    gender: 'kids',
    category: 'Ethnic',
    subcategory: 'Lehengas',
    price: 18200,
    mrp: 22500,
    fabric: 'Pure Mulberry Silk with Zari Border',
    colorName: 'Kunkumam Red & Mango Yellow',
    swatch: ['#d62828', '#fcbf49'],
    sizes: ['3-4Y', '5-6Y', '7-8Y', '9-10Y'],
    rating: 5.0,
    reviews: 35,
    tryOnFee: 199,
    craftOrigin: 'Tamil Nadu',
    description: 'Traditional south Indian pavada handwoven with baby temple borders and contrast puff-sleeve top.',
    imageUrl: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'pk-k-03',
    name: "Boys' Pure Silk Kurta with Jacquard Bundi",
    brand: 'Awadh Juniors',
    city: 'Lucknow',
    gender: 'kids',
    category: 'Ethnic',
    subcategory: 'Kurta Sets',
    price: 12800,
    mrp: 15500,
    fabric: 'Chanderi Silk with Cotton Churidar',
    colorName: 'Mint Pistachio & Champagne',
    swatch: ['#b7b7a4', '#ddbea9'],
    sizes: ['4-5Y', '6-7Y', '8-9Y'],
    rating: 4.8,
    reviews: 16,
    tryOnFee: 199,
    craftOrigin: 'Uttar Pradesh',
    description: 'Festive-ready kurta pyjama paired with a tailored micro-jacquard festive vest.',
    imageUrl: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'pk-k-04',
    name: "Girls' Hand-Block Bandhani Festive Lehenga",
    brand: 'Kutch Chotey',
    city: 'Bhuj',
    gender: 'kids',
    category: 'Ethnic',
    subcategory: 'Lehengas',
    price: 15900,
    mrp: 19000,
    fabric: 'Organic Silk Georgette with Gota Patti',
    colorName: 'Rani Pink & Sunshine Gold',
    swatch: ['#ff007f', '#ffd700'],
    sizes: ['4-5Y', '6-7Y', '8-9Y', '10-12Y'],
    rating: 4.9,
    reviews: 21,
    tryOnFee: 199,
    craftOrigin: 'Bhuj, Gujarat',
    description: 'Fine tie-dye bandhej accented with hand-stitched real gota ribbons and latkans.',
    imageUrl: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=900&q=80',
  },
]

interface FitVerseState {
  products: Product[]
  trunk: TrunkItem[]
  photos: StudioPhoto[]
  orders: Order[]
  addToTrunk: (productId: string, size: string) => void
  removeFromTrunk: (productId: string) => void
  clearTrunk: () => void
  productById: (id: string) => Product | undefined
  addPhoto: (photo: { label: string; dataUrl: string }) => void
  removePhoto: (id: string) => void
  placeOrder: (order: Omit<Order, 'id' | 'createdAt' | 'status' | 'deposit'>) => Order
  updateOrderStatus: (id: string, status: OrderStatus) => void
  addProduct: (product: Omit<Product, 'id'>) => void
}

export const useFitVerse = create<FitVerseState>()(
  persist(
    (set, get) => ({
      products: LUXURY_COUTURE_CATALOG as Product[],
      trunk: [],
      photos: [],
      orders: [],

      addToTrunk: (productId, size) => {
        const { trunk } = get()
        if (trunk.some((i) => i.productId === productId)) return
        if (trunk.length >= 4) return
        set({ trunk: [...trunk, { productId, size, addedAt: Date.now() }] })
      },

      removeFromTrunk: (productId) => {
        set({ trunk: get().trunk.filter((i) => i.productId !== productId) })
      },

      clearTrunk: () => set({ trunk: [] }),

      productById: (id) => get().products.find((p) => p.id === id),

      addPhoto: ({ label, dataUrl }) => {
        set({
          photos: [
            { id: 'photo_' + Date.now(), label, dataUrl, createdAt: Date.now() },
            ...get().photos,
          ],
        })
      },

      removePhoto: (id) => {
        set({ photos: get().photos.filter((p) => p.id !== id) })
      },

      placeOrder: (data) => {
        const order: Order = {
          ...data,
          id: 'PK-' + Math.floor(100000 + Math.random() * 900000),
          deposit: 199,
          status: 'Pending',
          createdAt: Date.now(),
        }
        set({ orders: [order, ...get().orders] })
        return order
      },

      updateOrderStatus: (id, status) => {
        set({
          orders: get().orders.map((o) => (o.id === id ? { ...o, status } : o)),
        })
      },

      addProduct: (p) => {
        const newProduct: Product = {
          ...p,
          id: 'pk-custom-' + Date.now(),
        }
        set({ products: [newProduct, ...get().products] })
      },
    }),
    {
      name: 'petikara-storage',
    }
  )
)

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
