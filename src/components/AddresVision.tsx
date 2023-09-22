import { IpropsAddres } from '../types/interface';
import styles from './Forms/AddressForm.module.scss';
import { count } from '../constants/registratForm';

export default function AddresVision(props: IpropsAddres): JSX.Element {
  return (
    <div>
      <p style={{ margin: '0.3rem' }}>
        Street:&nbsp;
        <span className="registration_span" style={{ color: 'red' }}>
          {props.value.streetName}
        </span>
      </p>
      <p style={{ margin: '0.3rem' }}>
        City:&nbsp;
        <span className="registration_span" style={{ color: 'red' }}>
          {props.value.city}
        </span>
      </p>
      <p style={{ margin: '0.3rem' }}>
        Country:&nbsp;
        <span className="registration_span" style={{ color: 'red' }}>
          {props.value.country}
        </span>
      </p>
      <p style={{ margin: '0.3rem' }}>
        Postcode:&nbsp;
        <span className="registration_span" style={{ color: 'red' }}>
          {props.value.postalCode}
        </span>
      </p>
      <div className={styles.list_address} style={{ padding: '0rem' }}></div>
      {props.value.id === count.defaultShipping && props.toDo === 'readOnly' ? (
        <label style={{ color: 'red' }} className="ml-2">
          default Shipping&nbsp;&nbsp;
        </label>
      ) : (
        <></>
      )}
      {props.value.id === count.defaultBilling && props.toDo === 'readOnly' ? (
        <label style={{ color: 'red' }} className="ml-2">
          default Billing
        </label>
      ) : (
        <></>
      )}
    </div>
  );
}
