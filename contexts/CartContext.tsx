"use client";

import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';

export type CartItem = {
  slug: string;
  name: string;
  price: string;
  src?: string;
  quantity: number;
};

type CartSnapshot = Omit<CartItem, 'quantity'> & { quantity?: number };

type CartContextValue = {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
  formattedTotal: string;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (slug: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);
const STORAGE_KEY = 'bengalMeat:cart';

const hasWindow = () => typeof window !== 'undefined';

const readCart = (): CartItem[] => {
  if (!hasWindow()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: CartSnapshot[] = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((item): item is CartSnapshot => !!item && typeof item === 'object')
      .map((item) => ({
        slug: item.slug,
        name: item.name,
        price: item.price,
        src: item.src,
        quantity: typeof item.quantity === 'number' && item.quantity > 0 ? item.quantity : 1,
      }))
      .filter((item) => item.slug && item.name && item.price);
  } catch (error) {
    console.error('Failed to read cart from storage', error);
    return [];
  }
};

const writeCart = (items: CartItem[]) => {
  if (!hasWindow()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Failed to write cart to storage', error);
  }
};

export function CartProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(readCart());
  }, []);

  useEffect(() => {
    if (!hasWindow()) return;
    const sync = (event: StorageEvent) => {
      if (event.key && event.key !== STORAGE_KEY) return;
      setItems(readCart());
    };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);

  useEffect(() => {
    writeCart(items);
  }, [items]);

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.slug === item.slug);
      if (existing) {
        return prev.map((i) =>
          i.slug === item.slug
            ? { ...i, quantity: Math.min(i.quantity + 1, 99) }
            : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeItem = (slug: string) => {
    setItems((prev) => prev.filter((item) => item.slug !== slug));
  };

  const clearCart = () => setItems([]);

  const totalQuantity = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items]
  );

  const totalPrice = useMemo(() => {
    return items.reduce((total, item) => {
      const numeric = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
      return total + numeric * item.quantity;
    }, 0);
  }, [items]);

  const formattedTotal = useMemo(() => `$${totalPrice.toFixed(2)}`, [totalPrice]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      totalQuantity,
      totalPrice,
      formattedTotal,
      addItem,
      removeItem,
      clearCart,
    }),
    [items, totalQuantity, totalPrice, formattedTotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
