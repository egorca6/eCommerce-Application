import { Button } from 'primereact/button';
import { count } from '../../constants/registratForm';
import styles from './CartList.module.scss';
import { LineItem } from '@commercetools/platform-sdk';
import ItemsVision from './ItemsVision';
import { FIRST_INDEX } from '../../constants/common';
import CartEmpty from './CartEmpty';
import { ConfirmPopup } from 'primereact/confirmpopup';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { useNavigate } from 'react-router';
import { useCartList } from '../../hooks/useCartList';

export const cartData: LineItem[] = [];
export default function CartList(props: { onOffForm: object }): JSX.Element {
  const navigate = useNavigate();
  const {
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
  } = useCartList(props);

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
