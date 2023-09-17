import { Toast } from 'primereact/toast';
import { RefObject, useRef } from 'react';
import {
  LIFE_TIME_MESSAGE,
  SUCCESS_MESSAGE,
  WARN_MESSAGE,
} from '../constants/product';

export const usePopUpMessage = (
  hasProductInCart: boolean,
): (RefObject<Toast> | ((message: string) => void))[] => {
  const messagePopUp = useRef<Toast>(null);

  const setPopUpMessage = (message: string): void => {
    messagePopUp.current?.show({
      severity: hasProductInCart ? SUCCESS_MESSAGE : WARN_MESSAGE,
      detail: message,
      life: LIFE_TIME_MESSAGE,
    });
  };
  return [messagePopUp, setPopUpMessage];
};
