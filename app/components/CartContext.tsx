"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { CartItem } from "../lib/api";

// ── Types ──────────────────────────────────────────────────────────

type CartContextType = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  toastMessage: string | null;
  dismissToast: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = "hidehaven_cart";

// ── Provider ───────────────────────────────────────────────────────

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  // Persist to localStorage whenever items change
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, hydrated]);

  const dismissToast = useCallback(() => {
    setToastMessage(null);
  }, []);

  const addItem = useCallback((item: CartItem) => {
    setItems((prev) => {
      // If same product already in cart, increment quantity
      const existingIdx = prev.findIndex(
        (i) => i.product_id && i.product_id === item.product_id
      );
      let updated: CartItem[];
      let qty: number;
      if (existingIdx >= 0) {
        updated = [...prev];
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: updated[existingIdx].quantity + item.quantity,
        };
        qty = updated[existingIdx].quantity;
      } else {
        updated = [...prev, item];
        qty = item.quantity;
      }
      const totalItems = updated.reduce((s, i) => s + i.quantity, 0);
      setToastMessage(`"${item.name}" ×${qty} added! Cart now has ${totalItems} item${totalItems !== 1 ? "s" : ""}.`);
      setTimeout(() => setToastMessage(null), 3000);
      return updated;
    });
  }, []);

  const removeItem = useCallback((index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const updateQuantity = useCallback((index: number, quantity: number) => {
    setItems((prev) => {
      if (quantity <= 0) return prev.filter((_, i) => i !== index);
      const updated = [...prev];
      updated[index] = { ...updated[index], quantity };
      return updated;
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        toastMessage,
        dismissToast,
      }}
    >
      {children}
      {/* Toast notification */}
      {toastMessage && (
        <div className="cart-toast" onClick={dismissToast}>
          <span>{toastMessage}</span>
          <button className="cart-toast__close" aria-label="Dismiss">✕</button>
        </div>
      )}
    </CartContext.Provider>
  );
}

// ── Hook ───────────────────────────────────────────────────────────

export function useCart(): CartContextType {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
