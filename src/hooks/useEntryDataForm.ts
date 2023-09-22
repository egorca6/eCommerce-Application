import { Dispatch, SetStateAction, useState } from 'react';
import { clientSignIn, registerNewCustomer } from '../api/customers';
import { customerShippingBilling } from '../api/requestAddress';
import {
  asyncCartDeleteAnonim,
  cartCustomDraft,
} from '../components/Cart/useItemCart';
import { setBillShipp } from '../components/Forms/utils/takeDataForm';
import { count, newCustomerData } from '../constants/registratForm';
import { logIn } from '../utils/user';

type EntryDataFormReturn = {
  visible: boolean;
  onOfPoUpForm: () => void;
  setVisible: Dispatch<SetStateAction<boolean>>;
  showSuccessMessage: boolean;
  registrationMessage: string | null;
};

export const useEntryDataForm = (): EntryDataFormReturn => {
  const [visible, setVisible] = useState<boolean>(false);
  const onOfPoUpForm = (): void => {
    handleRegistration();
  };
  const [registrationMessage, setRegistrationMessage] = useState<string | null>(
    null,
  );
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);

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

  return {
    visible,
    onOfPoUpForm,
    setVisible,
    showSuccessMessage,
    registrationMessage,
  };
};
