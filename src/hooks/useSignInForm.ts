import { yupResolver } from '@hookform/resolvers/yup';
import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { SubmitHandler, useForm, UseFormReturn } from 'react-hook-form';
import { AuthContext } from '../components/authProvider';
import * as yup from 'yup';
import { REG_EXP_EMAIL, REG_EXP_PASSWORD } from '../constants/regEx';
import {
  AUTHENTICATE_ERROR,
  EMAIL_ERROR,
  PASSWORD_ERROR,
} from '../constants/errors';
import { useNavigate } from 'react-router';
import { SignInForm } from '../types/interface';
import { count } from '../constants/registratForm';
import { clientSignIn } from '../api/customers';
import { STATUS_OK } from '../constants/api';
import {
  asyncCartDeleteAnonim,
  cartCustomDraft,
} from '../components/Cart/useItemCart';
import { logIn } from '../utils/user';
import { PAGES } from '../constants/pages';

type SignInFormReturn = {
  form: UseFormReturn<{
    email: string;
    password: string;
  }>;
  onSubmit: SubmitHandler<SignInForm>;
  checked: boolean;
  setChecked: Dispatch<SetStateAction<boolean>>;
};

export const useSignInForm = (): SignInFormReturn => {
  const { setIsAuth } = useContext(AuthContext);

  const form = useForm({
    mode: 'onChange',
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
      }),
    ),
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

  return { form, onSubmit, checked, setChecked };
};
