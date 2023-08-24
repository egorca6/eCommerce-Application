import { Link } from 'react-router-dom';
import { PAGES } from '../constants/pages';
import styles from './Aside.module.scss';

export const Aside = (): JSX.Element => {
  return (
    <aside className={styles.aside}>
      <Link to={PAGES.main.route}>Home</Link>
      <Link to={PAGES.about.route}>About</Link>
      <Link to={PAGES.cart.route}>Cart</Link>
      <Link to={PAGES.profile.route}>Profile</Link>
      <Link to={PAGES.signin.route}>Signin</Link>
      <Link to={PAGES.registration.route}>Registration</Link>
    </aside>
  );
};
