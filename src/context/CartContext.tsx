"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export type Variant = {
  weight: string;
  priceModifier: number; // e.g., 250g is base * 1, 500g is base * 1.8
};

export type CartItem = {
  id: number;
  name: string;
  basePrice: number;
  price: number; // calculated base * variant modifier
  quantity: number;
  variant: string;
  image?: string;
};

export type Product = {
  id: number; 
  name: string; 
  category: string; 
  basePrice: number; 
  rating: number; 
  notes: string;
};

interface AppContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number, variant: string) => void;
  updateQuantity: (id: number, variant: string, quantity: number) => void;
  cartTotal: number;
  cartCount: number;
  
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (id: number) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);

  // Optional: Load/Save to localStorage could go here
  
  // --- Cart Logic ---
  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      // Find exact match (same product AND same variant)
      const existing = prev.find((i) => i.id === item.id && i.variant === item.variant);
      if (existing) {
        return prev.map((i) => 
          i.id === item.id && i.variant === item.variant 
            ? { ...i, quantity: i.quantity + item.quantity } 
            : i
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (id: number, variant: string) => {
    setCart((prev) => prev.filter((i) => !(i.id === id && i.variant === variant)));
  };

  const updateQuantity = (id: number, variant: string, quantity: number) => {
    if (quantity < 1) return;
    setCart((prev) => prev.map((i) => 
      (i.id === id && i.variant === variant) ? { ...i, quantity } : i
    ));
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  // --- Favorites Logic ---
  const toggleFavorite = (product: Product) => {
    setFavorites(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const isFavorite = (id: number) => {
    return favorites.some(p => p.id === id);
  };

  return (
    <AppContext.Provider value={{ 
      cart, addToCart, removeFromCart, updateQuantity, cartTotal, cartCount,
      favorites, toggleFavorite, isFavorite 
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}

// Keep a simple export alias so files unbroken while we migrate
export const useCart = useAppContext;
