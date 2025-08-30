export function isNotEmpty<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

export function objectEntries<T extends object>(data: T): [keyof T, T[keyof T]] {
  return Object.entries(data) as [keyof T, T[keyof T]];
}

export function objectFromEntries<K extends string | number | symbol, V>(entries: Array<[K, V]>): Record<K, V> {
  return Object.fromEntries(entries) as Record<K, V>;
}
