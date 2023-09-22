import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { IUserData } from '../../types/interface';
import { validUserData } from './utils/validRegisterData';
import { ErrorMessage } from './ErrorMessage';
import styles from './AddressForm.module.scss';
import { userData, count } from '../../constants/registratForm';
import { editUserData } from '../../api/requestAddress';
import { updateUserData } from './utils/updateUserData';
import { getCustomerID } from '../../api/customers';
import { Dialog } from 'primereact/dialog';
import NewPasswordForm from './NewPasswordForm';
import ListAddress from '../ListAddress';

let messageUser = '';
let switchButton: 'button' | 'submit' | 'reset' | undefined = 'submit';
let switchReadOnly = true;
let buttonLabel = 'Edit';
let background = { background: 'transparent' };
let asyncRender = async (): Promise<void> => {};
export const UserDataForm = (): JSX.Element => {
  const form = useForm({
    mode: 'onBlur',
    resolver: yupResolver(validUserData),
    defaultValues: {
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      dateOfBirth: userData.dateOfBirth,
    },
  });
  if (count.switchRenderUserData) {
    const id = localStorage.getItem('id');
    if (id) count.ID = id;
    if (count.ID) {
      asyncRender = async (): Promise<void> => {
        await getCustomerID(count.ID)
          .then(({ body }) => {
            updateUserData(body);
          })
          .catch(console.error);
        form.setValue('email', userData.email);
        form.setValue('firstName', userData.firstName);
        form.setValue('lastName', userData.lastName);
        form.setValue('dateOfBirth', userData.dateOfBirth);
      };
      asyncRender();
      count.switchRenderUserData = false;
    }
  }

  const closeForm = (errorMessage: string): void => {
    if (errorMessage !== '') {
      messageUser = errorMessage;
    } else {
      messageUser = 'Your Password has been successfully saved';
    }
    setVisible(true);
    // messageUser = '';
  };
  const [visible, setVisible] = useState<boolean>(false);
  const [visiblePasswordForm, setvisiblePasswordForm] = useState(false);
  const onSubmit: SubmitHandler<IUserData> = (data: IUserData): void => {
    count.switchRenderUserData = true;
    const callback = (errorMessage: string): void => {
      asyncRender();
      if (errorMessage !== '') {
        messageUser = errorMessage;
      } else {
        messageUser = 'Your data has been successfully saved';
      }
      setVisible(true);
    };
    editUserData(data, callback);
  };

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
