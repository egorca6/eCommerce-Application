import { Button } from 'primereact/button';
import { ScrollPanel } from 'primereact/scrollpanel';
import { AddressVision } from './AddressVision';
import styles from './ListAddress.module.scss';
import { useAddressLogic } from '../hooks/useListAddress';
import { ListAddressDialog } from './ListDialog';

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
      <ListAddressDialog
        switchToDo={switchToDo}
        messageUser={messageUser}
        addressForForm={addressForForm}
        visible={visible}
        visibleError={visibleError}
        visibleAddresForm={visibleAddresForm}
        allAdress={allAdress}
        getDefoltShip={getDefoltShip}
        getDefoltBill={getDefoltBill}
        renderForm={renderForm}
        handleDeleteAddress={handleDeleteAddress}
        handleEditAddress={handleEditAddress}
        handleNewAddress={handleNewAddress}
        handleFormClose={handleFormClose}
        setDefoltShip={setDefoltShip}
        setDefoltBill={setDefoltBill}
        setVisibleAddresForm={setVisibleAddresForm}
        setVisibleError={setVisibleError}
      />
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
