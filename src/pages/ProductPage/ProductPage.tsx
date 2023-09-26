import styles from './ProductPage.module.scss';
import { DisplayProductInfo } from '../../components/DisplayProductInfo/DisplayProductInfo';
import { useLocation, useParams } from 'react-router-dom';

export function ProductPage(): JSX.Element | null {
  const key = useParams().key;
  const keyLocation = useLocation().state;

  if (key) {
    return <div className={styles.page}>{DisplayProductInfo(key)}</div>;
  }
  if (keyLocation) {
    return <div className={styles.page}>{DisplayProductInfo(keyLocation)}</div>;
  }
  return null;
}
