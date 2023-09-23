import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { ErrorMessage } from './ErrorMessage';
import { Dialog } from 'primereact/dialog';
import { NewPasswordForm } from './NewPasswordForm';
import styles from './UserDataForm.module.scss';
import ListAddress from '../ListAddress';
import { useUserDataForm } from '../../hooks/useUserDataForm';

let switchButton: 'button' | 'submit' | 'reset' | undefined = 'submit';
let switchReadOnly = true;
let buttonLabel = 'Edit';
let background = { background: 'transparent' };

export const UserDataForm = (): JSX.Element => {
  const {
    form,
    messageUser,
    closeForm,
    visible,
    setVisible,
    visiblePasswordForm,
    setvisiblePasswordForm,
    onSubmit,
  } = useUserDataForm();

  return (
    <div className={styles.user_data_main}>
      <div className={styles.registration_data_name}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={styles.registration_address}
          style={background}>
          <label htmlFor="serial" className={styles.span_head}>
            My Data
          </label>
          <InputText
            readOnly={switchReadOnly}
            className="mb-1 border-round-lg"
            {...form.register('email')}
            type="text"
            placeholder="Enter your email"
          />
          <ErrorMessage err={form.formState.errors.email?.message} />

          <InputText
            readOnly={switchReadOnly}
            className="mb-1 border-round-lg"
            {...form.register('firstName')}
            placeholder="Enter your firstName"
          />
          <ErrorMessage err={form.formState.errors.firstName?.message} />

          <InputText
            readOnly={switchReadOnly}
            className="mb-1 border-round-lg"
            {...form.register('lastName')}
            placeholder="Enter your LastName"
          />
          <ErrorMessage err={form.formState.errors.lastName?.message} />

          <label className={styles.registration_span}>Date of your birth</label>
          <InputText
            readOnly={switchReadOnly}
            className="mb-1 border-round-lg"
            type={'date'}
            {...form.register('dateOfBirth')}
          />
          <ErrorMessage err={form.formState.errors.dateOfBirth?.message} />
          <Dialog
            className={styles.module__window}
            header="Notification"
            visible={visible}
            onHide={(): void => {
              setVisible(false);
            }}>
            <p className={styles.message}>{messageUser}</p>
          </Dialog>
          <Button
            className="mt-3 mb-1 border-round-lg"
            label={buttonLabel}
            type={switchButton}
            onClick={(): void => {
              switchReadOnly = switchButton === 'submit' ? false : true;
              if (switchReadOnly) {
                switchButton = 'submit';
                buttonLabel = 'Edit';
                background = { background: 'transparent' };
              } else {
                switchButton = 'button';
                buttonLabel = 'Save';
                background = { background: '#e7dacf' };
              }
              form.reset({}, { keepValues: true });
            }}
          />
        </form>
        <div className="mb-5">
          <Dialog
            header="Change your Password"
            style={{ maxWidth: '80vw' }}
            visible={visiblePasswordForm}
            onHide={(): void => setvisiblePasswordForm(false)}>
            <NewPasswordForm toBack={closeForm} />
          </Dialog>
          <Button
            className="mt-3 mb-1"
            label="Change your Password"
            onClick={(): void => {
              setvisiblePasswordForm(true);
            }}
          />
        </div>
      </div>

      <div className="mb-5">
        <ListAddress />
      </div>
    </div>
  );
};
export default UserDataForm;
