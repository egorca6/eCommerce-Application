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

export interface InewCustomerData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  defaultShippingAddress?: number;
  defaultBillingAddress?: number;
  addresses: IAddresses[];
}

export interface IpropsAddres {
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

export interface IcartItems {
  name: string;
  id: string;
  price: number;
  count: number;
  img: string;
  version: number;
}

export interface IpropsItems {
  value: IcartItems;
  editDataCart: (delet: boolean, sumaItem: number) => void;
}
