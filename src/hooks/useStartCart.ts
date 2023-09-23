import { useState } from 'react';
import { count } from '../constants/registratForm';
import { IuseStartCart } from '../types/hooks';

export function useStartCart(): IuseStartCart {
  const [isLoading, setLoading] = useState(true);
  if (count.switchRenderStartCart) {
    setTimeout(() => {
      setLoading(false);
    }, 100);
  }
  return { isLoading };
}
