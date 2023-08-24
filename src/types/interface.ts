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
