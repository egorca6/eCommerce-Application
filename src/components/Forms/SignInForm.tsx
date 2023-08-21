import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { InputText } from 'primereact/inputtext';
import { useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { clientSignIn } from '../../api/Client';
import { STATUS_OK } from '../../constants/api';
import { AUTHENTICATE_ERROR } from '../../constants/errors';
import { SignInForm } from '../../interface/interface';
import { yupResolver } from '@hookform/resolvers/yup';
import { validAuthData } from '../../utils/validAuthData';
import { AuthContext } from '../authProvider';
import { logIn } from '../../utils/utils';
import { ErrorMessage } from '../ErrorMessage';

export const FormSingIn = (): JSX.Element => {
  const { setIsAuth } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignInForm>({
    mode: 'onChange',
    resolver: yupResolver(validAuthData),
  });

  const [checked, setChecked] = useState(false);
  const isValidUser = useNavigate();

  const onSubmit: SubmitHandler<SignInForm> = (data): void => {
    clientSignIn(data)
      .execute()
      .then(data => {
        if (data.statusCode === STATUS_OK) {
          setIsAuth(true);
          logIn(data);
          isValidUser('/');
        }
      })
      .catch(() =>
        setError('email', {
          type: 'manual',
          message: AUTHENTICATE_ERROR,
        }),
      );
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-column">
        <InputText
          className="mb-1 border-round-lg"
          {...register('email')}
          type="text"
          placeholder="Enter your email"
        />
        <ErrorMessage err={errors} name={'email'} />

        <div className="p-inputgroup">
          <InputText
            className="mt-5 mb-1"
            style={{
              borderTopLeftRadius: '0.5rem',
              borderBottomLeftRadius: '0.5rem',
            }}
            {...register('password')}
            type={!checked ? 'password' : 'text'}
            placeholder="Enter your password"
            autoComplete="off"
          />
          <span
            className="p-inputgroup-addon mt-5 mb-1"
            style={{
              borderTopRightRadius: '0.5rem',
              borderBottomRightRadius: '0.5rem',
            }}>
            <Checkbox
              checked={checked}
              onChange={(): void => setChecked(!checked)}
            />
          </span>
        </div>
        <ErrorMessage err={errors} name={'password'} />

        <Button
          className="mt-6 mb-5 border-round-lg"
          label="Sign In"
          type="submit"
        />
      </form>
    </>
  );
};
