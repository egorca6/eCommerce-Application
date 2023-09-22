import { newCustomerData } from '../../../constants/registratForm';
import { IRegistrationForm, IAddresses } from '../../../types/interface';
import { logIn, userAge } from '../../../utils/user';

let newAddress: IAddresses[] = [
  {
    country: '',
    city: '',
    postalCode: '',
    streetName: '',
  },
];
export let setBillShipp = [false, false, false];
export const takeDataForm = (
  dataForm: IRegistrationForm,
  address0: boolean,
  address1: boolean,
  checkedOneAddress: boolean,
): void => {
  delete newCustomerData.defaultShippingAddress;
  delete newCustomerData.defaultBillingAddress;
  if (dataForm.dateOfBirth) {
    dataForm.dateOfBirth = userAge(dataForm);
  } else {
    dataForm.dateOfBirth = '';
  }

  if (checkedOneAddress) {
    newAddress = dataForm.address.slice(0, 1);
    if (address0) {
      if (address1) {
        newCustomerData['defaultShippingAddress'] = 0;
        newCustomerData['defaultBillingAddress'] = 0;
        setBillShipp = [false, false, false];
      } else {
        newCustomerData['defaultShippingAddress'] = 0;
        setBillShipp = [false, true, false];
      }
    } else {
      if (address1) {
        newCustomerData['defaultBillingAddress'] = 0;
        setBillShipp = [true, false, false];
      } else {
        setBillShipp = [true, true, false];
      }
    }
  } else {
    newAddress = dataForm.address;
    if (address0) {
      newCustomerData['defaultShippingAddress'] = 0;
      setBillShipp = [false, false, true];
    } else {
      setBillShipp = [true, false, true];
    }
    if (address1) {
      newCustomerData['defaultBillingAddress'] = 1;
      setBillShipp[2] = false;
    }
  }
  newCustomerData.firstName = dataForm.firstName;
  newCustomerData.lastName = dataForm.lastName;
  newCustomerData.email = dataForm.email;
  newCustomerData.password = dataForm.password;
  newCustomerData.dateOfBirth = dataForm.dateOfBirth;
  newCustomerData.addresses = newAddress;
};
