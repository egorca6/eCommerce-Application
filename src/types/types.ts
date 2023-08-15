import { Dispatch, SetStateAction } from 'react';

export type IAuth = {
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
};
