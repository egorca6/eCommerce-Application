import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputSwitch } from 'primereact/inputswitch';
import { ToggleButton, ToggleButtonChangeEvent } from 'primereact/togglebutton';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { ICountriesData, IRegistrationForm } from '../../types/interface';
import { countriesData } from '../../constants/registratForm';
import { takeDataForm } from './EntryDataForm';
import { validRegisterData } from './utils/validRegisterData';
import { ErrorMessage } from '../ErrorMessage';
import { Checkbox } from 'primereact/checkbox';
import styles from './RegistrationForm.module.scss';

let country1 = '';
export const RegistrationForm = (props: {
  create: () => void;
}): JSX.Element => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
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
      ? selectedCountry0.countriCode
      : '';
    data.address[1].country = selectedCountry1
      ? selectedCountry1.countriCode
      : '';
    takeDataForm(data, checkedShip, checkedBill, identicalAddresses);
    props.create();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-column">
      <InputText
        className="mb-1 border-round-lg"
        {...register('email')}
        type="text"
        placeholder="Enter your email"
      />
      <ErrorMessage err={errors} name={'email'} />

      <div className="p-inputgroup mb-1">
        <InputText
          className={styles.input}
          {...register('password')}
          type={!checkedPassword ? 'password' : 'text'}
          placeholder="Enter your password"
          autoComplete="on"
        />
        <span className={(styles.span, 'p-inputgroup-addon')}>
          <Checkbox
            checked={checkedPassword}
            onChange={(): void => setCheckedPassword(!checkedPassword)}
          />
        </span>
      </div>
      <ErrorMessage err={errors} name={'password'} />

      <InputText
        className="mb-1 border-round-lg"
        {...register('firstName')}
        placeholder="Enter your FirstName"
      />
      <ErrorMessage err={errors} name={'firstName'} />

      <InputText
        className="mb-1 border-round-lg"
        {...register('lastName')}
        placeholder="Enter your LastName"
      />
      <ErrorMessage err={errors} name={'lastName'} />

      <label className={styles.registration_span}>Enter your age</label>
      <InputText
        className="mb-1 border-round-lg"
        type={'date'}
        {...register('dateOfBirth', {
          valueAsDate: true,
        })}
      />
      <ErrorMessage err={errors} name={'dateOfBirth'} />

      <div className="flex mt-2">
        <InputSwitch
          className="w-2"
          checked={identicalAddresses}
          onChange={(e): void => setIdenticalAddresses(e.value === true)}
        />
        <p className={styles.text}>
          Click if your billing and shipping addresses match
        </p>
      </div>

      <div className={styles.registration_address}>
        <label htmlFor="serial" className={styles.registration_span}>
          Shipping Address
        </label>
        <InputText
          className="mb-1 w-full border-round-lg"
          {...register('address.0.streetName')}
          placeholder="Enter your street"
        />
        <ErrorMessage err={errors} name={'streetName'} />

        <InputText
          className="mb-1 w-full border-round-lg"
          {...register('address.0.city')}
          placeholder="Enter your city"
        />
        <ErrorMessage err={errors} name={'city'} />

        <div className="mb-1 w-full">
          <Dropdown
            className="w-full border-round-lg"
            {...register('address.0.country')}
            onChange={(e: DropdownChangeEvent): void => {
              setSelectedCountry0(e.value);
            }}
            value={selectedCountry0}
            options={countries}
            optionLabel="name"
            placeholder="Select your Country"
          />
          <ErrorMessage err={errors} name={'country'} />
        </div>

        <InputText
          className="mb-1 w-full border-round-lg"
          {...register('address.0.postalCode')}
          placeholder="Enter your Post-Code"
        />
        <ErrorMessage err={errors} name={'postalCode'} />

        <ToggleButton
          onLabel="Default address"
          offLabel="Default address"
          onIcon="pi pi-check"
          offIcon="pi pi-times"
          checked={checkedShip}
          onChange={(e: ToggleButtonChangeEvent): void =>
            setCheckedShip(e.value)
          }
          className="w-14rem mb-1 mt-1 border-round-lg"
        />
      </div>

      <div
        className={identicalAddresses ? 'hidden' : styles.registration_address}>
        <label htmlFor="serial" className={styles.registration_span}>
          Billing Address
        </label>
        <InputText
          className="mb-1 w-full border-round-lg"
          {...register('address.1.streetName')}
          placeholder="Enter your street"
        />
        <ErrorMessage err={errors} name={'streetName1'} />

        <InputText
          className="mb-1 w-full border-round-lg"
          {...register('address.1.city')}
          placeholder="Enter your city"
        />
        <ErrorMessage err={errors} name={'city1'} />

        <div className="w-full mb-1">
          <Dropdown
            className="w-full border-round-lg"
            {...register('address.1.country')}
            onChange={(e: DropdownChangeEvent): void => {
              setSelectedCountry1(e.value);
            }}
            value={selectedCountry1}
            options={countries}
            optionLabel="name"
            placeholder="Select your Country"
          />
          <ErrorMessage err={errors} name={'country1'} />
        </div>

        <div className="w-full mb-1">
          <InputText
            className="mb-1 w-full border-round-lg"
            {...register('address.1.postalCode')}
            placeholder="Enter your Post-Code"
          />
          <ErrorMessage err={errors} name={'postalCode1'} />
        </div>

        <ToggleButton
          onLabel="Default address"
          offLabel="Default address"
          onIcon="pi pi-check"
          offIcon="pi pi-times"
          checked={checkedBill}
          onChange={(e: ToggleButtonChangeEvent): void =>
            setCheckedBill(e.value)
          }
          className="w-14rem mb-1 mt-1 border-round-lg"
        />
      </div>

      <Button
        className="mt-3 mb-1 border-round-lg"
        label="Registration"
        type="submit"
        onClick={(): void => {
          if (identicalAddresses) {
            setValue('address.1.streetName', 'a');
            setValue('address.1.city', 'b');
            setValue('address.1.country', 'BY');
            setValue('address.1.postalCode', '123456');
          }
        }}
      />
    </form>
  );
};
export default RegistrationForm;
