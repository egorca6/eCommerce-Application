import { useEffect, useRef, useState } from 'react';
import { Card } from 'primereact/card';
import { BreadCrumb } from 'primereact/breadcrumb';
import styles from './DisplayProductInfo.module.scss';
import { ToggleButton, ToggleButtonChangeEvent } from 'primereact/togglebutton';
import { useIsItemInCart } from '../../hooks/useItemCart';
import { count } from '../../constants/registratForm';
import { Toast } from 'primereact/toast';
import {
  LABEL_ADD_BUTTON,
  LABEL_REMOVE_BUTTON,
  LIFE_TIME_MESSAGE,
  PRODUCT_ADD,
  PRODUCT_REMOVE,
  SUCCESS_MESSAGE,
  WARN_MESSAGE,
} from '../../constants/product';
import {
  asyncAddItemCart,
  asyncUpdateCartProductId,
  cartUserDraft,
} from '../../api/cart';
import { useBreadCrumbs } from '../../hooks/useBreadCrumbs';
import { useProductData } from '../../hooks/useProductData';
import { ProductImagesGallery } from './Gallery';

export function DisplayProductInfo(keyProduct: string): JSX.Element {
  const productData = useProductData(keyProduct);
  const [checked, setChecked] = useState<boolean>(false);

  const cartIsItem = useIsItemInCart(keyProduct);
  useEffect(() => {
    setChecked(cartIsItem.IsItem);
  }, [cartIsItem.IsItem]);

  const callback = (): void => {};

  const messagePopUp = useRef<Toast>(null);

  const popUpMessage = (message: string, isDelete: boolean): void => {
    messagePopUp.current?.show({
      severity: isDelete ? WARN_MESSAGE : SUCCESS_MESSAGE,
      detail: message,
      life: LIFE_TIME_MESSAGE,
    });
  };

  const { itemsBreadCrumbs, home } = useBreadCrumbs();

  return (
    <>
      <BreadCrumb
        model={itemsBreadCrumbs}
        home={home}
        className={styles.breadcrumb}
      />
      <div className={styles.wrapper}>
        <ProductImagesGallery images={productData.images} />
        <Card
          title={productData.nameProduct}
          subTitle={productData.typeProduct}
          className="md:w-25rem">
          {productData.priceProductDiscount ? (
            <p className={`${styles.strikethrough} m-0`}>
              {productData.priceFullProduct}
            </p>
          ) : (
            <p className={`${styles.noDiscount} m-0`}>
              {productData.priceFullProduct}
            </p>
          )}
          <p className={`m-10 ${styles.highlight}`}>
            {productData.priceProductDiscount}
          </p>
          <p className="m-0">{productData.descriptionProduct}</p>
          <div className="card justify-content-center">
            <ToggleButton
              onLabel={LABEL_ADD_BUTTON}
              offLabel={LABEL_REMOVE_BUTTON}
              onIcon="pi pi-cart-plus"
              offIcon="pi pi-times"
              checked={checked}
              onChange={(e: ToggleButtonChangeEvent): void => {
                setChecked(e.value);
                if (e.value) {
                  console.log(count.productId);
                  asyncUpdateCartProductId(count.productItemId, callback);
                  popUpMessage(PRODUCT_REMOVE, e.value);
                } else {
                  popUpMessage(PRODUCT_ADD, e.value);
                  if (count.cartID) {
                    asyncAddItemCart(count.productItemId);
                  } else {
                    cartUserDraft(count.productItemId);
                  }
                }
              }}
              className="mt-3 mb-1 border-round-lg"
            />
          </div>
        </Card>
      </div>
      <Toast ref={messagePopUp} />
    </>
  );
}
