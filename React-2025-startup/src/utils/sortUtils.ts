export function sortByNumber<T>(aObject: T, bObject: T, field: keyof T): number {
  const aNumber = Number(aObject[field] ?? 0);
  const bNumber = Number(bObject[field] ?? 0);
  return aNumber - bNumber;
}
