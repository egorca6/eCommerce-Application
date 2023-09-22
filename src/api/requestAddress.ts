import { count } from '../constants/registratForm';
import { CustomerUpdateAction } from '@commercetools/platform-sdk';
import { customersIdPostExecute, newPassword } from './customers';
import { updateUserData } from '../components/Forms/utils/updateUserData';

let action: CustomerUpdateAction[] = [];

const requestStart = (
  action: CustomerUpdateAction[],
  back: (errorMessage: string) => void,
): void => {
  let errorMessage = '';
  customersIdPostExecute(count.ID, count.version, action)
    .then(({ body }) => {
      updateUserData(body);
    })
    .catch(error => {
      if (error.code === 400) {
        errorMessage = `ERROR: ${error.message}`;
      } else {
        errorMessage = `ERROR: ${error.message}  Should try again later`;
      }
    })
    .finally(() => {
      back(errorMessage);
    });
};

export const setDefault = (defoltShip: string, defoltBill: string): void => {
  let action: CustomerUpdateAction[] = [];
  if (defoltShip.length > 0 || defoltBill.length > 0) {
    if (defoltShip.length > 0) {
      action.push({
        action: 'setDefaultShippingAddress',
        addressId: defoltShip,
      });
    }
    if (defoltBill.length > 0) {
      action.push({
        action: 'setDefaultBillingAddress',
        addressId: defoltBill,
      });
    }
    const callback = (): void => {};
    if (action.length > 0) {
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
  let errorMessage = '';
  newPassword(count.ID, count.version, passwordOld, passwordNew)
    .then(({ body }) => {
      updateUserData(body);
    })
    .catch(error => {
      if (error.code === 400) {
        errorMessage = `ERROR: ${error.message}`;
      } else {
        errorMessage = `ERROR: ${error.message}  Should try again later`;
      }
    })
    .finally(() => {
      toForm(errorMessage);
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
