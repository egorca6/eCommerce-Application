import { Button } from 'primereact/button';
import { ScrollPanel } from 'primereact/scrollpanel';
import { useEffect, useRef, useState } from 'react';
import { count } from '../../constants/registratForm';
import styles from './CartList.module.scss';
import { LineItem } from '@commercetools/platform-sdk';
import { useCartID } from './useCart';
import ItemsVision from './ItemsVision';
import { FIRST_INDEX } from '../../constants/common';
import CartEmpty from './CartEmpty';
import { asyncDeleteAllProductForCartID } from './useItemCart';
import { ConfirmPopup } from 'primereact/confirmpopup';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { useNavigate } from 'react-router';

export const cartData: LineItem[] = [];
let sumaCart = 0;

export default function CartList(props: { onOffForm: object }): JSX.Element {
  const navigate = useNavigate();

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

  useEffect(() => {
    setSumCart(itemCart.sumaCart);
    itemCart.asyncCartID();
  }, [itemCart.isLoading]);
  useEffect(() => {
    setSumCart(itemCart.sumaCart + sumaCart);
    itemCart.asyncCartID();
    setDeletItem(false);
  }, [deletItem]);

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
  return (
    <div className={styles.list_cart}>
      <div className={styles.cart_middle} style={visibleCartList}>
        {itemCart.response ? (
          itemCart.response.length ? (
            <div className={styles.cart_middle_row}>
              <div className="mb-5">
                {itemsCart.map(items => (
                  <div className={styles.list_cart_white} key={items.id}>
                    <ItemsVision
                      value={{
                        name: items.name['en-US'],
                        id: items.id,
                        price: items.price.value.centAmount,
                        count: items.quantity,
                        version: itemCart.version,
                        img: items.variant.images
                          ? items.variant.images?.[FIRST_INDEX].url
                          : '',
                      }}
                      editDataCart={editData}
                    />
                  </div>
                ))}
              </div>

              <div className={styles.list_cart_white}>
                <p className={styles.cart_span}>Data Cart</p>
                <p className={styles.cart_span}>
                  Suma:&nbsp;
                  <span className="cart_span" style={{ color: 'red' }}>
                    {(sumCart / 100).toFixed(2)}
                  </span>
                </p>
                <Toast ref={toast} />
                <ConfirmPopup
                  visible={visible}
                  onHide={(): void => setVisible(false)}
                  message="Если выбор меньше чем из трёх, это шантаж!)))"
                  icon="pi pi-exclamation-triangle"
                  accept={accept}
                  reject={reject}
                />
                <div className={styles.button}>
                  <Button
                    ref={buttonEl}
                    onClick={(): void => navigate('*')}
                    icon="pi pi-check"
                    label="Proceed to Checkout"
                  />
                  <Button
                    ref={buttonEl}
                    onClick={(): void => setVisible(true)}
                    severity="danger"
                    icon="pi pi-check"
                    label="Delete all product"
                  />
                </div>
              </div>
            </div>
          ) : (
            <CartEmpty />
          )
        ) : (
          <CartEmpty />
        )}

        <Dialog
          className={styles.module__window}
          style={{ maxWidth: '340px' }}
          header="Notification"
          visible={visibleError}
          onHide={(): void => {
            setVisibleError(false);
            count.errors = '';
          }}>
          <p>{count.errors}</p>
        </Dialog>
      </div>
    </div>
  );
}
