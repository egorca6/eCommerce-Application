import { cartID } from '../api/customerCart';
import { useState } from 'react';
import { count } from '../constants/registratForm';
import { IUseIsItemInCart } from '../types/hooks';

export function useIsItemInCart(itemKey: string): IUseIsItemInCart {
  const [isLoading, setLoading] = useState(true);
  const [IsItem, setIsItem] = useState(true);
  const [error, setError] = useState('');
  (async (): Promise<void> => {
    await cartID(count.cartID)
      .then(body => {
        if (body.statusCode === 200) {
          if (count.cartID) {
            count.versionCart = body.body.version;
            if (body.body.lineItems) {
              body.body.lineItems.forEach(data => {
                if (data.productKey === itemKey.trim()) {
                  count.productId = data.id;
                  setIsItem(false);
                }
              });
            }
          }
        }
      })
      .catch(error => {
        console.warn(error);
        if (error.code === 400) {
          setError(`ERROR: ${error.message}${error.code}`);
        } else {
          setError(`ERROR: ${error.message}${error.code}`);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  })();
  return { isLoading, IsItem, error };
}
