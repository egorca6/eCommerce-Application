import { Link } from 'react-router-dom';
import { PAGES } from '../constants/pages';
import { count } from '../constants/registratForm';
import styles from './Aside.module.scss';

export const Aside = (): JSX.Element => {
  const id = localStorage.getItem('id');
  if (id) count.ID = id;
  return (
    <aside className={styles.aside}>
      <Link to={PAGES.main.route}>Home</Link>
      <Link to={PAGES.catalog.route}>Catalog</Link>
      <Link to={PAGES.cart.route}>Cart</Link>
      <Link to={PAGES.about.route}>About</Link>
      {count.ID ? (
        <Link to={PAGES.profile.route}>Profile</Link>
      ) : (
        <>
          <Link to={PAGES.signin.route}>Signin</Link>
          <Link to={PAGES.registration.route}>Register</Link>
        </>
      )}
    </aside>
  );
};
