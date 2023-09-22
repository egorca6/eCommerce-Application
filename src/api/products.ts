import {
  ClientResponse,
  CategoryPagedQueryResponse,
  ProductProjection,
  ProductProjectionPagedQueryResponse,
} from '@commercetools/platform-sdk';
import { apiRoot } from './Client';

export const getCategoryProducts = (): Promise<
  ClientResponse<CategoryPagedQueryResponse>
> => {
  return apiRoot.categories().get().execute();
};

export const getProductById = (
  productId: string,
): Promise<ClientResponse<ProductProjection>> => {
  return apiRoot.productProjections().withId({ ID: productId }).get().execute();
};

export const getProducts = (
  page?: number,
  productInPage?: number,
  category?: string | string[],
  sorted?: string[] | string,
  searchText?: string,
): Promise<ClientResponse<ProductProjectionPagedQueryResponse>> => {
  return apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        limit: productInPage,
        offset: page,
        filter: category,
        sort: sorted,
        'text.en-US': searchText,
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
