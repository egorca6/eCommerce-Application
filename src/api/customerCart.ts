import {
  ClientResponse,
  Cart,
  CartPagedQueryResponse,
  CartUpdateAction,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import { ByProjectKeyShoppingListsRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/shopping-lists/by-project-key-shopping-lists-request-builder';
import { ClientBuilder } from '@commercetools/sdk-client-v2';
import { count } from '../constants/registratForm';
import { apiRoot, apiRootAnonymous } from './Client';

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
    const customClient = new ClientBuilder()
      .withPasswordFlow({
        host: 'https://auth.europe-west1.gcp.commercetools.com',
        projectKey: 'bon747jour',
        credentials: {
          clientId: process.env.REACT_APP_CTP_CLIENT_ID || '',
          clientSecret: process.env.REACT_APP_CTP_CLIENT_SECRET || '',
          user: {
            username: count.email,
            password: count.password,
          },
        },
        scopes: [`manage_project:${'bon747jour'}`],
        fetch,
      })
      .withHttpMiddleware({
        host: 'https://api.europe-west1.gcp.commercetools.com',
        fetch,
      })
      .build();
    return createApiBuilderFromCtpClient(customClient)
      .withProjectKey({
        projectKey: 'bon747jour',
      })
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
