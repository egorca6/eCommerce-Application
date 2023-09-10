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
import { useEffect, useState } from 'react';
import { ToggleButton, ToggleButtonChangeEvent } from 'primereact/togglebutton';
import { Dialog } from 'primereact/dialog';

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
  const [visibleError, setVisibleError] = useState<boolean>(false);
  let keyProduct = '';
  const id = key;
  if (id) keyProduct = id;
  const cartIsItem = useIsItemInCart(keyProduct);
  useEffect(() => {
    setChecked(cartIsItem.IsItem);
  }, [cartIsItem.IsItem]);
  const callback = (delet: boolean, sumaItem: number): void => {
    setVisibleError(true);
  };
  //==========
  return (
    <div>
      <div
        className={styles.products}
        onClick={(event): void => {
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
                count.errors =
                  'The product was successfully removed from the cart';
                asyncUpdateCartProductId(data.id, callback);
              } else {
                setChecked(false);
                if (count.cartID) {
                  count.errors = 'The product was successfully add in the cart';
                  callback(true, 0);
                  asyncAddItemCart(data.id);
                } else {
                  count.errors = 'The product was successfully add in the cart';
                  callback(true, 0);
                  cartUserDraft(data.id);
                }
              }
            }}
          />
        </div>

        <div className={styles.name}>{data.name?.['en-US']}</div>
        <p>{description}...</p>
      </div>
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
  );
};
