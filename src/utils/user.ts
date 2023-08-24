import {
  ClientResponse,
  CustomerSignInResult,
} from '@commercetools/platform-sdk';
import { IRegistrationForm } from '../types/interface';

export const logOut = (): void => {
  localStorage.removeItem('id');
  localStorage.removeItem('auth');
  localStorage.removeItem('name');
};

export const logIn = (data: ClientResponse<CustomerSignInResult>): void => {
  const userId = data.body.customer.id;
  const userName = data.body.customer.firstName;
  localStorage.setItem('id', userId);
  if (userName) localStorage.setItem('name', userName);
  localStorage.setItem('auth', 'true');
};

export const userAge = (data: IRegistrationForm): string => {
  const userAge = new Date(data.dateOfBirth);
  const userYear = userAge.getFullYear();
  const userMonth = userAge.getMonth() + 1;
  const userDate = userAge.getDate() + 1;
  return `${userYear}-${userMonth}-${userDate}`;
};
