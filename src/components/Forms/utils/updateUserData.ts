import { Customer } from '@commercetools/platform-sdk';
import { count, newAddres, userData } from '../../../constants/registratForm';
import { IAddress } from '../../../types/interface';

export const updateUserData = (body: Customer): void => {
  count.version = body.version;
  count.ID = body.id;

  count.defaultShipping =
    body.defaultShippingAddressId !== undefined
      ? body.defaultShippingAddressId
      : '';
  count.defaultBilling =
    body.defaultBillingAddressId !== undefined
      ? body.defaultBillingAddressId
      : '';
  const addreses = body.addresses as IAddress[];
  newAddres.splice(0);
  addreses.forEach((addres, i) => {
    newAddres.push(addres);
  });

  userData.email = body.email;
  userData.firstName = body.firstName !== undefined ? body.firstName : '';
  userData.lastName = body.lastName !== undefined ? body.lastName : '';
  userData.dateOfBirth = body.dateOfBirth !== undefined ? body.dateOfBirth : '';
};
