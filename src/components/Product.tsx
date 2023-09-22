import { ProductProjection } from '@commercetools/platform-sdk';
import { useNavigate } from 'react-router-dom';
import { PAGES } from '../constants/pages';
import { covertPrice } from '../utils/product';
import styles from './Product.module.scss';
import {
  asyncAddItemCart,
  asyncUpdateCartProductId,
  cartUserDraft,
  useIsItemInCart,
} from './Cart/useItemCart';
import { count } from '../constants/registratForm';
import { useEffect, useRef, useState } from 'react';
import {
  LIFE_TIME_MESSAGE,
  PRODUCT_ADD,
  PRODUCT_REMOVE,
  SUCCESS_MESSAGE,
  WARN_MESSAGE,
} from '../constants/product';
import { Toast } from 'primereact/toast';

export const ProductItem = (data: ProductProjection): JSX.Element => {
  const price = data.masterVariant.prices?.[0].value.centAmount;
  const discountPrice =
    data.masterVariant.prices?.[0].discounted?.value.centAmount;

  const key = data.masterVariant.key;
  const slug = data.slug['en-US'];
  const categories = data.masterVariant.attributes?.[0].name;
  const description = data.description?.['en-US'].slice(0, 50);

  const navigate = useNavigate();
  //=========
  const [checked, setChecked] = useState<boolean>(false);
  let keyProduct = '';
  const id = key;
  if (id) keyProduct = id;
  const cartIsItem = useIsItemInCart(keyProduct);
  useEffect(() => {
    setChecked(cartIsItem.IsItem);
  }, [cartIsItem.IsItem]);

  // так понимаю эту функцию мы можем удалить, setVisibleError(true) вызывать напрямую
  // в на месте вызова callback
  const callback = (): void => {};

  const messagePopUp = useRef<Toast>(null);

  const popUpMessage = (message: string): void => {
    messagePopUp.current?.show({
      severity: checked ? SUCCESS_MESSAGE : WARN_MESSAGE,
      detail: message,
      life: LIFE_TIME_MESSAGE,
    });
  };

  return (
    <>
      <Toast ref={messagePopUp} />
      <div
        className={styles.products}
        onClick={(): void => {
          if (key)
            navigate(PAGES.catalog.route + `${categories}/` + slug, {
              state: key,
            });
        }}>
        <img
          src={data.masterVariant.images?.[0].url}
          alt={data.masterVariant.images?.[0].label}
        />

        <div className={styles.prices}>
          <div className={discountPrice ? styles.newPrices : styles.oldPrices}>
            <div className={discountPrice ? styles.oldPrice : styles.price}>
              {price ? covertPrice(price) : '0.00'}
            </div>

            <div
              className={
                discountPrice ? styles.discountPrice : styles.noDiscount
              }>
              {discountPrice ? covertPrice(discountPrice) : ''}
            </div>
          </div>

          <i
            className={
              checked
                ? `${styles.icon} pi pi-cart-plus`
                : `${styles.icon} ${styles.active} pi pi-check`
            }
            onClick={(e): void => {
              e.stopPropagation();
              if (!checked) {
                setChecked(true);
                popUpMessage(PRODUCT_REMOVE);
                // функцию переделать посмотреть, нужен ли нам тут callback
                asyncUpdateCartProductId(data.id, callback);
              } else {
                setChecked(false);
                popUpMessage(PRODUCT_ADD);
                if (count.cartID) {
                  asyncAddItemCart(data.id);
                } else {
                  cartUserDraft(data.id);
                }
              }
            }}
          />
        </div>

        <div className={styles.name}>{data.name?.['en-US']}</div>
        <p>{description}...</p>
      </div>
    </>
  );
};
