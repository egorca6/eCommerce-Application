import {
  ClientResponse,
  Customer,
  CustomerDraft,
  CustomerSignin,
  CustomerSignInResult,
  CustomerUpdateAction,
} from '@commercetools/platform-sdk';
import { ApiRequest } from '@commercetools/platform-sdk/dist/declarations/src/generated/shared/utils/requests-utils';
import { apiRoot } from './Client';

export const clientSignIn = (
  data: CustomerSignin,
  anonymCartId: string,
): ApiRequest<CustomerSignInResult> => {
  if (anonymCartId) {
    return apiRoot.login().post({
      body: {
        email: data.email,
        password: data.password,
        anonymousCart: {
          id: anonymCartId,
          typeId: 'cart',
        },
      },
    });
  } else {
    return apiRoot.login().post({
      body: {
        email: data.email,
        password: data.password,
      },
    });
  }
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
