import { yupResolver } from '@hookform/resolvers/yup';
import { Dispatch, SetStateAction, useState } from 'react';
import { SubmitHandler, useForm, UseFormReturn } from 'react-hook-form';
import { editAddressID } from '../api/requestAddress';
import { addressSchema } from '../components/Forms/utils/validRegisterData';
import { countriesData } from '../constants/registratForm';
import { IAddresses, ICountriesData, IpropsAddres } from '../types/interface';

type AddressFormReturn = {
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
};

export function useAddressForm(props: IpropsAddres): AddressFormReturn {
  const form = useForm({
    mode: 'onBlur',
    resolver: yupResolver(addressSchema),
  });

  const nameForm = props.toDo === 'Add' ? 'New Address' : 'Edit Address';
  const countryOld =
    props.value.country === 'RU' ? 'Russian Federation (RU)' : 'Belarus (BY)';
  const [selectedCountry, setSelectedCountry] = useState<ICountriesData | null>(
    null,
  );
  const countries: ICountriesData[] = countriesData;

  const onSubmit: SubmitHandler<IAddresses> = (data: IAddresses): void => {
    data.country = selectedCountry
      ? selectedCountry.countryCode
      : props.value.country;
    const callback = (errorMessage: string): void => {
      if (errorMessage === '') {
        errorMessage =
          props.toDo === 'Add'
            ? 'Address added successfully'
            : 'Address changed successfully';
      }
      props.closeForm(errorMessage);
    };
    if (props.toDo === 'Add') {
      editAddressID(data, '', callback);
    } else {
      editAddressID(data, props.value.id, callback);
    }
  };

  return {
    form,
    nameForm,
    countryOld,
    countries,
    onSubmit,
    selectedCountry,
    setSelectedCountry,
  };
}
