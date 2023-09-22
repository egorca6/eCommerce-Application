import { yupResolver } from '@hookform/resolvers/yup';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { newUserPassword } from '../api/requestAddress';
import { validPasswordForm } from '../components/Forms/utils/validRegisterData';
import { count } from '../constants/registratForm';
import { INewPassword } from '../types/interface';
import { ErrMessage } from '../types/types';

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

export function useNewPasswordForm(props: ErrMessage): NewPasswordFormReturn {
  const idStorage = localStorage.getItem('id');
  if (idStorage) count.ID = idStorage;

  const form = useForm({
    mode: 'onBlur',
    resolver: yupResolver(validPasswordForm),
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
}
