const KEY_PREFIX = 'cln_';

/**
 * Read a value from localStorage, deserializing from JSON.
 * Returns `defaultValue` when the key does not exist or parsing fails.
 */
export function getItem<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(KEY_PREFIX + key);
    if (raw === null) return defaultValue;
    return JSON.parse(raw) as T;
  } catch {
    return defaultValue;
  }
}

/**
 * Write a value to localStorage, serializing to JSON.
 */
export function setItem<T>(key: string, value: T): void {
  localStorage.setItem(KEY_PREFIX + key, JSON.stringify(value));
}

/**
 * Remove a key from localStorage.
 */
export function removeItem(key: string): void {
  localStorage.removeItem(KEY_PREFIX + key);
}
