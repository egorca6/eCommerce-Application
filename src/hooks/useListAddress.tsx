import { useState, useEffect } from 'react';
import { updateUserData } from '../components/Forms/utils/updateUserData';
import { getCustomerID } from '../api/customers';
import { setDefault, deledeAddressID } from '../api/requestAddress';
import { newAddres, count } from '../constants/registratForm';
import { IAddress } from '../types/interface';
import { AddressLogic } from '../types/hooks';

export function useAddressLogic(): AddressLogic {
  const [switchToDo, setSwitchToDo] = useState('');
  const [messageUser, setMessageUser] = useState('');
  const [addressForForm, setAddressForForm] = useState(newAddres[0]);
  const [visible, setVisible] = useState(false);
  const [visibleError, setVisibleError] = useState(false);
  const [visibleAddresForm, setVisibleAddresForm] = useState(false);
  const [allAdress, setAdress] = useState(newAddres);
  const [getDefoltShip, setDefoltShip] = useState('');
  const [getDefoltBill, setDefoltBill] = useState('');

  const renderForm = (message: string): void => {
    (async (): Promise<void> => {
      await getCustomerID(count.ID)
        .then(({ body }) => {
          updateUserData(body);
        })
        .catch(console.error);
      if (switchToDo === 'Add' || switchToDo === 'Edit') {
        setVisibleAddresForm(false);
      } else {
        setDefoltShip(count.defaultShipping);
        setDefoltBill(count.defaultBilling);
      }
      setSwitchToDo('');
      setAdress([...newAddres]);
    })();
    if (message !== '') {
      setMessageUser(message);
    }
    setVisibleError(true);
  };

  useEffect(() => {
    if (count.switchRender) {
      renderForm(
        `Your choice of default billing and shipping 
        addresses will be saved when you close the form.`,
      );
      count.switchRender = false;
    }
  }, []);

  const handleDeleteAddress = (addressId: string): void => {
    setSwitchToDo('Delete');
    setMessageUser('Address successfully deleted');
    deledeAddressID(addressId, renderForm);
  };

  const handleEditAddress = (address: IAddress): void => {
    setAddressForForm(address);
    setSwitchToDo('Edit');
    setVisibleAddresForm(true);
  };

  const handleNewAddress = (): void => {
    setAddressForForm({
      country: 'BY',
      city: '',
      id: '',
      postalCode: '',
      streetName: '',
    });
    setSwitchToDo('Add');
    setVisibleAddresForm(true);
  };

  const handleFormClose = (): void => {
    count.defaultShipping = getDefoltShip;
    count.defaultBilling = getDefoltBill;
    setDefault(getDefoltShip, getDefoltBill);
    setVisible(false);
    setMessageUser(`Your choice of default billing and shipping 
    addresses will be saved when you close the form.`);
  };

  return {
    switchToDo,
    messageUser,
    addressForForm,
    visible,
    visibleError,
    visibleAddresForm,
    allAdress,
    getDefoltShip,
    getDefoltBill,
    renderForm,
    handleDeleteAddress,
    handleEditAddress,
    handleNewAddress,
    handleFormClose,
    setDefoltShip,
    setDefoltBill,
    setVisibleAddresForm,
    setVisibleError,
    setSwitchToDo,
    setVisible,
  };
}
