import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './Layouts/Layout';
import { AboutPage } from './pages/AboutPage/AboutPage';
import { ErrorPage } from './pages/ErrorPage/ErrorPage';
import { MainPage } from './pages/MainPage/MainPage';
import { SignInPage } from './pages/SignInPage/SignInPage';
import { RegistrationPage } from './pages/RegistrationPage/RegistrationPage';
import { AuthContext } from './components/authProvider';
import { useEffect, useState } from 'react';
import 'primereact/resources/themes/mira/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.scss';
import { PAGES } from './constants/pages';
import { ProductPage } from './pages/ProductPage/ProductPage';
import { UserProfilePage } from './pages/UserProfilePage/UserProfilePage';
import { LayoutCatalog } from './Layouts/LayoutCatalog';
import { CatalogMain } from './pages/CatalogPage/CatalogMain';
import { AccessoriesPage } from './pages/CatalogPage/Accessories';
import { CosmeticsPage } from './pages/CatalogPage/Cosmetics';
import { TextilesPage } from './pages/CatalogPage/Textiles';
import { SetsPage } from './pages/CatalogPage/Sets';

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
            <Route path={PAGES.main.route} element={<MainPage />} />

            <Route
              path={PAGES.catalog.route}
              element={<LayoutCatalog />}
              errorElement={<ErrorPage />}>
              <Route index element={<CatalogMain />} />
              <Route
                path={PAGES.accessories.route}
                element={<AccessoriesPage />}
              />
              <Route path={PAGES.cosmetics.route} element={<CosmeticsPage />} />
              <Route path={PAGES.textiles.route} element={<TextilesPage />} />
              <Route path={PAGES.sets.route} element={<SetsPage />} />
            </Route>

            <Route
              path={PAGES.product.route + ':key'}
              element={<ProductPage />}
            />
            <Route
              path={PAGES.signin.route}
              element={
                isAuth ? <Navigate to={PAGES.main.route} /> : <SignInPage />
              }
            />
            <Route
              path={PAGES.registration.route}
              element={
                isAuth ? (
                  <Navigate to={PAGES.main.route} />
                ) : (
                  <RegistrationPage />
                )
              }
            />
            <Route path={PAGES.about.route} element={<AboutPage />} />
            <Route path={PAGES.profile.route} element={<UserProfilePage />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </AuthContext.Provider>
    </>
  );
}

export default App;
