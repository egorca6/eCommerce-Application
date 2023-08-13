export interface IAddress {
  country: string;
  city: string;
  street: string;
  house: string;
}

export interface IFormFields {
  email?: string;
  password?: string;
  name: string;
  surname: string;
  dateBirth: Date | string;
  street: string;
  city: string;
  postcode: string;
  country: string;
}

export interface IOption {
  value: string;
  label: string;
}

export interface ICountriesData {
  name: string;
  code: string;
}

export const countriesData: ICountriesData[] = [
  { name: 'Australia (AU)', code: '9999' },
  { name: 'Belarus (BY)', code: '999999' },
  { name: 'Brazil (BR)', code: '99999-999' },
  { name: 'Canada (CA)', code: 'a9a' },
  { name: 'Luxembourg (LU)', code: 'L-9999' },
  { name: 'Moldova (MD)', code: 'MD-9999' },
  { name: 'Poland (PL)', code: '99-999' },
  { name: 'Portugal (PT)', code: '9999-999' },
  { name: 'Russian Federation (RU)', code: '999999' },
  { name: 'Ukraine (UA)', code: '99999' },
  { name: 'United Kingdom (GB)', code: 'aa99' },
  { name: 'United States (US)', code: '99999' },
];
