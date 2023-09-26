import {
  ICountriesData,
  IAddresses,
  IAddress,
  InewCustomerData,
  IUserData,
} from '../types/interface';

export const count: {
  version: number;
  ID: string;
  email: string;
  password: string;
  defaultShipping: string;
  defaultBilling: string;
  versionAnonymCart: number;
  versionCart: number;
  switchRender: boolean;
  switchRenderUserData: boolean;
  switchRenderStartCart: boolean;
  switchApiRoot: boolean;
  cartID: string;
  cartAnonymID: string;
  productId: string;
  productItemId: string;
  errors: string;
} = {
  version: 1,
  ID: '',
  email: '',
  password: '',
  defaultShipping: '',
  defaultBilling: '',
  versionCart: 1,
  versionAnonymCart: 1,
  switchRender: true,
  switchRenderUserData: true,
  switchRenderStartCart: true,
  switchApiRoot: true,
  cartID: '',
  cartAnonymID: '',
  productId: '',
  productItemId: '',
  errors: '',
};

export let newAddress: IAddresses[] = [
  {
    country: '',
    city: '',
    postalCode: '',
    streetName: '',
  },
];

export let newAddres: IAddress[] = [
  {
    country: '',
    city: '',
    id: '',
    postalCode: '',
    streetName: '',
  },
];

export const newCustomerData: InewCustomerData = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  addresses: newAddress,
};

export const countriesData: ICountriesData[] = [
  { name: 'Belarus (BY)', countryCode: 'BY' },
  { name: 'Russian Federation (RU)', countryCode: 'RU' },
];

export let userData: IUserData = {
  email: '',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
};
