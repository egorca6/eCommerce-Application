import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { FormSingIn } from '../../components/Forms/SignInForm';
import { PAGES } from '../../constants/pages';
import styles from './SignInPage.module.scss';

export const SignInPage = (): JSX.Element => {
  const toRegistrationForm = useNavigate();

  return (
    <div className={styles.page}>
      <FormSingIn />
      <h4 className="center mb-2 pl-2 pr-2 text-center">
        If you are not registered, please register in our store.
      </h4>

      <Button
        className="mt-3 mb-8 border-round-lg"
        label="Registration"
        type="button"
        onClick={(): void => toRegistrationForm(PAGES.registration.route)}
      />
    </div>
  );
};
