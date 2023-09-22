import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import {
  ICountriesData,
  IpropsAddres,
  IAddresses,
} from '../../types/interface';
import { countriesData } from '../../constants/registratForm';
import { addressSchema } from './utils/validRegisterData';
import { ErrorMessage } from './ErrorMessage';
import styles from './AddressForm.module.scss';
import { editAddressID } from '../../api/requestAddress';

export const AddressForm = (props: IpropsAddres): JSX.Element => {
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

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-column">
      <div className={styles.registration_address}>
        <label htmlFor="serial" className={styles.span_head}>
          {nameForm}
        </label>
        <InputText
          className="mb-1 w-full border-round-lg"
          {...form.register('streetName', { value: props.value.streetName })}
          placeholder="Enter your street"
        />
        <ErrorMessage err={form.formState.errors.streetName?.message} />

        <InputText
          className="mb-1 w-full border-round-lg"
          {...form.register('city', { value: props.value.city })}
          placeholder="Enter your city"
        />
        <ErrorMessage err={form.formState.errors.city?.message} />

        <div className="mb-1 w-full">
          <Dropdown
            className="w-full border-round-lg"
            {...form.register('country', { value: countryOld })}
            onChange={(e: DropdownChangeEvent): void => {
              setSelectedCountry(e.value);
            }}
            value={selectedCountry}
            options={countries}
            optionLabel="name"
            placeholder={countryOld}
          />
          <ErrorMessage err={form.formState.errors.country?.message} />
        </div>

        <InputText
          className="mb-1 w-full border-round-lg"
          {...form.register('postalCode', { value: props.value.postalCode })}
          placeholder="Enter your Post-Code"
        />
        <ErrorMessage err={form.formState.errors.postalCode?.message} />
      </div>

      <Button
        className="mt-3 mb-1 border-round-lg"
        label="Save"
        type="submit"
        onClick={(): void => {}}
      />
    </form>
  );
};
export default AddressForm;
