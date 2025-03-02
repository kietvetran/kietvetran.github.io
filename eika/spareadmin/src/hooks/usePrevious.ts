import { useEffect, useRef } from 'react';

export default function usePrevious<T>(value: T): T | undefined {
  const previousRef = useRef<T | undefined>(undefined);

  useEffect( () => {
    previousRef.current = value;
  }, [value, previousRef]);

  return previousRef.current;
};

/*
export const sortItemSize = <T>(aItem: T & {size?: number}, bItem: T & {size?: number}): number => {
  const a = aItem.size ?? 0;
  const b = bItem.size ?? 0;
  return a - b;
};
*/