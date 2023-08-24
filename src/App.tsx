import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
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
            <Route index element={<MainPage />} />
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
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </AuthContext.Provider>
    </>
  );
}

export default App;
