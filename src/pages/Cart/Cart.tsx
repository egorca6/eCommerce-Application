import CartList from '../../components/Cart/CartList';
import styles from './Cart.module.scss';

export const CartPage = (): JSX.Element => {
  return (
    <div className={styles.page}>
      <CartList onOffForm={{ display: 'block' }} />
    </div>
  );
};
