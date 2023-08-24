import { ctpClient } from './BuildClient';
import {
  ClientResponse,
  createApiBuilderFromCtpClient,
  Customer,
  CustomerDraft,
  CustomerSignin,
  CustomerSignInResult,
  CustomerUpdateAction,
  ProductProjectionPagedQueryResponse,
} from '@commercetools/platform-sdk';
import { ApiRequest } from '@commercetools/platform-sdk/dist/declarations/src/generated/shared/utils/requests-utils';
import { ByProjectKeyShoppingListsRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/shopping-lists/by-project-key-shopping-lists-request-builder';

// Create apiRoot from the imported ClientBuilder and include your Project key
const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: 'bon747jour',
});

export const getClients = (): Promise<Object> => {
  return apiRoot.get().execute();
};

export const clientSignIn = (
  data: CustomerSignin,
): ApiRequest<CustomerSignInResult> => {
  return apiRoot.login().post({ body: data });
};

export const getProducts = (): Promise<
  ClientResponse<ProductProjectionPagedQueryResponse>
> => {
  return apiRoot.productProjections().get().execute();
};

export const shopList = (): ByProjectKeyShoppingListsRequestBuilder => {
  return apiRoot.shoppingLists();
};

export const registerNewCustomer = (
  customerData: CustomerDraft,
): Promise<ClientResponse<CustomerSignInResult>> => {
  return apiRoot
    .customers()
    .post({
      body: customerData,
    })
    .execute();
};

export const getAllCustomers = (): Promise<Object> => {
  return apiRoot.customers().get().execute();
};
//========Все данные покупателя по ID
export const getCustomerID = (
  customerID: string,
): Promise<ClientResponse<Customer>> => {
  return apiRoot.customers().withId({ ID: customerID }).get().execute();
};
//========Добавить адрес закомиченно изменить адресс покупателю по ID
export const addCustomerAdress = (
  customerID: string,
  version: number,
  newAddress1: {
    streetName: string;
    postalCode: string;
    city: string;
    country: string;
  },
): Promise<ClientResponse<Customer>> => {
  return apiRoot
    .customers()
    .withId({ ID: customerID })
    .post({
      // The CustomerUpdate is the object within the body
      body: {
        // The version of a new Customer is 1. This value is incremented every time an update action is applied to the Customer. If the specified version does not match the current version, the request returns an error.
        version: version,
        actions: [
          {
            action: 'addAddress',
            // action: 'changeAddress', // для изменения
            // addressId: 'SJwloYOf', // для изменения
            address: newAddress1,
          },
        ],
      },
    })
    .execute();
};
//========Изменит имя, фамилию покупателю по ID
export const updateCustomerName = (
  customerID: string,
  version: number,
): Promise<ClientResponse<Customer>> => {
  return apiRoot
    .customers()
    .withId({ ID: customerID })
    .post({
      body: {
        version: version,
        actions: [
          {
            action: 'setFirstName',
            firstName: 'John22',
          },
          {
            action: 'setLastName',
            lastName: 'Smith122',
          },
        ],
      },
    })
    .execute();
};

export const deledeAddress = (
  customerID: string,
  version: number,
  addressID: string,
): Promise<ClientResponse<Customer>> => {
  return apiRoot
    .customers()
    .withId({ ID: customerID })
    .post({
      body: {
        version: version,
        actions: [
          {
            action: 'removeAddress',
            addressId: addressID,
          },
        ],
      },
    })
    .execute();
};

export const customersIdPostExecute = (
  customerID: string,
  version: number,
  actions: CustomerUpdateAction[],
): Promise<ClientResponse<Customer>> => {
  return apiRoot
    .customers()
    .withId({ ID: customerID })
    .post({
      body: {
        version: version,
        actions: actions,
      },
    })
    .execute();
};
