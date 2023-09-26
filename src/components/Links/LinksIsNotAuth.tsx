import { NavLink } from 'react-router-dom';
import { PAGES } from '../../constants/pages';
import styles from './LinksIsNotAuth.module.scss';

export const LinksIsNotAuth = (): JSX.Element => (
  <>
    <NavLink to={PAGES.signin.route}>
      <i className={`pi pi-sign-in ${styles.fontSize}`}></i>
      Sign in
    </NavLink>
    <NavLink to={PAGES.registration.route}>
      <i className={`pi pi-user-edit ${styles.fontSize}`}></i>
      Register
    </NavLink>
  </>
);
