import { LineItem } from '@commercetools/platform-sdk';
import { Toast } from 'primereact/toast';
import {
  Dispatch,
  MutableRefObject,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { cartData } from '../components/Cart/CartList';
import { useCartID } from './useCart';
import { count } from '../constants/registratForm';
import { IUseCartID } from '../types/hooks';
import { asyncDeleteAllProductForCartID } from '../api/cart';

let sumaCart = 0;
export const useCartList = (props: {
  onOffForm: object;
}): {
  visibleCartList: {};
  itemCart: IUseCartID;
  itemsCart: LineItem[];
  editData: (delet: boolean, sumaItem: number) => void;
  sumCart: number;
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  toast: RefObject<Toast>;
  accept: () => void;
  reject: () => void;
  buttonEl: MutableRefObject<null>;
  visibleError: boolean;
  setVisibleError: Dispatch<SetStateAction<boolean>>;
} => {
  const [visibleCartList] = useState(props.onOffForm);
  const [itemsCart] = useState(cartData);
  const [sumCart, setSumCart] = useState(0);
  const [visibleError, setVisibleError] = useState<boolean>(false);
  const [deletItem, setDeletItem] = useState(false);

  const itemCart = useCartID(count.cartID);

  count.versionCart = itemCart.version;
  const editData = (delet: boolean, sumaItem: number): void => {
    setDeletItem(delet);
    sumaCart = sumaItem;
    if (count.errors) {
      setVisibleError(true);
    }
  };

  const [visible, setVisible] = useState<boolean>(false);
  const toast = useRef<Toast>(null);
  const buttonEl = useRef(null);

  const accept = (): void => {
    setTimeout((): void => {
      asyncDeleteAllProductForCartID(editData);
    }, 2000);

    toast.current?.show({
      severity: 'info',
      summary: 'Confirmed',
      detail:
        'The cart has been deleted. What is money more important than pleasure?',
      life: 2000,
    });
  };

  const reject = (): void => {
    toast.current?.show({
      severity: 'warn',
      summary: 'Rejected',
      detail: 'Thanks for your great choice!!!',
      life: 3000,
    });
  };

  useEffect(() => {
    setSumCart(itemCart.sumaCart);
    itemCart.asyncCartID();
  }, [itemCart.isLoading]);
  useEffect(() => {
    setSumCart(itemCart.sumaCart + sumaCart);
    itemCart.asyncCartID();
    setDeletItem(false);
  }, [deletItem]);

  return {
    visibleCartList,
    itemCart,
    itemsCart,
    editData,
    sumCart,
    visible,
    setVisible,
    toast,
    accept,
    reject,
    buttonEl,
    visibleError,
    setVisibleError,
  };
};
