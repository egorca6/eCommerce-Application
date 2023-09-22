import { yupResolver } from '@hookform/resolvers/yup';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { newUserPassword } from '../api/requestAddress';
import { count } from '../constants/registratForm';
import { INewPassword } from '../types/interface';
import { ErrMessage } from '../types/types';
import * as yup from 'yup';
import { PASSWORD_ERROR } from '../constants/errors';
import { REG_EXP_PASSWORD } from '../constants/regEx';

type NewPasswordFormReturn = {
  form: UseFormReturn<{
    passwordOld: string;
    passwordNew: string;
  }>;
  checkedOldPassword: boolean;
  setCheckedOldPassword: Dispatch<SetStateAction<boolean>>;
  checkedNewPassword: boolean;
  setCheckedNewPassword: Dispatch<SetStateAction<boolean>>;
  onSubmit: (data: INewPassword) => void;
};

export const useNewPasswordForm = (
  props: ErrMessage,
): NewPasswordFormReturn => {
  const idStorage = localStorage.getItem('id');
  if (idStorage) count.ID = idStorage;

  const form = useForm({
    mode: 'onBlur',
    resolver: yupResolver(
      yup.object().shape({
        passwordOld: yup
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
        passwordNew: yup
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

  const [checkedOldPassword, setCheckedOldPassword] = useState(false);
  const [checkedNewPassword, setCheckedNewPassword] = useState(false);
  const onSubmit = (data: INewPassword): void => {
    const callback = (errorMessage: string): void => {
      props.toBack(errorMessage);
    };
    newUserPassword(data.passwordOld, data.passwordNew, callback);
  };

  return {
    form,
    checkedOldPassword,
    setCheckedOldPassword,
    checkedNewPassword,
    setCheckedNewPassword,
    onSubmit,
  };
};
