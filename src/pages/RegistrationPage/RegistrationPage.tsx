import EntryDataForm from '../../components/Forms/EntryDataForm';
import styles from './RegistrationPage.module.scss';

export const RegistrationPage = (): JSX.Element => {
  return (
    <div className={styles.page}>
      <EntryDataForm />
    </div>
  );
};
