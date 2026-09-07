export type Gender = 'women' | 'men' | 'unisex' | 'kids'

export type Product = {
  id: string
  name: string
  brand: string
  city: string
  gender: Gender
  category: string
  subcategory: string
  price: number
  mrp: number
  fabric: string
  colorName: string
  swatch: [string, string]
  sizes: string[]
  rating: number
  reviews: number
  tryOnFee: number
  description: string
  seller?: boolean
}

export type TrunkItem = {
  productId: string
  size: string
  addedAt: number
}

export type StudioPhoto = {
  id: string
  label: string
  dataUrl: string
  createdAt: number
}

export type OrderItem = {
  productId: string
  name: string
  brand: string
  size: string
  price: number
}

export type OrderStatus =
  | 'Pending'
  | 'Dispatched'
  | 'Trial Active'
  | 'Kept'
  | 'Returned'

export const ORDER_STATUSES: OrderStatus[] = [
  'Pending',
  'Dispatched',
  'Trial Active',
  'Kept',
  'Returned',
]

export type Order = {
  id: string
  name: string
  phone: string
  address: string
  pincode: string
  slot: string
  items: OrderItem[]
  utr: string
  deposit: number
  garmentValue: number
  status: OrderStatus
  createdAt: number
}

export const GENDERS: { id: Gender; label: string }[] = [
  { id: 'women', label: 'Women' },
  { id: 'men', label: 'Men' },
  { id: 'unisex', label: 'Unisex' },
  { id: 'kids', label: 'Kids' },
]

export const CATEGORY_TREE: Record<Gender, Record<string, string[]>> = {
  women: {
    Ethnic: ['Sarees', 'Lehengas', 'Kurta Sets', 'Anarkali'],
    Western: ['Dresses', 'Co-ords', 'Denim'],
    Occasion: ['Bridal', 'Cocktail'],
  },
  men: {
    Ethnic: ['Sherwani', 'Kurta Sets', 'Bandhgala', 'Nehru Jacket'],
    Western: ['Shirts', 'Blazers', 'Denim'],
    Occasion: ['Wedding', 'Reception'],
  },
  unisex: {
    Streetwear: ['Overshirts', 'Tees', 'Jackets'],
    Loungewear: ['Sets'],
  },
  kids: {
    Ethnic: ['Kurta Sets', 'Lehengas'],
    Western: ['Dresses', 'Shirts'],
  },
}

export const TRUNK_CAP = 4
export const TRIAL_DEPOSIT = 199
export const PLATFORM_COMMISSION = 0.15

/** Kotak Mahindra Bank collection details for the refundable trial deposit. */
export const PAYMENT = {
  bank: 'Kotak Mahindra Bank',
  account: '8046804439',
  ifsc: 'KKBK0008043',
  payee: 'FitVerse',
  vpa: '8046804439@KKBK0008043.ifsc.npci',
  amount: TRIAL_DEPOSIT,
  note: 'FitVerseTrialDeposit',
}

export const upiUri = () =>
  `upi://pay?pa=${PAYMENT.vpa}&pn=${PAYMENT.payee}&am=${PAYMENT.amount}&cu=INR&tn=${PAYMENT.note}`

export const WHATSAPP_DISPATCH = '918310961823'

export const formatINR = (n: number) =>
  '₹' + Math.round(n).toLocaleString('en-IN', { maximumFractionDigits: 0 })
