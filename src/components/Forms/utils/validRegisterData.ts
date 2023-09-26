import { object, string } from 'yup';
import { NAME_ERROR, POST_CODE_ERROR } from '../../../constants/errors';
import { REG_EXP_NAME, REG_EXP_POST_CODE } from '../../../constants/regEx';

export const isOldEnough = (value: Date | string): boolean => {
  const currentDate = new Date();
  const thirteenYearsAgo = new Date();
  thirteenYearsAgo.setFullYear(currentDate.getFullYear() - 13);
  return new Date(value) <= thirteenYearsAgo;
};

export const addressSchema = object().shape({
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
