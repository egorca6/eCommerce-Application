import { ProductProjection } from '@commercetools/platform-sdk';
import { useNavigate } from 'react-router-dom';
import { PAGES } from '../constants/pages';
import { covertPrice } from '../utils/product';
import styles from './Product.module.scss';

// const AccessoriesID = '059dc4ff-dab0-4723-bc77-4be94226adb5';
// const TextilesID = 'c2788add-fc7f-449d-9119-90734f995c2a';
// const CosmeticsID = 'de4d113c-211b-439d-9771-dadd0e7b9928';

export const ProductItem = (data: ProductProjection): JSX.Element => {
  const price = data.masterVariant.prices?.[0].value.centAmount;
  const discountPrice =
    data.masterVariant.prices?.[0].discounted?.value.centAmount;

  const key = data.masterVariant.key;
  const slug = data.slug['en-US'];

  const navigate = useNavigate();

  return (
    <div
      className={styles.products}
      onClick={(): void => {
        if (key) navigate(PAGES.product.route + slug, { state: key }); //@ToDo - поменять потом пути на страницу продукта
      }}>
      <img
        src={data.masterVariant.images?.[0].url}
        alt={data.masterVariant.images?.[0].label}
      />

      <div className={discountPrice ? styles.newPrices : styles.oldPrices}>
        <div className={discountPrice ? styles.oldPrice : styles.price}>
          {price ? covertPrice(price) : '0.00'}
        </div>

        <div
          className={discountPrice ? styles.discountPrice : styles.noDiscount}>
          {discountPrice ? covertPrice(discountPrice) : ''}
        </div>
      </div>

      <div className={styles.name}>{data.name?.['en-US']}</div>
    </div>
  );
};
