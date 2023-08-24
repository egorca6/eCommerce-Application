import { array, object, string } from 'yup';
import {
  EMAIL_ERROR,
  NAME_ERROR,
  PASSWORD_ERROR,
  POST_CODE_ERROR,
} from '../../../constants/errors';
import {
  REG_EXP_EMAIL,
  REG_EXP_NAME,
  REG_EXP_PASSWORD,
  REG_EXP_POST_CODE,
} from '../../../constants/regEx';

const isOldEnough = (value: Date | string): boolean => {
  const currentDate = new Date();
  const thirteenYearsAgo = new Date();
  thirteenYearsAgo.setFullYear(currentDate.getFullYear() - 13);
  return new Date(value) <= thirteenYearsAgo;
};

const addressSchema = object().shape({
  country: string().required(NAME_ERROR.emptyString),
  city: string()
    .min(NAME_ERROR.minLength, NAME_ERROR.minLengthText)
    .matches(REG_EXP_NAME.noSpecialCharacters, NAME_ERROR.noSpecialCharacters)
    .required(),
  streetName: string()
    .min(NAME_ERROR.minLength, NAME_ERROR.minLengthText)
    .required(),
  postalCode: string()
    .matches(REG_EXP_POST_CODE.BY_RU_POST, POST_CODE_ERROR.minLengthCode)
    .required(),
});

export const validRegisterData = object().shape({
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
  firstName: string()
    .min(NAME_ERROR.minLength, NAME_ERROR.minLengthText)
    .matches(REG_EXP_NAME.noSpecialCharacters, NAME_ERROR.noSpecialCharacters)
    .required(),
  lastName: string()
    .min(NAME_ERROR.minLength, NAME_ERROR.minLengthText)
    .matches(REG_EXP_NAME.noSpecialCharacters, NAME_ERROR.noSpecialCharacters)
    .required(),
  dateOfBirth: string()
    .required()
    .test('isOldEnough', 'You must be over 13', isOldEnough),
  address: array().of(addressSchema).required(),
});
