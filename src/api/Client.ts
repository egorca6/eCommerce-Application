import { ctpClient } from './BuildClient';
import {
  CategoryPagedQueryResponse,
  ClientResponse,
  createApiBuilderFromCtpClient,
  Customer,
  CustomerDraft,
  CustomerSignin,
  CustomerSignInResult,
  CustomerUpdateAction,
  ProductProjection,
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

export const getCategoryProducts = (): Promise<
  ClientResponse<CategoryPagedQueryResponse>
> => {
  return apiRoot.categories().get().execute();
};

export const getProducts = (
  page?: number,
  productInPage?: number,
): Promise<ClientResponse<ProductProjectionPagedQueryResponse>> => {
  return apiRoot
    .productProjections()
    .get({ queryArgs: { limit: productInPage, offset: page } })
    .execute();
};

export const getProductById = (
  productId: string,
): Promise<ClientResponse<ProductProjection>> => {
  return apiRoot.productProjections().withId({ ID: productId }).get().execute();
};

export const FilterProducts = (
  page: number,
  productInPage: number,
  filterStr?: string,
): Promise<ClientResponse<ProductProjectionPagedQueryResponse>> => {
  return apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        limit: productInPage,
        offset: page,
        filter: filterStr,
        markMatchingVariants: true,
      },
    })
    .execute();
};

export const SortProducts = (
  sorted: string[] | string,
  filterStr?: string,
  page?: number,
  productInPage?: number,
): Promise<ClientResponse<ProductProjectionPagedQueryResponse>> => {
  return apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        limit: 30,
        // offset: page,
        sort: sorted,
        markMatchingVariants: true,
      },
    })
    .execute();
};

export const searchProducts = (
  searchText: string,
  filterStr?: string,
  page?: number,
  productInPage?: number,
): Promise<ClientResponse<ProductProjectionPagedQueryResponse>> => {
  return apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        limit: 20,
        'text.en-US': searchText,
        // offset: page,
        markMatchingVariants: true,
        fuzzy: true,
      },
    })
    .execute();
};

export const getProductByKey = (
  productId: string,
): Promise<ClientResponse<ProductProjection>> => {
  return apiRoot
    .productProjections()
    .withKey({ key: productId })
    .get()
    .execute();
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

export const getCustomerID = (
  customerID: string,
): Promise<ClientResponse<Customer>> => {
  return apiRoot.customers().withId({ ID: customerID }).get().execute();
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

export const newPassword = (
  customerID: string,
  version: number,
  currentPassword: string,
  newPassword: string,
): Promise<ClientResponse<Customer>> => {
  return apiRoot
    .customers()
    .password()
    .post({
      body: {
        id: customerID,
        version: version,
        currentPassword: currentPassword,
        newPassword: newPassword,
      },
    })
    .execute();
};
