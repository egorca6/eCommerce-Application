import { yupResolver } from '@hookform/resolvers/yup';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { takeDataForm } from '../components/Forms/utils/takeDataForm';
import { validRegisterData } from '../components/Forms/utils/validRegisterData';
import { countriesData } from '../constants/registratForm';
import { ICountriesData, IRegistrationForm } from '../types/interface';
import { VoidFunction } from '../types/types';

type RegistrationFormReturn = {
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
};

export function useRegistrationForm(
  props: VoidFunction,
): RegistrationFormReturn {
  const form = useForm({
    mode: 'onBlur',
    resolver: yupResolver(validRegisterData),
  });
  const [identicalAddresses, setIdenticalAddresses] = useState(false);
  const [checkedPassword, setCheckedPassword] = useState(false);

  const [selectedCountry0, setSelectedCountry0] =
    useState<ICountriesData | null>(null);
  const [selectedCountry1, setSelectedCountry1] =
    useState<ICountriesData | null>(null);
  const countries: ICountriesData[] = countriesData;
  const [checkedShip, setCheckedShip] = useState<boolean>(false);
  const [checkedBill, setCheckedBill] = useState<boolean>(false);

  const onSubmit = (data: IRegistrationForm): void => {
    data.address[0].country = selectedCountry0
      ? selectedCountry0.countryCode
      : '';
    data.address[1].country = selectedCountry1
      ? selectedCountry1.countryCode
      : '';
    takeDataForm(data, checkedShip, checkedBill, identicalAddresses);
    props.create();
  };

  return {
    form,
    identicalAddresses,
    setIdenticalAddresses,
    checkedPassword,
    setCheckedPassword,
    selectedCountry0,
    setSelectedCountry0,
    selectedCountry1,
    setSelectedCountry1,
    countries,
    checkedShip,
    setCheckedShip,
    checkedBill,
    setCheckedBill,
    onSubmit,
  };
}
