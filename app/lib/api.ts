// Shared API utilities for Hide Haven frontend

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.hidehaven.me";

export const MEDIA_BASE_URL =
  process.env.NEXT_PUBLIC_MEDIA_BASE_URL || "https://hidehaven.me";

// ── Types ──────────────────────────────────────────────────────────

export type Product = {
  id?: number;
  name: string;
  description?: string;
  price: number;
  sale_price?: number | null;
  image_url?: string | null;
  image_full_url?: string | null;
  is_bestseller?: number | null;
  is_new?: number | null;
  is_featured?: number | null;
  is_on_sale?: number | null;
  stock?: number | null;
  slug?: string;
  category?: string;
  type?: string;
  color?: string;
  colors?: string;
  sort_order?: number;
  youtube_url?: string | null;
};

export type ProductMedia = {
  id?: number;
  url?: string;
  media_url?: string;
  full_url?: string;
  media_type?: string;
  type?: string;
  sort_order?: number;
};

export type ProductDetail = {
  data: Product;
  media: ProductMedia[];
};

export type HeroImage = {
  image_path: string;
  image_full_url?: string | null;
  caption?: string | null;
  alt_text?: string | null;
  link_url?: string | null;
  active?: number | null;
};

export type Banner = {
  text: string;
  active?: number | null;
};

export type ProductResponse = {
  data: Product[];
  meta?: { page: number; limit: number; total: number };
};

export type CartItem = {
  product_id?: number;
  name: string;
  price: number;
  quantity: number;
  image_url?: string | null;
  image_full_url?: string | null;
  color?: string;
  size?: string;
  slug?: string;
};

export type OrderPayload = {
  name: string;
  phone: string;
  address: string;
  email?: string;
  delivery_area: "dhaka" | "outside";
  note?: string;
  delivery_fee?: number;
  items: {
    product_id?: number;
    product_name: string;
    unit_price: number;
    quantity: number;
  }[];
};

export type OrderResponse = {
  data?: {
    order_id: number;
    subtotal: number;
    delivery_fee: number;
    total: number;
  };
  error?: string;
};

// ── Helpers ────────────────────────────────────────────────────────

export const resolveImageUrl = (path?: string | null): string => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${MEDIA_BASE_URL}${path}`;
};

export const formatPrice = (value?: number | null): string => {
  if (!value && value !== 0) return "";
  return `BDT ${value.toLocaleString("en-US")}`;
};

// ── Fetch helpers (server-side) ────────────────────────────────────

export const fetchJson = async <T>(
  path: string,
  options?: RequestInit
): Promise<T | null> => {
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      cache: "no-store",
      ...options,
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
};

export const postJson = async <T>(
  path: string,
  body: unknown
): Promise<T | null> => {
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return (await res.json()) as T;
  } catch {
    return null;
  }
};

// ── API functions ──────────────────────────────────────────────────

export const fetchHeroImages = () =>
  fetchJson<{ data: HeroImage[] }>("/api/hero-images");

export const fetchBanners = () =>
  fetchJson<{ data: Banner[] }>("/api/banners");

export const fetchProducts = (params: Record<string, string> = {}) => {
  const qs = new URLSearchParams(params).toString();
  return fetchJson<ProductResponse>(`/api/products${qs ? `?${qs}` : ""}`);
};

export const fetchProductBySlug = (slug: string) =>
  fetchJson<ProductDetail>(`/api/products/${encodeURIComponent(slug)}`);

export const placeOrder = (payload: OrderPayload) =>
  postJson<OrderResponse>("/api/orders", payload);
