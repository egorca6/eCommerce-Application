import { Page, PageKey } from '../types/pages';

export const PAGES: { [key in PageKey]: Page } = {
  main: {
    key: 'main',
    route: '/',
    type: 'general',
  },
  about: {
    key: 'about',
    route: '/about',
    type: 'general',
  },
  cart: {
    key: 'cart',
    route: '/cart',
    type: 'general',
  },
  signin: {
    key: 'signin',
    route: '/signin',
    type: 'general',
  },
  registration: {
    key: 'registration',
    route: '/registration',
    type: 'general',
  },
  catalog: {
    key: 'catalog',
    route: '/catalog/',
    type: 'catalog',
  },
  profile: {
    key: 'profile',
    route: '/profile',
    type: 'general',
  },
  product: {
    key: 'product',
    route: 'product/',
    type: 'general',
  },
  accessories: {
    key: 'accessories',
    route: 'accessories',
    type: 'catalog',
  },
  cosmetics: {
    key: 'cosmetics',
    route: 'cosmetics',
    type: 'catalog',
  },
  textiles: {
    key: 'textiles',
    route: 'textiles',
    type: 'catalog',
  },
};

export const GENERAL_PAGES = Object.values(PAGES).filter(
  page => page.type === 'general',
);

export const CATALOG_PAGES = Object.values(PAGES).filter(
  page => page.type === 'catalog',
);
