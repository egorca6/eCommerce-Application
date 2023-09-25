import { LineItem } from '@commercetools/platform-sdk';
import { MenuItem } from 'primereact/menuitem';
import { Dispatch, SetStateAction } from 'react';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import {
  IAddresses,
  ICountriesData,
  INewPassword,
  IRegistrationForm,
  IUserData,
  SignInForm,
} from './interface';
import { Image as ImageSDK } from '@commercetools/platform-sdk';

export interface UserDataFormReturn {
  form: UseFormReturn<{
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
  }>;
  messageUser: string;
  closeForm: (errorMessage: string) => void;
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  visiblePasswordForm: boolean;
  setvisiblePasswordForm: Dispatch<SetStateAction<boolean>>;
  onSubmit: SubmitHandler<IUserData>;
}

export interface SignInFormReturn {
  form: UseFormReturn<{
    email: string;
    password: string;
  }>;
  onSubmit: SubmitHandler<SignInForm>;
  checked: boolean;
  setChecked: Dispatch<SetStateAction<boolean>>;
}

export interface RegistrationFormReturn {
  form: UseFormReturn<{
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    address: {
      country: string;
      city: string;
      streetName: string;
      postalCode: string;
    }[];
  }>;
  identicalAddresses: boolean;
  setIdenticalAddresses: Dispatch<SetStateAction<boolean>>;
  checkedPassword: boolean;
  setCheckedPassword: Dispatch<SetStateAction<boolean>>;
  selectedCountry0: ICountriesData | null;
  setSelectedCountry0: Dispatch<SetStateAction<ICountriesData | null>>;
  selectedCountry1: ICountriesData | null;
  setSelectedCountry1: Dispatch<SetStateAction<ICountriesData | null>>;
  countries: ICountriesData[];
  checkedShip: boolean;
  setCheckedShip: Dispatch<SetStateAction<boolean>>;
  checkedBill: boolean;
  setCheckedBill: Dispatch<SetStateAction<boolean>>;
  onSubmit: (data: IRegistrationForm) => void;
}

export interface NewPasswordFormReturn {
  form: UseFormReturn<{
    passwordOld: string;
    passwordNew: string;
  }>;
  checkedOldPassword: boolean;
  setCheckedOldPassword: Dispatch<SetStateAction<boolean>>;
  checkedNewPassword: boolean;
  setCheckedNewPassword: Dispatch<SetStateAction<boolean>>;
  onSubmit: (data: INewPassword) => void;
}

export interface EntryDataFormReturn {
  visible: boolean;
  onOfPoUpForm: () => void;
  setVisible: Dispatch<SetStateAction<boolean>>;
  showSuccessMessage: boolean;
  registrationMessage: string | null;
}

export interface AddressFormReturn {
  form: UseFormReturn<{
    country: string;
    city: string;
    streetName: string;
    postalCode: string;
  }>;
  nameForm: string;
  countryOld: string;
  countries: ICountriesData[] | null;
  onSubmit: SubmitHandler<IAddresses>;
  selectedCountry: ICountriesData | null;
  setSelectedCountry: Dispatch<SetStateAction<ICountriesData | null>>;
}

export interface IUseCartID {
  asyncCartID: () => void;
  isLoading: boolean;
  response: LineItem[];
  error: string;
  version: number;
  sumaCart: number;
}

export interface IUseIsItemInCart {
  isLoading: boolean;
  IsItem: boolean;
  error: string;
}

export interface IuseStartCart {
  isLoading: boolean;
}

export interface BreadCrumbsReturn {
  itemsBreadCrumbs: MenuItem[];
  home: MenuItem;
}

export interface ProductData {
  images: ImageSDK[];
  nameProduct: string;
  descriptionProduct: string;
  typeProduct: string;
  priceProductDiscount: string;
  priceFullProduct: string;
}
