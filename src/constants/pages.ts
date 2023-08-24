import { Page, PageKey } from '../types/pages';

export const PAGES: { [key in PageKey]: Page } = {
  main: {
    key: 'main',
    route: '/',
  },
  about: {
    key: 'about',
    route: '/about',
  },
  cart: {
    key: 'cart',
    route: '/cart',
  },
  signin: {
    key: 'signin',
    route: '/signin',
  },
  registration: {
    key: 'registration',
    route: '/registration',
  },
  catalog: {
    key: 'catalog',
    route: '/catalog',
  },
  profile: {
    key: 'profile',
    route: '/profile',
  },
};
