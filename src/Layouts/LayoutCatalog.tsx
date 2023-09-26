import { Outlet } from 'react-router-dom';
import { ProductsCategory } from '../components/ProductsCategory';
import styles from './LayoutCatalog.module.scss';

export const LayoutCatalog = (): JSX.Element => {
  return (
    <div className={styles.page}>
      <div className={styles.pageContent}>
        <ProductsCategory />
        <Outlet />
      </div>
    </div>
  );
};
