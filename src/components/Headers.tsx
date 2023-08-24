import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from './authProvider';
import 'primeflex/primeflex.css';
import {
  LinkToLogOut,
  LinkToRegistration,
  LinkToSignIn,
  commonLinks,
} from './Links';
import logo from '../assets/logo.png';
import styles from './Headers.module.scss';
import { ShowBurger } from './Burger';
import { PAGES } from '../constants/pages';

export const Header = (): JSX.Element => {
  const { isAuth } = useContext(AuthContext);
  const Auth = (): JSX.Element => (
    <>
      {commonLinks}
      {isAuth ? (
        <LinkToLogOut />
      ) : (
        <>
          <LinkToSignIn />
          <LinkToRegistration />
        </>
      )}
    </>
  );

  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__wrapper}>
          <NavLink to={PAGES.main.route}>
            <img src={logo} alt="logo" className="w-6rem h-2rem" />
          </NavLink>
          <ShowBurger />
          <div className={styles.navigation}>
            <Auth />
          </div>
        </div>
      </header>
    </>
  );
};
