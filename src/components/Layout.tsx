import { Outlet } from 'react-router-dom';
import { Header } from './Headers';
import styles from './Layout.module.scss';

export const Layout = (): JSX.Element => {
  return (
    <>
      <Header />
      <Outlet />
      <footer className={styles.footer}>RS-School 2023</footer>
    </>
  );
};
