import { useNavigate } from 'react-router-dom';
import { PAGES } from '../constants/pages';

import styles from './ProductsCategory.module.scss';

export const ProductsCategory = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className={styles.main}>
      <div className={styles.category}>
        <div
          className={styles.catalog}
          onClick={(): void => navigate(PAGES.catalog.route)}>
          CATALOG
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
      </div>
    </div>
  );
};
