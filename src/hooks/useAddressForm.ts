import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { editAddressID } from '../api/requestAddress';
import { countriesData } from '../constants/registratForm';
import { IAddresses, ICountriesData, IpropsAddres } from '../types/interface';
import { addressSchema } from '../components/Forms/utils/validRegisterData';
import { AddressFormReturn } from '../types/hooks';

export const useAddressForm = (props: IpropsAddres): AddressFormReturn => {
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
};
