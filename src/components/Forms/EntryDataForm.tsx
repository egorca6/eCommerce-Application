import { useContext, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { RegistrationForm } from './RegistrationForm';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { count, newCustomerData } from '../../constants/registratForm';
import { AuthContext } from '../authProvider';
import { logIn } from '../../utils/user';
import { customerShippingBilling } from '../../api/requestAddress';
import styles from './EntryDataForm.module.scss';
import { PAGES } from '../../constants/pages';
import { setBillShipp } from './utils/takeDataForm';
import { clientSignIn, registerNewCustomer } from '../../api/customers';
import { asyncCartDeleteAnonim, cartCustomDraft } from '../Cart/useItemCart';

export const EntryDataForm = (): JSX.Element => {
  const [visible, setVisible] = useState<boolean>(false);
  const toSignInPage = useNavigate();
  const toMainPage = useNavigate();
  const onOfPoUpForm = (): void => {
    handleRegistration();
  };
  const [registrationMessage, setRegistrationMessage] = useState<string | null>(
    null,
  );
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const { setIsAuth } = useContext(AuthContext);

  const handleRegistration = (): void => {
    registerNewCustomer(newCustomerData)
      .then(data => {
        setRegistrationMessage(
          `Welcome ${data.body.customer.firstName} ${data.body.customer.lastName}`,
        );
        setVisible(true);
        logIn(data);
        setShowSuccessMessage(true);
        if (setBillShipp.includes(true)) {
          let id01 = data.body.customer.addresses[0].id as string;
          let id02 = setBillShipp[2]
            ? (data.body.customer.addresses[1].id as string)
            : '';
          customerShippingBilling(
            data.body.customer.id,
            data.body.customer.version,
            { idShipp: id01, idBill: id02 },
            setBillShipp,
          );
          count.email = newCustomerData.email;
          count.password = newCustomerData.password;
          count.switchApiRoot = false;
          clientSignIn(
            {
              email: newCustomerData.email,
              password: newCustomerData.password,
            },
            '',
          )
            .execute()
            .then(data => {
              if (count.cartAnonymID) {
                asyncCartDeleteAnonim();
                count.cartAnonymID = '';
              }
              cartCustomDraft(data.body.customer.id);
              count.cartID = data.body.cart?.id || '';
              count.versionCart = data.body.cart?.version || 1;
            })
            .catch(error => {});
        }
      })
      .catch(error => {
        console.warn(error);
        if (error.code === 400) {
          setRegistrationMessage(
            error.message + ' Log in or use another email address',
          );
          setVisible(true);
        } else {
          setRegistrationMessage(error.message + ' Should try again later');
          setVisible(true);
        }
      });
  };

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
            toMainPage(PAGES.main.route);
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
          toSignInPage(PAGES.signin.route);
        }}
      />
    </>
  );
};
export default EntryDataForm;
