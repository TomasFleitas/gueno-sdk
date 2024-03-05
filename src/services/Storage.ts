export class TTLStorage {
  /**
   * Stores an item in localStorage with a TTL.
   * @param key The storage key under which to store the value.
   * @param value The value to be stored.
   * @param ttl Time to live in seconds.
   */
  static setItem(key: string, value: any, ttl: number): void {
    const now = new Date().getTime();
    const item = {
      value: value,
      expiry: now + ttl * 1000,
    };
    localStorage.setItem(key, JSON.stringify(item));
  }

  /**
   * Retrieves an item from localStorage and checks if it's still valid based on its TTL.
   * @param key The storage key to retrieve the value from.
   * @returns The stored value or null if the item has expired or does not exist.
   */
  static getItem(key: string): any | null {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return null;
    }

    const item = JSON.parse(itemStr);
    const now = new Date().getTime();

    if (now > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }

    return item.value;
  }

  /**
   * Removes an item from localStorage.
   * @param key The storage key of the item to remove.
   */
  static removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * Clears all items from localStorage.
   */
  static clear(): void {
    localStorage.clear();
  }
}
