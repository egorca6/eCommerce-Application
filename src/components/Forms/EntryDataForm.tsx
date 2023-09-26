import { Dialog } from 'primereact/dialog';
import { RegistrationForm } from './RegistrationForm';
import { Button } from 'primereact/button';
import styles from './EntryDataForm.module.scss';
import { PAGES } from '../../constants/pages';
import { useEntryDataForm } from '../../hooks/useEntryDataForm';
import { useContext } from 'react';
import { AuthContext } from '../authProvider';
import { useNavigate } from 'react-router';

export const EntryDataForm = (): JSX.Element => {
  const {
    visible,
    onOfPoUpForm,
    setVisible,
    showSuccessMessage,
    registrationMessage,
  } = useEntryDataForm();
  const { setIsAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <>
      <RegistrationForm create={onOfPoUpForm} />
      <Dialog
        className={styles.module__window}
        header="Notification for you"
        visible={visible}
        onHide={(): void => {
          setVisible(false);
          if (showSuccessMessage) {
            setIsAuth(true);
            navigate(PAGES.main.route);
          }
        }}>
        <p className={styles.message}>{registrationMessage}</p>
      </Dialog>
      <h4 className={styles.text}>
        If you have an account with our store, please go to the sign in page
      </h4>
      <Button
        className="mt-3 mb-1 border-round-lg"
        label="Sign In"
        type="button"
        onClick={(): void => {
          navigate(PAGES.signin.route);
        }}
      />
    </>
  );
};
export default EntryDataForm;
