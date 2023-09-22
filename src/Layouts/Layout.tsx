import { NavLink, Outlet } from 'react-router-dom';
import { ShowBurger } from '../components/Burger';
import { PAGES } from '../constants/pages';
import logo from '../assets/logo.png';
import styles from './Layout.module.scss';
import { LinksForHeader } from '../components/LinksForHeader';

export const Layout = (): JSX.Element => {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__wrapper}>
          <NavLink to={PAGES.main.route}>
            <img src={logo} alt="logo" className="w-6rem h-2rem" />
          </NavLink>
          <ShowBurger />
          <div className={styles.navigation}>
            <LinksForHeader />
          </div>
        </div>
      </header>

      <Outlet />

      <footer className={styles.footer}>RS-School 2023</footer>
    </>
  );
};
