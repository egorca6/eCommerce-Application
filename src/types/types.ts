import { Dispatch, SetStateAction } from 'react';

export type IAuth = {
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
};

export type CategoryProduct = {
  name: string;
  id: string;
};

export type FilterParams = {
  name: string;
  value: string;
};

export type ErrMessage = {
  toBack: (errorMessage: string) => void;
};

export type VoidFunction = {
  create: () => void;
};
