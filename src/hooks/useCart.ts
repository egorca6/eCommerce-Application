import { cartID } from '../api/customerCart';
import { useState } from 'react';
import { cartData } from '../components/Cart/CartList';
import { count } from '../constants/registratForm';
import { IUseCartID } from '../types/hooks';

export function useCartID(ID: string): IUseCartID {
  const [isLoading, setLoading] = useState(true);
  const [response, setResponse] = useState(cartData);
  const [version, setVersion] = useState(0);
  const [sumaCart, setSumaCart] = useState(0);
  const [error, setError] = useState('===000===');

  const asyncCartID = async (): Promise<void> => {
    await cartID(ID)
      .then(body => {
        let suma = 0;
        if (body.statusCode === 200) {
          if (count.cartID) {
            cartData.splice(0, cartData.length);
            if (body.body.lineItems.length) {
              body.body.lineItems.forEach(data => {
                cartData.push(data);
                suma += data.price.value.centAmount * data.quantity;
              });
            }
          }
          setResponse(body.body.lineItems);
          setVersion(body.body.version);
          setSumaCart(suma);
        }
      })
      .catch(error => {
        setResponse(error.statusCode);
        if (error.code === 400) {
          setError(`ERROR: ${error.message}${error.code}`);
        } else {
          setError(`ERROR: ${error.message}${error.code}`);
        }
      })
      .finally(() => {
        if (count.cartID) {
          setLoading(false);
        }
      });
  };
  return { asyncCartID, isLoading, response, error, version, sumaCart };
}
