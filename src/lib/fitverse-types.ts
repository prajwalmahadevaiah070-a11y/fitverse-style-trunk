export type Gender = "women" | "men" | "unisex" | "kids";

export type Product = {
  id: string;
  name: string;
  brand: string;
  city: string;
  gender: Gender;
  category: string;
  subcategory: string;
  price: number;
  mrp: number;
  fabric: string;
  colorName: string;
  swatch: [string, string];
  sizes: string[];
  rating: number;
  reviews: number;
  tryOnFee: number;
  description: string;
  seller?: boolean;
};

export type TrunkItem = {
  productId: string;
  size: string;
  addedAt: number;
};

export type StudioPhoto = {
  id: string;
  label: string;
  dataUrl: string;
  createdAt: number;
};

export type Booking = {
  id: string;
  slot: string;
  address: string;
  items: TrunkItem[];
  total: number;
  method: string;
  createdAt: number;
};

export const GENDERS: { id: Gender; label: string }[] = [
  { id: "women", label: "Women" },
  { id: "men", label: "Men" },
  { id: "unisex", label: "Unisex" },
  { id: "kids", label: "Kids" },
];

export const CATEGORY_TREE: Record<Gender, Record<string, string[]>> = {
  women: {
    Ethnic: ["Sarees", "Lehengas", "Kurta Sets", "Anarkali"],
    Western: ["Dresses", "Co-ords", "Denim"],
    Occasion: ["Bridal", "Cocktail"],
  },
  men: {
    Ethnic: ["Sherwani", "Kurta Sets", "Bandhgala", "Nehru Jacket"],
    Western: ["Shirts", "Blazers", "Denim"],
    Occasion: ["Wedding", "Reception"],
  },
  unisex: {
    Streetwear: ["Overshirts", "Tees", "Jackets"],
    Loungewear: ["Sets"],
  },
  kids: {
    Ethnic: ["Kurta Sets", "Lehengas"],
    Western: ["Dresses", "Shirts"],
  },
};

export const TRUNK_CAP = 4;
export const TRIAL_VISIT_FEE = 199;

export const formatINR = (n: number) =>
  "₹" + Math.round(n).toLocaleString("en-IN", { maximumFractionDigits: 0 });
