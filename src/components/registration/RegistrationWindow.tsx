import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { useNavigate } from 'react-router-dom';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { InputMask, InputMaskChangeEvent } from 'primereact/inputmask';
import { countriesData, IFormFields } from './Interfase';
import './_registration.scss';

let postCod: string = '_____';

export const RegistrationWindow = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormFields>({
    mode: 'onBlur',
  });
  const [value, setValue] = useState<string>('');

  interface Country {
    name: string;
    code: string;
  }
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const countries: Country[] = countriesData;
  const SignInPage = useNavigate();

  const onSubmit: SubmitHandler<IFormFields> = (data: IFormFields): void => {
    data.dateBirth =
      typeof data.dateBirth !== 'string'
        ? data.dateBirth.toLocaleDateString().replace(/\./g, '/')
        : '';
    data.postcode = value;
    console.log(JSON.stringify(data));
    SignInPage('/signin');
  };

  return (
    <div className="registration__page content">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-column">
        <label htmlFor="username" className="registration_span">
          Email
        </label>
        <InputText
          className="mb-1"
          {...register('email', {
            value: 'ggggg@mail.ru',
            required: 'Required to fill',
            minLength: {
              value: 5,
              message: 'Minimum 5 characters',
            },
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: 'Incorrect email',
            },
          })}
          type="text"
          placeholder="Enter your email"
        />
        <Message
          className={
            ((errors?.email?.message as string) && 'h-1rem') || 'hidden'
          }
          severity={'error'}
          text={errors?.email?.message as string}
        />
        <label htmlFor="username" className="registration_span">
          Password
        </label>
        <InputText
          className="mb-1"
          {...register('password', {
            value: 'gggg99999',
            required: 'Required to fill',
            minLength: {
              value: 4,
              message: 'Minimum 8 characters',
            },
            maxLength: {
              value: 20,
              message: 'Maximum 20 characters',
            },
          })}
          type="password"
          placeholder="Enter your password"
          autoComplete="on"
        />
        <Message
          className={
            ((errors?.password?.message as string) && 'h-1rem') || 'hidden'
          }
          severity={'error'}
          text={errors?.password?.message as string}
        />
        <label htmlFor="username" className="registration_span">
          Name
        </label>
        <InputText
          className="mb-1"
          {...register('name', {
            required: 'Хоть одну букву введите',
            pattern: {
              value: /^[A-Za-zА-ЯЁа-яё]+$/,
              message: 'Говорили вводим буквы',
            },
          })}
          placeholder="name"
        />
        {errors?.name && (
          <div style={{ color: 'red', marginBottom: 10 }}>
            {errors.name.message}
          </div>
        )}
        <label htmlFor="username" className="registration_span">
          Surname
        </label>
        <InputText
          className="mb-1"
          {...register('surname', {
            required: 'Хоть одну букву введите',
            pattern: {
              value: /^[A-Za-zА-ЯЁа-яё]+$/,
              message: 'Говорили вводим буквы',
            },
          })}
          placeholder="surname"
        />
        {errors?.surname && (
          <div style={{ color: 'red', marginBottom: 10 }}>
            {errors.surname.message}
          </div>
        )}
        <label htmlFor="username" className="registration_span">
          Date of Birth
        </label>
        <div>
          <InputText
            className="w-full md:w-14rem"
            type={'date'}
            {...register('dateBirth', {
              valueAsDate: true,
              validate: {
                volue: (value, formValues) =>
                  Date.now() - +value > 409968000000,
              },
            })}
          />
          {errors?.dateBirth && (
            <div style={{ color: 'red', marginBottom: 10 }}>
              Детям до 13 лет и еще не рожденным вход запрещен
            </div>
          )}
        </div>
        <label htmlFor="username" className="registration_span">
          Street
        </label>
        <InputText
          className="mb-1"
          {...register('street', {
            required: 'Что нибудь введите',
          })}
          placeholder="street"
        />
        {errors?.street && (
          <div style={{ color: 'red', marginBottom: 10 }}>
            {errors.street.message}
          </div>
        )}
        <label htmlFor="username" className="registration_span">
          City
        </label>
        <InputText
          className="mb-1"
          {...register('city', {
            required: 'Хоть одну букву введите',
            pattern: {
              value: /^[A-Za-zА-ЯЁа-яё]+$/,
              message: 'Говорили вводим буквы',
            },
          })}
          placeholder="city"
        />
        {errors?.city && (
          <div style={{ color: 'red', marginBottom: 10 }}>
            {errors.city.message}
          </div>
        )}
        <label htmlFor="username" className="registration_span">
          Countries
        </label>
        <div className="mb-1">
          <Dropdown
            {...register('country', {})}
            value={selectedCountry}
            onChange={(e: DropdownChangeEvent): void => {
              setSelectedCountry(e.value);
              postCod = e.value.code;
            }}
            options={countries}
            optionLabel="name"
            placeholder="Select a Country"
            className="w-full md:w-14rem"
          />
        </div>

        <label htmlFor="serial" className="registration_span">
          Postcode (example = {postCod})
        </label>
        <div className="mb-1">
          <InputMask
            value={value}
            onChange={(e: InputMaskChangeEvent): void => {
              if (e.target.value) {
                setValue(e.target.value);
              }
            }}
            // disabled
            mask={postCod}
            placeholder={postCod}
          />
        </div>
        <Button
          className="mt-3 mb-8"
          label="Registration"
          type="submit"
          disabled={!isValid}
        />
      </form>
    </div>
  );
};
export default RegistrationWindow;
