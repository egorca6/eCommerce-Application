import {
  addProductCart,
  cartDeleteID,
  cartDraft,
  cartID,
  changeItemQuantity,
} from '../../api/customerCart';
import { useState } from 'react';
import { count } from '../../constants/registratForm';

interface IuseIsItemInCart {
  isLoading: boolean;
  IsItem: boolean;
  error: string;
}
export function useIsItemInCart(itemKey: string): IuseIsItemInCart {
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

export const asyncAddItemCart = async (itemID: string): Promise<void> => {
  await addProductCart(count.cartID, count.versionCart, itemID)
    .then(body => {
      count.versionCart = body.body.version;
    })
    .catch(error => {
      console.warn(error);
      count.errors = `ERROR: ${error.message}${error.code}`;
    });
};

export const cartUserDraft = async (itemID: string): Promise<void> => {
  await cartDraft()
    .then(body => {
      if (body.statusCode === 201) {
        count.cartID = body.body.id;
        count.versionCart = body.body.version;
        asyncAddItemCart(itemID);
      }
    })
    .catch(error => {
      console.warn(error);
      count.errors = `ERROR: ${error.message}${error.code}`;
    })
    .finally(() => {});
};

export const asyncUpdateItemCart = async (
  itemID: string,
  quantity: number,
  callback: (delet: boolean, sumaItem: number) => void,
): Promise<void> => {
  await changeItemQuantity(count.cartID, count.versionCart, [
    {
      action: 'changeLineItemQuantity',
      lineItemId: itemID,
      quantity: quantity,
    },
  ])
    .then(body => {
      count.versionCart = body.body.version;
      callback(true, quantity);
    })
    .catch(error => {
      console.warn(error);
      if (error.code === 409) {
        count.errors = `Не гони лошадей, помедленее... ПЖЖЖалуйста, товара на всех хватит!!!`;
      } else {
        count.errors = `ERROR: ${error.message}${error.code}`;
      }
    });
};

export const asyncUpdateCartProductId = async (
  itemID: string,
  callback: (delet: boolean, sumaItem: number) => void,
): Promise<void> => {
  await cartID(count.cartID)
    .then(({ body }) => {
      if (count.cartID) {
        count.versionCart = body.version;
        if (body.lineItems) {
          body.lineItems.forEach(data => {
            if (data.productId === itemID) {
              asyncUpdateItemCart(data.id, 0, callback);
            }
          });
        }
      }
    })
    .catch(error => {
      console.warn(error);
      count.errors = `ERROR: ${error.message}${error.code}`;
    });
};

export const asyncCartDeleteID = async (
  callback: (delet: boolean, sumaItem: number) => void,
): Promise<void> => {
  if (count.cartID) {
    await cartDeleteID(count.cartID, count.versionCart)
      .then(() => callback(true, 0))
      .catch(error => {
        console.warn(error);
        count.errors = `ERROR: ${error.message}${error.code}`;
      });
  }
};

function setLocalStorage(): void {
  let id = localStorage.getItem('arrSave');
  let cartid = '';
  if (id) cartid = id;
  let vers = localStorage.getItem('arrSave00');
  let version = 1;
  if (vers) version = +vers;
  if (id && version) {
    // console.log(`=${id}===${version}==`);
    (async (): Promise<void> => {
      await cartDeleteID(cartid, version)
        .then()
        .catch(error => {
          console.warn(error);
          count.errors = `ERROR: ${error.message}${error.code}`;
        });
    })();
  }
}

function setLocalStorage01(): void {
  localStorage.setItem('arrSave', count.cartID);
  localStorage.setItem('arrSave00', count.versionCart + '');
}

window.addEventListener('beforeunload', setLocalStorage01);
window.addEventListener('load', setLocalStorage);

//================ Все что ниже не используеться ================
const cartCountItems = (callback: (swithCartEmpty: number) => void): void => {
  let swithCartEmpty = 1;
  (async (): Promise<void> => {
    await cartID(count.cartID)
      .then(({ body }) => {
        console.log(body.lineItems.length);
        swithCartEmpty = body.lineItems.length;
      })
      .catch(console.error)
      .finally(() => {
        callback(swithCartEmpty);
      });
  })();
};
//======cartDeleteID
const cartDelete = async (): Promise<void> => {
  await cartDeleteID(count.cartID, count.versionCart) // версия в удаляемой корзине
    .then(({ body }) => {
      console.log(body);
      console.log('444444');
    })
    .catch(console.error);
};
