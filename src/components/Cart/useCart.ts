import {
  cartAll,
  cartDeleteID,
  cartDraft,
  cartID,
  changeItemQuantity,
} from '../../api/customerCart';
import { useState } from 'react';
import { LineItem } from '@commercetools/platform-sdk';
import { cartData } from './CartList';
import { count } from '../../constants/registratForm';

interface IuseCartID {
  asyncCartID: () => void;
  isLoading: boolean;
  response: LineItem[];
  error: string;
  version: number;
  sumaCart: number;
}
export function useCartID(ID: string): IuseCartID {
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

//================ Все что ниже не используеться ================
export interface IuseCartAll {
  asyncCartAll: () => void;
  isLoading: boolean;
  response: number;
  error: string;
}
export function useCartAll(): IuseCartAll {
  const [isLoading, setLoading] = useState(true);
  const [response, setResponse] = useState(0);
  const [error, setError] = useState('');

  const asyncCartAll = async (): Promise<void> => {
    await cartAll()
      .then(body => {
        if (body.statusCode === 200) {
          setResponse(body.body.results.length);
          setError('');
        }
      })
      .catch(error => {
        setResponse(error.statusCode);
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
  };
  return { asyncCartAll, isLoading, response, error };
}

export interface IuseUpdateItem {
  cartUpdateItem: (quantity: number) => void;
  isLoading: boolean;
  response: number;
  error: string;
}

export function useUpdateItem(): IuseUpdateItem {
  const [isLoading, setLoading] = useState(true);
  const [response, setResponse] = useState(0);
  const [error, setError] = useState('');

  const cartUpdateItem = async (quantity: number): Promise<void> => {
    await changeItemQuantity(count.cartID, count.versionCart, [
      {
        action: 'changeLineItemQuantity',
        lineItemId: 'aa24f2e2-9a84-47bb-a1b0-3f1e88ce6df9',
        quantity: quantity,
      },
    ])
      .then(body => {
        count.versionCart = body.body.version;
        if (body.statusCode === 200) {
          setResponse(quantity);
          setError('');
        }
      })
      .catch(error => {
        setResponse(error.statusCode);
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
  };
  return { cartUpdateItem, isLoading, response, error };
}

export interface IuseCartDraft {
  cartUserDraft: () => void;
  isLoading: boolean;
  idCart: string;
  error: string;
}
export function useCartDraft(): IuseCartDraft {
  const [isLoading, setLoading] = useState(true);
  const [idCart, setIdCart] = useState('');
  const [error, setError] = useState('');

  const cartUserDraft = async (): Promise<void> => {
    await cartDraft()
      .then(body => {
        if (body.statusCode === 201) {
          setIdCart(body.body.id);
          count.cartID = body.body.id;
          count.versionCart = 1;
        }
      })
      .catch(error => {
        setError(error.statusCode);
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
  };
  return { cartUserDraft, isLoading, idCart, error };
}

interface IuseCartDelete {
  cartUserDelete: () => void;
  isLoading: boolean;
  error: string;
}
export function useCartDelete(): IuseCartDelete {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const cartUserDelete = async (): Promise<void> => {
    await cartDeleteID(count.cartID, count.versionCart)
      .then(body => {
        if (body.statusCode === 200) {
          count.cartID = '';
          count.versionCart = 1;
        }
      })
      .catch(error => {
        setError(error.statusCode);
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
  };
  return { cartUserDelete, isLoading, error };
}
