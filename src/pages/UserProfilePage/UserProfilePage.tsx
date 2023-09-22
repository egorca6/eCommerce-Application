import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserDataForm from '../../components/Forms/UserDataForm';
import { PAGES } from '../../constants/pages';
import { count } from '../../constants/registratForm';
import styles from './UserProfilePage.module.scss';

export const UserProfilePage = (): JSX.Element => {
  const toSignInPage = useNavigate();
  const id = localStorage.getItem('id');
  if (id) count.ID = id;
  useEffect(() => {
    if (!count.ID) {
      toSignInPage(PAGES.signin.route);
    }
  }, []);

  return (
    <div>
      {count.ID ? (
        <div className={styles.page}>
          <div className="registration__page content">
            <UserDataForm />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
