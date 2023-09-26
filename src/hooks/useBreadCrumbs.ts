import { useLocation } from 'react-router';
import { PAGES } from '../constants/pages';
import { BreadCrumbsReturn } from '../types/hooks';

export const useBreadCrumbs = (): BreadCrumbsReturn => {
  const location = useLocation();
  const itemsBreadCrumbs = [];
  const home = { icon: 'pi pi-home', url: '/' };

  const locationPage = location.search?.split('=')[1];

  location.pathname.split('/').forEach(path => {
    if (path === PAGES.catalog.key) {
      itemsBreadCrumbs.push({ label: `${path}`, url: `/${path}` });
    }
    if (path.length && path !== PAGES.catalog.key) {
      itemsBreadCrumbs.push({ label: `${path}`, url: `../${path}` });
    }
  });

  if (locationPage) itemsBreadCrumbs.push({ label: `page ${locationPage}` });
  return { itemsBreadCrumbs, home };
};
