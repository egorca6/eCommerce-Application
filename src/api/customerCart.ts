import {
  ClientResponse,
  Cart,
  CartPagedQueryResponse,
  CartUpdateAction,
} from '@commercetools/platform-sdk';
import { ByProjectKeyShoppingListsRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/shopping-lists/by-project-key-shopping-lists-request-builder';
import { count } from '../constants/registratForm';
import { apiRoot, apiRootAnonymous, apiRootCustom } from './Client';

export const shopList = (): ByProjectKeyShoppingListsRequestBuilder => {
  return apiRoot.shoppingLists();
};

export const cartID = (cartID: string): Promise<ClientResponse<Cart>> => {
  return apiRoot.carts().withId({ ID: cartID }).get().execute();
};

export const cartAll = (): Promise<ClientResponse<CartPagedQueryResponse>> => {
  return apiRoot.carts().get().execute();
};

export const cartDeleteID = (
  cartID: string,
  version: number,
): Promise<ClientResponse<Cart>> => {
  return apiRoot
    .carts()
    .withId({ ID: cartID })
    .delete({
      queryArgs: {
        key: 'bon47',
        version: version,
      },
    })
    .execute();
};

export const addProductCart = (
  cartID: string,
  version: number,
  productId: string,
): Promise<ClientResponse<Cart>> => {
  return apiRoot
    .carts()
    .withId({ ID: cartID })
    .post({
      body: {
        version: version,
        actions: [
          {
            action: 'addLineItem',
            productId: productId,
            quantity: 1,
          },
        ],
      },
    })
    .execute();
};

export const changeItemQuantity = (
  customerID: string,
  version: number,
  actions: CartUpdateAction[],
): Promise<ClientResponse<Cart>> => {
  return apiRoot
    .carts()
    .withId({ ID: customerID })
    .post({
      body: {
        version: version,
        actions: actions,
      },
    })
    .execute();
};

export const cartDraft = (): Promise<ClientResponse<Cart>> => {
  if (count.switchApiRoot) {
    return apiRootAnonymous
      .me()
      .carts()
      .post({
        body: {
          currency: 'EUR',
        },
      })
      .execute();
  } else {
    return apiRootCustom
      .me()
      .carts()
      .post({
        body: {
          currency: 'EUR',
        },
      })
      .execute();
  }
};
