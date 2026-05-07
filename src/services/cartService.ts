import type { CartItem } from '../types';
import { getItem, setItem } from './storage';

const CART_KEY = 'cart';

function getCartItems(): CartItem[] {
  return getItem<CartItem[]>(CART_KEY, []);
}

function saveCartItems(items: CartItem[]): void {
  setItem(CART_KEY, items);
}

/**
 * Get all items currently in the cart.
 */
export function getCart(): CartItem[] {
  return getCartItems();
}

/**
 * Add a service to the cart. Each addition creates a new entry
 * (the same service+tier can appear multiple times).
 */
export function addToCart(item: CartItem): CartItem[] {
  const items = getCartItems();
  const updated = [...items, { ...item, id: item.id || crypto.randomUUID() }];
  saveCartItems(updated);
  return updated;
}

/**
 * Remove a single item from the cart by its unique cart item ID.
 */
export function removeFromCart(itemId: string): CartItem[] {
  const items = getCartItems();
  const updated = items.filter((i) => i.id !== itemId);
  saveCartItems(updated);
  return updated;
}

/**
 * Clear all items from the cart.
 */
export function clearCart(): CartItem[] {
  saveCartItems([]);
  return [];
}

/**
 * Calculate the total price of all items in the cart.
 */
export function getCartTotal(): number {
  return getCartItems().reduce((sum, item) => sum + item.price, 0);
}

/**
 * Get the number of items in the cart.
 */
export function getCartCount(): number {
  return getCartItems().length;
}
