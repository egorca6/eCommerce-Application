import {
  ICountriesData,
  IAddresses,
  IAddress,
  InewCustomerData,
} from '../types/interface';

export const count: { version: number; ID: string } = {
  version: 0,
  ID: '',
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
