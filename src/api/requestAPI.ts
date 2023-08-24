import { CustomerUpdateAction } from '@commercetools/platform-sdk';
import { customersIdPostExecute } from './Client';
import { count } from '../constants/registratForm';

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
        count.version = body.version;
      })
      .catch(console.error);
  }
};
