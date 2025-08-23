import { useEffect, useRef } from 'react';

export const usePrevious = <T>(value: T): T | null => {
  const reference = useRef<T | null>(null);
  useEffect(() => {
    reference.current = value;
  }, [value]);
  return reference.current;
};
