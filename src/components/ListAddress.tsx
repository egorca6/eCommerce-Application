import { Button } from 'primereact/button';
import { ScrollPanel } from 'primereact/scrollpanel';
import { Dialog } from 'primereact/dialog';
import { RadioButton } from 'primereact/radiobutton';
import { useState } from 'react';
import { IAddress } from '../types/interface';
import { newAddres, count } from '../constants/registratForm';
import { deledeAddressID, setDefault } from '../api/requestAddress';
import { getCustomerID } from '../api/customers';
import AddresVision from './AddresVision';
import AddressForm from './Forms/AddressForm';
import styles from './Forms/AddressForm.module.scss';
import { updateUserData } from './Forms/utils/updateUserData';

let switchToDo = '';
let messageUser = '';
let addressForForm: IAddress = newAddres[0];
export default function ListAddress(): JSX.Element {
  const [visible, setVisible] = useState<boolean>(false);
  const [visibleError, setVisibleError] = useState<boolean>(false);
  const [visibleAddresForm, setVisibleAddresForm] = useState(false);
  const [allAdress, setAdress] = useState(newAddres);
  const [getDefoltShip, setDefoltShip] = useState<string>('');
  const [getDefoltBill, setDefoltBill] = useState<string>('');

  const renderForm = (errorMessage: string): void => {
    (async (): Promise<void> => {
      await getCustomerID(count.ID)
        .then(({ body }) => {
          updateUserData(body);
          console.log(body);
        })
        .catch(console.error);
      if (switchToDo === 'Add' || switchToDo === 'Edit') {
        setVisibleAddresForm(false);
      } else {
        // if (switchToDo === 'DefoltStart') {
        setDefoltShip(count.defaultShipping);
        setDefoltBill(count.defaultBilling);
        // }
      }
      switchToDo = '';
      setAdress([...newAddres]);
    })();
    if (errorMessage !== '') {
      messageUser = errorMessage;
    }
    setVisibleError(true);
  };
  if (count.switchRender) {
    renderForm(
      `Your choice of default billing and shipping 
      addresses will be saved when you close the form.`,
    );
    count.switchRender = false;
  }

  return (
    <div className={styles.registration_data_name}>
      <div
        className="card"
        style={{
          minWidth: '274px',
          margin: '5px',
          padding: '0.5rem',
          border: '0.05vw',
          borderStyle: 'solid',
          borderColor: '$color-brown',
          borderRadius: '8px',
        }}>
        <ScrollPanel style={{ width: '100%', height: '270px' }}>
          <div className="mb-5">
            {allAdress.map(adress => (
              <div className={styles.list_address} key={adress.id}>
                <AddresVision
                  value={{
                    country: adress.country,
                    city: adress.city,
                    postalCode: adress.postalCode,
                    streetName: adress.streetName,
                    id: adress.id,
                  }}
                  toDo={'readOnly'}
                  closeForm={renderForm}
                />
              </div>
            ))}
          </div>
        </ScrollPanel>
      </div>
      <Dialog
        header="My addresses"
        visible={visible}
        style={{ maxWidth: '80vw' }}
        onHide={(): void => {
          count.defaultShipping = getDefoltShip;
          count.defaultBilling = getDefoltBill;
          setDefault(getDefoltShip, getDefoltBill);
          setVisible(false);
          messageUser = `Your choice of default billing and shipping 
          addresses will be saved when you close the form.`;
        }}>
        <div className="mb-5">
          {allAdress.map((adress, i) => (
            <div className={styles.list_address} key={adress.id}>
              <AddresVision
                value={{
                  country: adress.country,
                  city: adress.city,
                  postalCode: adress.postalCode,
                  streetName: adress.streetName,
                  id: adress.id,
                }}
                toDo={''}
                closeForm={renderForm}
              />
              <div className="flex align-items-center">
                <RadioButton
                  inputId="getDefoltShip"
                  name="Ship"
                  value={adress.id}
                  onChange={(e): void => {
                    setDefoltShip(e.value);
                  }}
                  checked={getDefoltShip === adress.id}
                />
                <label className="ml-2">defolt Shipp&nbsp;&nbsp;</label>
                <RadioButton
                  inputId="getDefoltBill"
                  name="Bill"
                  value={adress.id}
                  onChange={(e): void => {
                    setDefoltBill(e.value);
                  }}
                  checked={getDefoltBill === adress.id}
                />
                <label className="ml-2">defolt Bill</label>
              </div>
              <Button
                severity="danger"
                className="mt-3 mb-1"
                label="Delete"
                onClick={(): void => {
                  switchToDo = 'Delete';
                  messageUser = 'Address successfully deleted';
                  deledeAddressID(adress.id, renderForm);
                }}
              />
              <label className="ml-2">&nbsp;&nbsp;</label>
              <Button
                className="mt-3 mb-1"
                label="Edit"
                onClick={(): void => {
                  addressForForm = newAddres[i];
                  switchToDo = 'Edit';
                  setVisibleAddresForm(true);
                }}
              />
            </div>
          ))}
        </div>
        <div className="mb-5">
          <Dialog
            // header="Enter address"
            visible={visibleAddresForm}
            style={{ maxWidth: '74vw' }}
            onHide={(): void => setVisibleAddresForm(false)}>
            <AddressForm
              value={addressForForm}
              toDo={switchToDo}
              closeForm={renderForm}
            />
          </Dialog>
          <Button
            className="mt-3 mb-1"
            label="New Address"
            onClick={(): void => {
              addressForForm = {
                country: 'BY',
                city: '',
                id: '',
                postalCode: '',
                streetName: '',
              };
              switchToDo = 'Add';
              setVisibleAddresForm(true);
            }}
          />
          <Dialog
            className={styles.module__window}
            style={{ maxWidth: '340px' }}
            header="Notification"
            visible={visibleError}
            onHide={(): void => {
              setVisibleError(false);
            }}>
            <p className={styles.message}>{messageUser}</p>
          </Dialog>
        </div>
      </Dialog>
      <Button
        label="Edit and Add addresses"
        className="mt-3 mb-1"
        onClick={(): void => {
          switchToDo = 'DefoltStart';
          renderForm('');
          setVisible(true);
        }}
      />
    </div>
  );
}
