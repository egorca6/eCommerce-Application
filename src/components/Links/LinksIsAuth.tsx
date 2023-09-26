import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { PAGES } from '../../constants/pages';
import { count } from '../../constants/registratForm';
import { logOut } from '../../utils/user';
import { AuthContext } from '../authProvider';
import styles from './LinksIsAuth.module.scss';

export const LinksIsAuth = (): JSX.Element => {
  const { setIsAuth } = useContext(AuthContext);

  const handleLogOut = (): void => {
    count.cartID = '';
    count.versionCart = 1;
    count.switchApiRoot = true;
    logOut();
    setIsAuth(false);
  };

  return (
    <>
      <NavLink to={PAGES.profile.route} key={PAGES.profile.key}>
        <i className={`pi pi-user ${styles.fontSize}`}></i>
        Profile
      </NavLink>
      <Link to={PAGES.main.route} onClick={handleLogOut}>
        <i className={`pi pi-sign-out ${styles.fontSize}`}></i>
        Exit
      </Link>
    </>
  );
};
