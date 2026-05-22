"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

type WishlistItem = {
  product_id?: number;
  name: string;
  price: number;
  image_url?: string | null;
  image_full_url?: string | null;
  slug?: string;
};

type WishlistContextType = {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (productId: number) => void;
  isWishlisted: (productId?: number) => boolean;
  itemCount: number;
};

const WishlistContext = createContext<WishlistContextType | null>(null);

const STORAGE_KEY = "hidehaven_wishlist";

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, hydrated]);

  const addItem = useCallback((item: WishlistItem) => {
    setItems((prev) => {
      if (item.product_id && prev.some((i) => i.product_id === item.product_id)) {
        return prev;
      }
      return [...prev, item];
    });
  }, []);

  const removeItem = useCallback((productId: number) => {
    setItems((prev) => prev.filter((i) => i.product_id !== productId));
  }, []);

  const isWishlisted = useCallback(
    (productId?: number) => {
      if (!productId) return false;
      return items.some((i) => i.product_id === productId);
    },
    [items]
  );

  const itemCount = items.length;

  return (
    <WishlistContext.Provider
      value={{ items, addItem, removeItem, isWishlisted, itemCount }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist(): WishlistContextType {
  const ctx = useContext(WishlistContext);
  if (!ctx) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return ctx;
}
