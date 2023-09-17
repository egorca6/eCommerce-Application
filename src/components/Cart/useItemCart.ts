import {
  addProductCart,
  cartAll,
  cartDeleteID,
  cartDraft,
  cartID,
  changeItemQuantity,
} from '../../api/customerCart';
import { useState } from 'react';
import { count } from '../../constants/registratForm';
import { CartUpdateAction } from '@commercetools/platform-sdk';

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
    });
};

export const cartUserDraft = async (itemID: string): Promise<void> => {
  console.log(itemID);
  await cartDraft()
    .then(body => {
      if (body.statusCode === 201) {
        count.cartID = body.body.id;
        count.versionCart = body.body.version;
        count.cartAnonymID =
          count.switchApiRoot && body.body.anonymousId
            ? body.body.anonymousId
            : '';
        asyncAddItemCart(itemID);
      }
    })
    .catch(error => {
      console.warn(error);
    })
    .finally(() => {});
};

export const cartCustomDraft = async (id: string): Promise<void> => {
  (async (): Promise<void> => {
    let swithIsCart = false;
    await cartAll()
      .then(({ body }) => {
        if (body.results) {
          body.results.forEach(data => {
            if (data.customerId === id) {
              swithIsCart = true;
            }
          });
          if (!swithIsCart) {
            (async (): Promise<void> => {
              await cartDraft()
                .then(body => {
                  count.cartID = body.body.id;
                  count.versionCart = body.body.version;
                })
                .catch(error => {
                  console.warn(error);
                })
                .finally(() => {});
            })();
          }
        }
      })
      .catch(console.error);
  })();
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
    });
};

export const asyncDeleteAllProductForCartID = async (
  callback: (delet: boolean, sumaItem: number) => void,
): Promise<void> => {
  await cartID(count.cartID)
    .then(({ body }) => {
      count.versionCart = body.version;
      const array: CartUpdateAction[] = [];

      body.lineItems.forEach(item => {
        array.push({
          action: 'changeLineItemQuantity',
          lineItemId: item.id,
          quantity: 0,
        });
      });

      // let itemID = body.lineItems[0].id;
      const productDelete = async (): Promise<void> => {
        await changeItemQuantity(count.cartID, count.versionCart, array)
          // .then(({ body }) => {
          //   if (body.lineItems.length) {
          //     count.versionCart = body.version;
          //     itemID = body.lineItems[0].id;
          //     productDelete();
          //   } else {
          //     callback(true, 0);
          //     count.cartID = '';
          //     count.versionCart = 1;
          //   }
          // })
          .catch(error => {
            console.warn(error);
          });
      };
      productDelete();
    })
    .catch(error => {
      console.warn(error);
    });
};

export const asyncCartDeleteAnonim = async (): Promise<void> => {
  try {
    const response = await cartID(count.cartID);
    const results = response.body;
    await cartDeleteID(results.id, results.version);
  } catch (err) {
    console.log(err);
  }
  // (async (): Promise<void> => {
  //   await cartID(count.cartID)
  //     .then(({ body }) => {
  //       (async (): Promise<void> => {
  //         await cartDeleteID(body.id, body.version)
  //           .then(() => {})
  //           .catch(console.error);
  //       })();
  //     })
  //     .catch(console.error);
  // })();
};

interface IUseStartCart {
  isLoading: boolean;
}
export function useStartCart(): IUseStartCart {
  const [isLoading, setLoading] = useState(true);
  if (count.switchRenderStartCart) {
    setTimeout(() => {
      setLoading(false);
    }, 100);
  }
  return { isLoading };
}

async function getLocalStorage(): Promise<void> {
  const idCustom = localStorage.getItem('id');

  if (idCustom) {
    count.switchApiRoot = false;
    count.ID = idCustom;
  }

  const id = localStorage.getItem('idSaveAnonym');
  if (id) count.cartAnonymID = id;

  const response = await cartAll();
  const result = response.body.results;
  result.forEach(data => {
    if (idCustom) {
      if (data.customerId === count.ID) {
        count.cartID = data.id;
        count.versionCart = data.version;
      }
    } else {
      if (data.anonymousId === count.cartAnonymID) {
        count.cartID = data.id;
        count.versionCart = data.version;
      }
    }
  });
}

function setLocalStorage(): void {
  localStorage.setItem('idSaveAnonym', count.cartAnonymID);
}

window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('DOMContentLoaded', getLocalStorage);
