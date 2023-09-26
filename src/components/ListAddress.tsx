import { Button } from 'primereact/button';
import { ScrollPanel } from 'primereact/scrollpanel';
import { Dialog } from 'primereact/dialog';
import { RadioButton } from 'primereact/radiobutton';
import { newAddres } from '../constants/registratForm';
import { AddressVision } from './AddressVision';
import { AddressForm } from './Forms/AddressForm';
import styles from './ListAddress.module.scss';
import { useAddressLogic } from '../hooks/useListAddress';

export default function ListAddress(): JSX.Element {
  const {
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
  } = useAddressLogic();

  return (
    <div className={styles.registration_data_name}>
      <div className={styles.card}>
        <ScrollPanel style={{ width: '100%', height: '270px' }}>
          <div className="mb-5">
            {allAdress.map(adress => (
              <div className={styles.list_address} key={adress.id}>
                <AddressVision
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
        onHide={handleFormClose}>
        <div className="mb-5">
          {allAdress.map((adress, i) => (
            <div className={styles.list_address} key={adress.id}>
              <AddressVision
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
                onClick={(): void => handleDeleteAddress(adress.id)}
              />
              <label className="ml-2">&nbsp;&nbsp;</label>
              <Button
                className="mt-3 mb-1"
                label="Edit"
                onClick={(): void => handleEditAddress(newAddres[i])}
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
            onClick={handleNewAddress}
          />
          <Dialog
            className={styles.module__window}
            style={{ maxWidth: '340px' }}
            header="Notification"
            visible={visibleError}
            onHide={(): void => setVisibleError(false)}>
            <p className={styles.message}>{messageUser}</p>
          </Dialog>
        </div>
      </Dialog>
      <Button
        label="Edit and Add addresses"
        className="mt-3 mb-1"
        onClick={(): void => {
          setSwitchToDo('DefoltStart');
          renderForm('');
          setVisible(true);
        }}
      />
    </div>
  );
}
