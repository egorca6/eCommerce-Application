import { Dialog } from 'primereact/dialog';
import { RadioButton } from 'primereact/radiobutton';
import { Button } from 'primereact/button';
import { AddressVision } from './AddressVision';
import { AddressForm } from './Forms/AddressForm';
import styles from './ListAddress.module.scss';
import { AddressDialog } from '../types/hooks';
import { newAddres } from '../constants/registratForm';

export function ListAddressDialog({
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
}: AddressDialog): JSX.Element {
  return (
    <Dialog
      header="My addresses"
      visible={visible}
      style={{ maxWidth: '80vw' }}
      onHide={handleFormClose}>
      <div className="mb-5">
        {allAdress.map((address, i) => (
          <div className={styles.list_address} key={address.id}>
            <AddressVision
              value={{
                country: address.country,
                city: address.city,
                postalCode: address.postalCode,
                streetName: address.streetName,
                id: address.id,
              }}
              toDo={''}
              closeForm={renderForm}
            />
            <div className="flex align-items-center">
              <RadioButton
                inputId={`getDefoltShip_${address.id}`}
                name="Ship"
                value={address.id}
                onChange={(e): void => {
                  setDefoltShip(e.value);
                }}
                checked={getDefoltShip === address.id}
              />
              <label className="ml-2">defolt Shipp&nbsp;&nbsp;</label>
              <RadioButton
                inputId={`getDefoltBill_${address.id}`}
                name="Bill"
                value={address.id}
                onChange={(e): void => {
                  setDefoltBill(e.value);
                }}
                checked={getDefoltBill === address.id}
              />
              <label className="ml-2">defolt Bill</label>
            </div>
            <Button
              severity="danger"
              className="mt-3 mb-1"
              label="Delete"
              onClick={(): void => handleDeleteAddress(address.id)}
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
  );
}
