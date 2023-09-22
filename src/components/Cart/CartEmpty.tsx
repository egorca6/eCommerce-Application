import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { PAGES } from '../../constants/pages';
import styles from './CartEmpty.module.scss';

export default function CartEmpty(): JSX.Element {
  const redirect = useNavigate();
  return (
    <div className={styles.cartEmpty}>
      <p style={{ margin: '0.3rem' }}>Cart Empty</p>
      <Button
        className="mt-3 mb-1 border-round-lg"
        label="To catalog"
        type="submit"
        onClick={(): void => {
          redirect(PAGES.catalog.route);
        }}
      />
    </div>
  );
}
