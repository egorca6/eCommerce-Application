import { Galleria, GalleriaResponsiveOptions } from 'primereact/galleria';
import { useEffect, useRef, useState } from 'react';
import { Image as ImageSDK } from '@commercetools/platform-sdk';
import { getProductByKey } from '../../api/products';
import { Card } from 'primereact/card';
import { FIRST_INDEX } from '../../constants/common';
import { covertPrice } from '../../utils/product';
import { useLocation, useNavigate } from 'react-router-dom';
import { BreadCrumb } from 'primereact/breadcrumb';
import { MenuItem } from 'primereact/menuitem';
import { PAGES } from '../../constants/pages';
import styles from './DisplayProductInfo.module.scss';
//=======
import { ToggleButton, ToggleButtonChangeEvent } from 'primereact/togglebutton';
import {
  asyncAddItemCart,
  asyncUpdateCartProductId,
  cartUserDraft,
  useIsItemInCart,
  // useUpdateItemCart,
} from '../Cart/useItemCart';
import { count } from '../../constants/registratForm';
import { Dialog } from 'primereact/dialog';
//=======
export function DisplayProductInfo(keyProduct: string): JSX.Element {
  const location = useLocation();
  const [images, setImages] = useState<ImageSDK[]>();
  const [nameProduct, setNameProduct] = useState<string>();
  const [descriptionProduct, setDescriptionProduct] = useState<string>();
  const [typeProduct, setTypeProduct] = useState<string>();
  const [priceProductDiscount, setPriceProduct] = useState<string>();
  const [priceFullProduct, setpriceFullProduct] = useState<string>();
  const galleria = useRef<Galleria>(null);
  const responsiveOptions: GalleriaResponsiveOptions[] = [
    {
      breakpoint: '991px',
      numVisible: 2,
    },
    {
      breakpoint: '767px',
      numVisible: 2,
    },
    {
      breakpoint: '575px',
      numVisible: 2,
    },
  ];
  const returnToErrorPage = useNavigate();
  //=========
  const [checked, setChecked] = useState<boolean>(false);
  const [visibleError, setVisibleError] = useState<boolean>(false);
  const cartIsItem = useIsItemInCart(keyProduct);
  useEffect(() => {
    setChecked(cartIsItem.IsItem);
  }, [cartIsItem.IsItem]);
  const callback = (delet: boolean, sumaItem: number): void => {
    if (delet) {
      setVisibleError(true);
    }
    setChecked(delet);
  };
  //==========
  useEffect(() => {
    getProductByKey(keyProduct)
      .then(data => {
        count.productItemId = data.body.id;
        const pathToPhoto = data.body.masterVariant.images;
        const productName = data.body.name['en-US'];
        const productDescription = data.body.description?.['en-US'];
        const productType =
          data.body.masterVariant.attributes?.[FIRST_INDEX].name;
        const productPriceDiscounted =
          data.body.masterVariant.prices?.[FIRST_INDEX].discounted?.value
            .centAmount;
        const productPriceFull =
          data.body.masterVariant.prices?.[FIRST_INDEX].value.centAmount;
        if (productPriceFull) {
          const productPriceFullConvert = covertPrice(productPriceFull);
          setImages(pathToPhoto);
          setNameProduct(productName);
          setDescriptionProduct(productDescription);
          setTypeProduct(productType);
          setpriceFullProduct(productPriceFullConvert);
        }
        if (productPriceDiscounted) {
          const productPriceConvert = covertPrice(productPriceDiscounted);
          setPriceProduct(productPriceConvert);
        } else {
          setPriceProduct('');
        }
      })
      .catch(error => {
        console.warn('Произошла ошибка при получении данных:', error);
        //редиректим при неудачном адресе или запросе на страницу 404
        returnToErrorPage('*');
      });
  }, [keyProduct]);
  const handleImageClick = (): void => {
    galleria.current?.show();
  };
  const itemTemplate = (item: ImageSDK): JSX.Element => {
    return (
      <img
        src={item.url}
        alt={item.label}
        style={{ width: '100%', display: 'block' }}
        onClick={handleImageClick}
      />
    );
  };

  const thumbnailTemplate = (item: ImageSDK): JSX.Element => {
    return <img src={item.url} alt={item.label} style={{ width: '50%' }} />;
  };

  const items: MenuItem[] = [];
  const home: MenuItem = { icon: 'pi pi-home', url: '/' };

  location.pathname.split('/').forEach(path => {
    if (path === PAGES.catalog.key) {
      items.push({ label: `${path}`, url: `/${path}` });
    } else if (
      path.length &&
      (path === PAGES.accessories.key ||
        path === PAGES.textiles.key ||
        path === PAGES.cosmetics.key)
    ) {
      items.push({ label: `${path}`, url: `../${path}` });
    } else if (path.length) {
      items.push({ label: `${path}` });
    }
  });

  return (
    <>
      <BreadCrumb model={items} home={home} className={styles.breadcrumb} />
      <div className={styles.wrapper}>
        <div className="card">
          <Galleria
            value={images}
            responsiveOptions={responsiveOptions}
            numVisible={2}
            circular
            style={{ maxWidth: '500px' }}
            showItemNavigators
            showItemNavigatorsOnHover
            item={itemTemplate}
            thumbnail={thumbnailTemplate}
          />
        </div>
        <Galleria
          ref={galleria}
          value={images}
          numVisible={2}
          style={{ maxWidth: '100%' }}
          className={styles.enlarged}
          circular
          fullScreen
          showItemNavigators
          showThumbnails={false}
          item={itemTemplate}
          thumbnail={thumbnailTemplate}
        />
        <Card title={nameProduct} subTitle={typeProduct} className="md:w-25rem">
          {priceProductDiscount ? (
            <p className={`${styles.strikethrough} m-0`}>{priceFullProduct}</p>
          ) : (
            <p className={`${styles.noDiscount} m-0`}>{priceFullProduct}</p>
          )}
          <p className={`m-10 ${styles.highlight}`}>{priceProductDiscount}</p>
          <p className="m-0">{descriptionProduct}</p>
          <div className="card flex justify-content-center">
            <ToggleButton
              onLabel="In Cart"
              offLabel="Out Cart"
              onIcon="pi pi-check"
              offIcon="pi pi-times"
              checked={checked}
              onChange={(e: ToggleButtonChangeEvent): void => {
                setChecked(e.value);
                if (e.value) {
                  count.errors =
                    'The product was successfully removed from the cart';
                  console.log(count.productId);
                  asyncUpdateCartProductId(count.productItemId, callback);
                } else {
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
    </>
  );
}
