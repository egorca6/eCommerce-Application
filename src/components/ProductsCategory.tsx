import { useNavigate } from 'react-router-dom';
import { PAGES } from '../constants/pages';
import styles from './ProductsCategory.module.scss';

export const ProductsCategory = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <>
      {/* @ToDo сделать слайдер для категорий*/}
      <div className={styles.category}>
        <div
          className={styles.accessories}
          onClick={(): void => navigate(PAGES.catalog.route)}>
          Catalog
        </div>
        <div
          className={styles.accessories}
          onClick={(): void =>
            navigate(PAGES.catalog.route + PAGES.accessories.route)
          }>
          ACCESSORIES
        </div>
        <div
          className={styles.cosmetics}
          onClick={(): void =>
            navigate(PAGES.catalog.route + PAGES.cosmetics.route)
          }>
          COSMETICS
        </div>
        <div
          className={styles.textiles}
          onClick={(): void =>
            navigate(PAGES.catalog.route + PAGES.textiles.route)
          }>
          TEXTILES
        </div>
        <div
          className={styles.sets}
          onClick={(): void =>
            navigate(PAGES.catalog.route + PAGES.sets.route)
          }>
          GIFT SETS
        </div>
      </div>
    </>
  );
};
