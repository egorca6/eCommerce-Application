import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { PAGES } from '../constants/pages';
import { count } from '../constants/registratForm';
import { logOut } from '../utils/user';
import { AuthContext } from './authProvider';
import styles from './Links.module.scss';

export const commonLinks = [
  <NavLink to={PAGES.main.route} key={PAGES.main.key}>
    <i className={`pi pi-home ${styles.fontSize}`}></i>
    Home
  </NavLink>,
  <NavLink to={PAGES.catalog.route} key={PAGES.catalog.key}>
    <i className={`pi pi-gift ${styles.fontSize}`}></i>
    Catalog
  </NavLink>,
  <NavLink to={PAGES.cart.route} key={PAGES.cart.key}>
    <i className={`pi pi-shopping-cart ${styles.fontSize}`}></i>
    Cart
  </NavLink>,
  <NavLink to={PAGES.about.route} key={PAGES.about.key}>
    <i className={`pi pi-users ${styles.fontSize}`}></i>
    About
  </NavLink>,
];

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

export const LinksIsAuth = (): JSX.Element => {
  const { setIsAuth } = useContext(AuthContext);

  const handleLogOut = (): void => {
    count.cartID = '';
    count.versionCart = 1;
    count.switchApiRoot = true;
    logOut();
    setIsAuth(false);
  };

  return (
    <>
      <NavLink to={PAGES.profile.route} key={PAGES.profile.key}>
        <i className={`pi pi-user ${styles.fontSize}`}></i>
        Profile
      </NavLink>
      <Link to={PAGES.main.route} onClick={handleLogOut}>
        <i className={`pi pi-sign-out ${styles.fontSize}`}></i>
        Exit
      </Link>
      ,
    </>
  );
};
