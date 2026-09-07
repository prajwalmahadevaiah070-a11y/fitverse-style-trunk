import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { SEED_PRODUCTS } from "./catalog";
import {
  TRUNK_CAP,
  type Booking,
  type Product,
  type StudioPhoto,
  type TrunkItem,
} from "./fitverse-types";

const KEYS = {
  trunk: "fitverse.trunk.v1",
  photos: "fitverse.photos.v1",
  seller: "fitverse.sellerProducts.v1",
  bookings: "fitverse.bookings.v1",
};

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* quota or privacy mode — ignore */
  }
}

type AddResult = { ok: boolean; reason?: "cap" | "duplicate" };

type StoreValue = {
  hydrated: boolean;
  products: Product[];
  sellerProducts: Product[];
  trunk: TrunkItem[];
  photos: StudioPhoto[];
  bookings: Booking[];
  productById: (id: string) => Product | undefined;
  addToTrunk: (productId: string, size: string) => AddResult;
  removeFromTrunk: (productId: string) => void;
  clearTrunk: () => void;
  inTrunk: (productId: string) => boolean;
  addPhoto: (photo: Omit<StudioPhoto, "id" | "createdAt">) => StudioPhoto;
  removePhoto: (id: string) => void;
  addSellerProduct: (p: Product) => void;
  removeSellerProduct: (id: string) => void;
  addBooking: (b: Omit<Booking, "id" | "createdAt">) => Booking;
};

const StoreContext = createContext<StoreValue | null>(null);

const uid = () => Math.random().toString(36).slice(2, 10);

export function FitVerseProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [trunk, setTrunk] = useState<TrunkItem[]>([]);
  const [photos, setPhotos] = useState<StudioPhoto[]>([]);
  const [sellerProducts, setSellerProducts] = useState<Product[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    setTrunk(read<TrunkItem[]>(KEYS.trunk, []));
    setPhotos(read<StudioPhoto[]>(KEYS.photos, []));
    setSellerProducts(read<Product[]>(KEYS.seller, []));
    setBookings(read<Booking[]>(KEYS.bookings, []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) write(KEYS.trunk, trunk);
  }, [trunk, hydrated]);
  useEffect(() => {
    if (hydrated) write(KEYS.photos, photos);
  }, [photos, hydrated]);
  useEffect(() => {
    if (hydrated) write(KEYS.seller, sellerProducts);
  }, [sellerProducts, hydrated]);
  useEffect(() => {
    if (hydrated) write(KEYS.bookings, bookings);
  }, [bookings, hydrated]);

  const products = useMemo(() => [...sellerProducts, ...SEED_PRODUCTS], [sellerProducts]);

  const productById = useCallback(
    (id: string) => products.find((p) => p.id === id),
    [products],
  );

  const addToTrunk = useCallback<StoreValue["addToTrunk"]>(
    (productId, size) => {
      let result: AddResult = { ok: true };
      setTrunk((prev) => {
        if (prev.some((i) => i.productId === productId)) {
          result = { ok: false, reason: "duplicate" };
          return prev;
        }
        if (prev.length >= TRUNK_CAP) {
          result = { ok: false, reason: "cap" };
          return prev;
        }
        return [...prev, { productId, size, addedAt: Date.now() }];
      });
      return result;
    },
    [],
  );

  const value: StoreValue = {
    hydrated,
    products,
    sellerProducts,
    trunk,
    photos,
    bookings,
    productById,
    addToTrunk,
    removeFromTrunk: useCallback(
      (id) => setTrunk((prev) => prev.filter((i) => i.productId !== id)),
      [],
    ),
    clearTrunk: useCallback(() => setTrunk([]), []),
    inTrunk: useCallback((id) => trunk.some((i) => i.productId === id), [trunk]),
    addPhoto: useCallback((photo) => {
      const next: StudioPhoto = { ...photo, id: uid(), createdAt: Date.now() };
      setPhotos((prev) => [next, ...prev].slice(0, 8));
      return next;
    }, []),
    removePhoto: useCallback(
      (id) => setPhotos((prev) => prev.filter((p) => p.id !== id)),
      [],
    ),
    addSellerProduct: useCallback(
      (p) => setSellerProducts((prev) => [{ ...p, seller: true }, ...prev]),
      [],
    ),
    removeSellerProduct: useCallback(
      (id) => setSellerProducts((prev) => prev.filter((p) => p.id !== id)),
      [],
    ),
    addBooking: useCallback((b) => {
      const next: Booking = { ...b, id: "FV" + uid().toUpperCase(), createdAt: Date.now() };
      setBookings((prev) => [next, ...prev]);
      return next;
    }, []),
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useFitVerse() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useFitVerse must be used inside FitVerseProvider");
  return ctx;
}
