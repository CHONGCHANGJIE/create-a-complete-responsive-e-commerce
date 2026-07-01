"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Product, products } from "@/data/products";

export type CartLine = { id: string; quantity: number; saved?: boolean };

type StoreContextValue = {
  cart: CartLine[];
  wishlist: string[];
  compare: string[];
  recent: string[];
  dark: boolean;
  cartCount: number;
  cartProducts: Array<Product & { quantity: number; saved?: boolean }>;
  wishlistProducts: Product[];
  compareProducts: Product[];
  recentProducts: Product[];
  addToCart: (id: string, quantity?: number) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  saveForLater: (id: string) => void;
  toggleWishlist: (id: string) => void;
  toggleCompare: (id: string) => void;
  addRecent: (id: string) => void;
  toggleDark: () => void;
  clearCart: () => void;
};

const StoreContext = createContext<StoreContextValue | null>(null);

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const item = window.localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [compare, setCompare] = useState<string[]>([]);
  const [recent, setRecent] = useState<string[]>([]);
  const [dark, setDark] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setCart(read("hardwarehub-cart", []));
    setWishlist(read("hardwarehub-wishlist", []));
    setCompare(read("hardwarehub-compare", []));
    setRecent(read("hardwarehub-recent", []));
    setDark(read("hardwarehub-dark", false));
    setHydrated(true);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    if (!hydrated) return;
    window.localStorage.setItem("hardwarehub-dark", JSON.stringify(dark));
  }, [dark, hydrated]);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem("hardwarehub-cart", JSON.stringify(cart));
  }, [cart, hydrated]);
  useEffect(() => {
    if (hydrated) window.localStorage.setItem("hardwarehub-wishlist", JSON.stringify(wishlist));
  }, [hydrated, wishlist]);
  useEffect(() => {
    if (hydrated) window.localStorage.setItem("hardwarehub-compare", JSON.stringify(compare));
  }, [compare, hydrated]);
  useEffect(() => {
    if (hydrated) window.localStorage.setItem("hardwarehub-recent", JSON.stringify(recent));
  }, [hydrated, recent]);

  const productById = useMemo(() => new Map(products.map((product) => [product.id, product])), []);

  const value = useMemo<StoreContextValue>(() => {
    const cartProducts = cart
      .map((line) => {
        const product = productById.get(line.id);
        return product ? { ...product, quantity: line.quantity, saved: line.saved } : null;
      })
      .filter(Boolean) as StoreContextValue["cartProducts"];

    return {
      cart,
      wishlist,
      compare,
      recent,
      dark,
      cartCount: cart.filter((line) => !line.saved).reduce((sum, line) => sum + line.quantity, 0),
      cartProducts,
      wishlistProducts: wishlist.map((id) => productById.get(id)).filter(Boolean) as Product[],
      compareProducts: compare.map((id) => productById.get(id)).filter(Boolean) as Product[],
      recentProducts: recent.map((id) => productById.get(id)).filter(Boolean) as Product[],
      addToCart: (id, quantity = 1) =>
        setCart((lines) => {
          const current = lines.find((line) => line.id === id && !line.saved);
          if (current) {
            return lines.map((line) =>
              line.id === id && !line.saved ? { ...line, quantity: line.quantity + quantity } : line
            );
          }
          return [...lines, { id, quantity }];
        }),
      updateQuantity: (id, quantity) =>
        setCart((lines) =>
          lines.map((line) => (line.id === id ? { ...line, quantity: Math.max(1, quantity) } : line))
        ),
      removeFromCart: (id) => setCart((lines) => lines.filter((line) => line.id !== id)),
      saveForLater: (id) =>
        setCart((lines) => lines.map((line) => (line.id === id ? { ...line, saved: !line.saved } : line))),
      toggleWishlist: (id) =>
        setWishlist((items) => (items.includes(id) ? items.filter((item) => item !== id) : [...items, id])),
      toggleCompare: (id) =>
        setCompare((items) =>
          items.includes(id) ? items.filter((item) => item !== id) : [...items.slice(-3), id]
        ),
      addRecent: (id) => setRecent((items) => [id, ...items.filter((item) => item !== id)].slice(0, 8)),
      toggleDark: () => setDark((mode) => !mode),
      clearCart: () => setCart([])
    };
  }, [cart, compare, dark, productById, recent, wishlist]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used inside StoreProvider");
  }
  return context;
}
