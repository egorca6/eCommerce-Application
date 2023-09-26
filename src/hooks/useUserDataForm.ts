import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { getCustomerID } from '../api/customers';
import { editUserData } from '../api/requestAddress';
import { updateUserData } from '../components/Forms/utils/updateUserData';
import { isOldEnough } from '../components/Forms/utils/validRegisterData';
import { EMAIL_ERROR, NAME_ERROR } from '../constants/errors';
import { REG_EXP_EMAIL, REG_EXP_NAME } from '../constants/regEx';
import { count, userData } from '../constants/registratForm';
import { UserDataFormReturn } from '../types/hooks';
import { IUserData } from '../types/interface';
import * as yup from 'yup';

export const useUserDataForm = (): UserDataFormReturn => {
  let messageUser = '';
  let asyncRender = async (): Promise<void> => {};

  const form = useForm({
    mode: 'onBlur',
    resolver: yupResolver(
      yup.object().shape({
        email: yup
          .string()
          .email()
          .matches(REG_EXP_EMAIL.emailValid, EMAIL_ERROR.error)
          .required(),
        firstName: yup
          .string()
          .min(NAME_ERROR.minLength, NAME_ERROR.minLengthText)
          .matches(
            REG_EXP_NAME.noSpecialCharacters,
            NAME_ERROR.noSpecialCharacters,
          )
          .required(),
        lastName: yup
          .string()
          .min(NAME_ERROR.minLength, NAME_ERROR.minLengthText)
          .matches(
            REG_EXP_NAME.noSpecialCharacters,
            NAME_ERROR.noSpecialCharacters,
          )
          .required(),
        dateOfBirth: yup
          .string()
          .required()
          .test('isOldEnough', 'You must be over 13', isOldEnough),
      }),
    ),
    defaultValues: {
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      dateOfBirth: userData.dateOfBirth,
    },
  });

  if (count.switchRenderUserData) {
    const id = localStorage.getItem('id');
    if (id) count.ID = id;
    if (count.ID) {
      asyncRender = async (): Promise<void> => {
        await getCustomerID(count.ID)
          .then(({ body }) => {
            updateUserData(body);
          })
          .catch(console.error);
        form.setValue('email', userData.email);
        form.setValue('firstName', userData.firstName);
        form.setValue('lastName', userData.lastName);
        form.setValue('dateOfBirth', userData.dateOfBirth);
      };
      asyncRender();
      count.switchRenderUserData = false;
    }
  }

  const closeForm = (errorMessage: string): void => {
    if (errorMessage !== '') {
      messageUser = errorMessage;
    } else {
      messageUser = 'Your Password has been successfully saved';
    }
    setVisible(true);
  };
  const [visible, setVisible] = useState<boolean>(false);
  const [visiblePasswordForm, setvisiblePasswordForm] = useState(false);
  const onSubmit: SubmitHandler<IUserData> = (data: IUserData): void => {
    count.switchRenderUserData = true;
    const callback = (errorMessage: string): void => {
      asyncRender();
      if (errorMessage !== '') {
        messageUser = errorMessage;
      } else {
        messageUser = 'Your data has been successfully saved';
      }
      setVisible(true);
    };
    editUserData(data, callback);
  };

  return {
    form,
    messageUser,
    closeForm,
    visible,
    setVisible,
    visiblePasswordForm,
    setvisiblePasswordForm,
    onSubmit,
  };
};
