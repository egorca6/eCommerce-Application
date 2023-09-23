import { NavLink } from 'react-router-dom';
import { PAGES } from '../../constants/pages';
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
