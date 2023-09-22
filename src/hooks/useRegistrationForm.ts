import { yupResolver } from '@hookform/resolvers/yup';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { takeDataForm } from '../components/Forms/utils/takeDataForm';
import {
  addressSchema,
  isOldEnough,
} from '../components/Forms/utils/validRegisterData';
import { countriesData } from '../constants/registratForm';
import { ICountriesData, IRegistrationForm } from '../types/interface';
import { VoidFunction } from '../types/types';
import * as yup from 'yup';
import { EMAIL_ERROR, NAME_ERROR, PASSWORD_ERROR } from '../constants/errors';
import {
  REG_EXP_EMAIL,
  REG_EXP_NAME,
  REG_EXP_PASSWORD,
} from '../constants/regEx';

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

export const useRegistrationForm = (
  props: VoidFunction,
): RegistrationFormReturn => {
  const form = useForm({
    mode: 'onBlur',
    resolver: yupResolver(
      yup.object().shape({
        email: yup
          .string()
          .email()
          .matches(REG_EXP_EMAIL.emailValid, EMAIL_ERROR.error)
          .required(),
        password: yup
          .string()
          .min(PASSWORD_ERROR.minLength, PASSWORD_ERROR.minLengthText)
          .max(PASSWORD_ERROR.maxLength, PASSWORD_ERROR.maxLengthText)
          .matches(REG_EXP_PASSWORD.oneNumber, PASSWORD_ERROR.oneNumber)
          .matches(REG_EXP_PASSWORD.oneUpperCase, PASSWORD_ERROR.oneUpperCase)
          .matches(REG_EXP_PASSWORD.oneLowerCase, PASSWORD_ERROR.oneLowerCase)
          .matches(REG_EXP_PASSWORD.leadingSpace, PASSWORD_ERROR.leadingSpace)
          .matches(REG_EXP_PASSWORD.trailingSpace, PASSWORD_ERROR.trailingSpace)
          .matches(REG_EXP_PASSWORD.latinLetters, PASSWORD_ERROR.latinLetters)
          .required(),
        firstName: yup
          .string()
          .min(NAME_ERROR.minLength, NAME_ERROR.minLengthText)
          .matches(
            REG_EXP_NAME.noSpecialCharacters,
            NAME_ERROR.noSpecialCharacters,
          )
          .required(),
        lastName: yup
          .string()
          .min(NAME_ERROR.minLength, NAME_ERROR.minLengthText)
          .matches(
            REG_EXP_NAME.noSpecialCharacters,
            NAME_ERROR.noSpecialCharacters,
          )
          .required(),
        dateOfBirth: yup
          .string()
          .required()
          .test('isOldEnough', 'You must be over 13', isOldEnough),
        address: yup.array().of(addressSchema).required(),
      }),
    ),
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
};
