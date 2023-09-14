export interface SignInForm {
  email: string;
  password: string;
}

export interface ICountriesData {
  name: string;
  countryCode: string;
}

export interface IAddresses {
  country: string;
  city: string;
  postalCode: string;
  streetName: string;
}

export interface IAddress {
  country: string;
  city: string;
  id: string;
  postalCode: string;
  streetName: string;
}

export interface IRegistrationForm {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  address: IAddresses[];
}

export interface INewCustomerData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  defaultShippingAddress?: number;
  defaultBillingAddress?: number;
  addresses: IAddresses[];
}

export interface IPropsAddress {
  value: IAddress;
  toDo: string;
  closeForm: (errorMessage: string) => void;
}

export interface IUserData {
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}

export interface INewPassword {
  passwordOld: string;
  passwordNew: string;
}

export interface ICartItems {
  name: string;
  id: string;
  price: number;
  count: number;
  img: string;
  version: number;
}

export interface IPropsItems {
  value: ICartItems;
  editDataCart: (delet: boolean, sumaItem: number) => void;
}
