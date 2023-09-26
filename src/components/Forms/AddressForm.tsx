import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { IpropsAddres } from '../../types/interface';
import { ErrorMessage } from './ErrorMessage';
import styles from './AddressForm.module.scss';
import { useAddressForm } from '../../hooks/useAddressForm';

export const AddressForm = (props: IpropsAddres): JSX.Element => {
  const {
    form,
    nameForm,
    countryOld,
    countries,
    onSubmit,
    selectedCountry,
    setSelectedCountry,
  } = useAddressForm(props);

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
            options={countries?.length ? countries : []}
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
