import { count } from '../constants/registratForm';
import { CustomerUpdateAction } from '@commercetools/platform-sdk';
import { customersIdPostExecute, newPassword } from './customers';
import { updateUserData } from '../components/Forms/utils/updateUserData';

let action: CustomerUpdateAction[] = [];

const requestStart = (
  action: CustomerUpdateAction[],
  back: (errorMessage: string) => void,
): void => {
  let message = '';
  customersIdPostExecute(count.ID, count.version, action)
    .then(({ body }) => {
      updateUserData(body);
      back(message);
    })
    .catch(error => {
      message = `ERROR: ${error.message} Should try again later`;
      back(message);
    });
};

export const setDefault = (defoltShip: string, defoltBill: string): void => {
  let action: CustomerUpdateAction[] = [];
  if (defoltShip.length || defoltBill.length) {
    if (defoltShip.length) {
      action.push({
        action: 'setDefaultShippingAddress',
        addressId: defoltShip,
      });
    }
    if (defoltBill.length) {
      action.push({
        action: 'setDefaultBillingAddress',
        addressId: defoltBill,
      });
    }
    const callback = (): void => {};
    if (action.length) {
      requestStart(action, callback);
    }
  }
};

export const editAddressID = (
  newAddress: {
    streetName: string;
    postalCode: string;
    city: string;
    country: string;
  },
  id: string,
  toForm: (errorMessage: string) => void,
): void => {
  if (id) {
    action = [{ action: 'changeAddress', addressId: id, address: newAddress }];
  } else {
    action = [{ action: 'addAddress', address: newAddress }];
  }
  const callback = (errorMessage: string): void => {
    toForm(errorMessage);
  };
  requestStart(action, callback);
};

export const editUserData = (
  UserData: {
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
  },
  toForm: (errorMessage: string) => void,
): void => {
  action = [
    { action: 'changeEmail', email: UserData.email },
    { action: 'setFirstName', firstName: UserData.firstName },
    { action: 'setLastName', lastName: UserData.lastName },
    { action: 'setDateOfBirth', dateOfBirth: UserData.dateOfBirth },
  ];
  const callback = (errorMessage: string): void => {
    toForm(errorMessage);
  };
  requestStart(action, callback);
};

export const newUserPassword = (
  passwordOld: string,
  passwordNew: string,
  toForm: (errorMessage: string) => void,
): void => {
  let message = '';
  newPassword(count.ID, count.version, passwordOld, passwordNew)
    .then(({ body }) => {
      updateUserData(body);
      toForm(message);
    })
    .catch(error => {
      message = `ERROR: ${error.message} Should try again later`;
      toForm(message);
    });
};

export const deledeAddressID = (
  id: string,
  toForm: (errorMessage: string) => void,
): void => {
  action = [{ action: 'removeAddress', addressId: id }];
  const callback = (errorMessage: string): void => {
    toForm(errorMessage);
  };
  requestStart(action, callback);
};

export const customerShippingBilling = (
  customerID: string,
  version: number,
  id: { idShipp: string; idBill: string },
  setBillShipp: boolean[],
): void => {
  let action: CustomerUpdateAction[] = [];
  if (setBillShipp.includes(true)) {
    if (setBillShipp[0]) {
      action.push({ action: 'addShippingAddressId', addressId: id.idShipp });
    }
    if (setBillShipp[1]) {
      action.push({ action: 'addBillingAddressId', addressId: id.idShipp });
    }
    if (setBillShipp[2]) {
      action.push({ action: 'addBillingAddressId', addressId: id.idBill });
    }
  }

  if (setBillShipp.includes(true)) {
    customersIdPostExecute(customerID, version, action)
      .then(({ body }) => {
        updateUserData(body);
      })
      .catch(console.error);
  }
};
