import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './Layouts/Layout';
import { ErrorPage } from './pages/ErrorPage/ErrorPage';
import { AuthContext } from './components/authProvider';
import { useEffect, useState } from 'react';
import { CATALOG_PAGES, GENERAL_PAGES, PAGES } from './constants/pages';
import { ProductPage } from './pages/ProductPage/ProductPage';
import { LayoutCatalog } from './Layouts/LayoutCatalog';
import { Catalog } from './pages/CatalogPage/Catalog';
import { ID_PRODUCT_CATEGORIES } from './constants/api';
import { pagesMap } from './pages/pagesMap';
import 'primereact/resources/themes/mira/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.scss';

function App(): JSX.Element {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setIsAuth(true);
    }
  }, []);

  return (
    <>
      <AuthContext.Provider
        value={{
          isAuth,
          setIsAuth,
        }}>
        <Routes>
          <Route path={PAGES.main.route} element={<Layout />}>
            {GENERAL_PAGES.map(({ key, route }) => {
              const Page = pagesMap[key];
              return (
                <Route
                  key={key}
                  path={route}
                  element={
                    (isAuth && key === 'registration') ||
                    (isAuth && key === 'signin') ? (
                      <Navigate to={PAGES.main.route} />
                    ) : (
                      <Page />
                    )
                  }
                />
              );
            })}

            <Route path={PAGES.catalog.route} element={<LayoutCatalog />}>
              {CATALOG_PAGES.map(({ key, route }) => {
                const id = ID_PRODUCT_CATEGORIES[key];
                return (
                  <Route
                    key={key}
                    path={route}
                    element={<Catalog options={{ id: id }} />}
                  />
                );
              })}

              {CATALOG_PAGES.map(({ key, route }) => {
                return (
                  <Route
                    key={key}
                    path={route + '/:key'}
                    element={<ProductPage />}
                  />
                );
              })}
            </Route>

            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </AuthContext.Provider>
    </>
  );
}

export default App;
