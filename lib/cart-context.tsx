"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { PRODUCTS, Product } from "./products";

export interface CartLine {
  productId: string;
  quantity: number;
}

interface CartContextValue {
  lines: CartLine[];
  items: { product: Product; quantity: number }[];
  addItem: (productId: string, quantity?: number) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  total: number;
  count: number;
  ready: boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "monetiq_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartLine[];
        // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from localStorage, which only exists client-side
        if (Array.isArray(parsed)) setLines(parsed);
      }
    } catch {
      // ignore malformed cart data
    } finally {
      setReady(true);
    }
  }, []);

  // Persist on every change (after initial load)
  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, ready]);

  const addItem = (productId: string, quantity = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.productId === productId);
      if (existing) {
        return prev.map((l) =>
          l.productId === productId
            ? { ...l, quantity: l.quantity + quantity }
            : l
        );
      }
      return [...prev, { productId, quantity }];
    });
  };

  const removeItem = (productId: string) => {
    setLines((prev) => prev.filter((l) => l.productId !== productId));
  };

  const setQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setLines((prev) =>
      prev.map((l) => (l.productId === productId ? { ...l, quantity } : l))
    );
  };

  const clearCart = () => setLines([]);

  const items = useMemo(
    () =>
      lines
        .map((l) => {
          const product = PRODUCTS.find((p) => p.id === l.productId);
          return product ? { product, quantity: l.quantity } : null;
        })
        .filter((x): x is { product: Product; quantity: number } => !!x),
    [lines]
  );

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    [items]
  );

  const count = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  const value: CartContextValue = {
    lines,
    items,
    addItem,
    removeItem,
    setQuantity,
    clearCart,
    subtotal,
    total: subtotal,
    count,
    ready,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
