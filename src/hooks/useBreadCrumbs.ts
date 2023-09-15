import { MenuItem } from 'primereact/menuitem';
import { Location } from 'react-router-dom';
import { PAGES } from '../constants/pages';

export const useBreadCrumbs = (location: Location): MenuItem[] => {
  const items: MenuItem[] = [];
  const locationPage = location.search?.split('=')[1];

  location.pathname.split('/').forEach(path => {
    if (path === PAGES.catalog.key) {
      items.push({ label: `${path}`, url: `/${path}` });
    }
    if (path.length && path !== PAGES.catalog.key) {
      items.push({ label: `${path}`, url: `${path}` });
    }
  });

  if (locationPage) items.push({ label: `page ${locationPage}` });

  return items;
};
