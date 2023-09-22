import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { InputText } from 'primereact/inputtext';
import { useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { clientSignIn } from '../../api/customers';
import { STATUS_OK } from '../../constants/api';
import { AUTHENTICATE_ERROR } from '../../constants/errors';
import { SignInForm } from '../../types/interface';
import { yupResolver } from '@hookform/resolvers/yup';
import { validAuthData } from './utils/validAuthData';
import { AuthContext } from '../authProvider';
import { logIn } from '../../utils/user';
import { ErrorMessage } from './ErrorMessage';
import styles from './SignInForm.module.scss';
import { PAGES } from '../../constants/pages';
import { count } from '../../constants/registratForm';
import { asyncCartDeleteAnonim, cartCustomDraft } from '../Cart/useItemCart';

export const FormSingIn = (): JSX.Element => {
  const { setIsAuth } = useContext(AuthContext);
  const form = useForm<SignInForm>({
    mode: 'onChange',
    resolver: yupResolver(validAuthData),
  });

  const [checked, setChecked] = useState(false);
  const isValidUser = useNavigate();

  const onSubmit: SubmitHandler<SignInForm> = (data): void => {
    count.email = data.email;
    count.password = data.password;
    count.switchApiRoot = false;

    clientSignIn(data, count.cartID)
      .execute()
      .then(data => {
        if (data.statusCode === STATUS_OK) {
          if (count.cartAnonymID) {
            asyncCartDeleteAnonim();
            count.cartAnonymID = '';
          }
          cartCustomDraft(data.body.customer.id);
          count.cartID = data.body.cart?.id || '';
          count.versionCart = data.body.cart?.version || 1;

          setIsAuth(true);
          logIn(data);
          isValidUser(PAGES.main.route);
        }
      })
      .catch(() =>
        form.setError('email', {
          type: 'manual',
          message: AUTHENTICATE_ERROR,
        }),
      );
  };

  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-column">
        <InputText
          className="mb-1 border-round-lg"
          {...form.register('email')}
          type="text"
          placeholder="Enter your email"
        />
        <ErrorMessage err={form.formState.errors.email?.message} />

        <div className="p-inputgroup">
          <InputText
            className={(styles.input, 'mt-5 mb-1')}
            {...form.register('password')}
            type={!checked ? 'password' : 'text'}
            placeholder="Enter your password"
            autoComplete="off"
          />
          <span className={(styles.span, 'p-inputgroup-addon mt-5 mb-1')}>
            <Checkbox
              checked={checked}
              onChange={(): void => setChecked(!checked)}
            />
          </span>
        </div>
        <ErrorMessage err={form.formState.errors.password?.message} />

        <Button
          className="mt-6 mb-5 border-round-lg"
          label="Sign In"
          type="submit"
        />
      </form>
    </>
  );
};
