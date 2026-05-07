import { createContext, useState, useMemo, useCallback, type ReactNode } from 'react';
import type { CartItem } from '../types';
import * as cartService from '../services/cartService';

export interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  totalPrice: number;
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextValue | null>(null);

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>(() => cartService.getCart());

  const itemCount = useMemo(() => items.length, [items]);

  const totalPrice = useMemo(
    () => items.reduce((sum, item) => sum + item.price, 0),
    [items],
  );

  const addItem = useCallback((item: CartItem) => {
    const updated = cartService.addToCart(item);
    setItems(updated);
  }, []);

  const removeItem = useCallback((itemId: string) => {
    const updated = cartService.removeFromCart(itemId);
    setItems(updated);
  }, []);

  const clearCart = useCallback(() => {
    const updated = cartService.clearCart();
    setItems(updated);
  }, []);

  const value: CartContextValue = {
    items,
    itemCount,
    totalPrice,
    addItem,
    removeItem,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
