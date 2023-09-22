import { object, string } from 'yup';
import { EMAIL_ERROR, PASSWORD_ERROR } from '../../../constants/errors';
import { REG_EXP_EMAIL, REG_EXP_PASSWORD } from '../../../constants/regEx';

export const validAuthData = object().shape({
  email: string()
    .email()
    .matches(REG_EXP_EMAIL.emailValid, EMAIL_ERROR.error)
    .required(),
  password: string()
    .min(PASSWORD_ERROR.minLength, PASSWORD_ERROR.minLengthText)
    .max(PASSWORD_ERROR.maxLength, PASSWORD_ERROR.maxLengthText)
    .matches(REG_EXP_PASSWORD.oneNumber, PASSWORD_ERROR.oneNumber)
    .matches(REG_EXP_PASSWORD.oneUpperCase, PASSWORD_ERROR.oneUpperCase)
    .matches(REG_EXP_PASSWORD.oneLowerCase, PASSWORD_ERROR.oneLowerCase)
    .matches(REG_EXP_PASSWORD.leadingSpace, PASSWORD_ERROR.leadingSpace)
    .matches(REG_EXP_PASSWORD.trailingSpace, PASSWORD_ERROR.trailingSpace)
    .matches(REG_EXP_PASSWORD.latinLetters, PASSWORD_ERROR.latinLetters)
    .required(),
});
