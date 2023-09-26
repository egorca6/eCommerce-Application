import { IpropsAddres } from '../types/interface';
import styles from './AddressVision.module.scss';
import { count } from '../constants/registratForm';

export function AddressVision(props: IpropsAddres): JSX.Element {
  return (
    <div className={styles.addresses}>
      <p>
        Street:&nbsp;
        <span className={styles.span}>{props.value.streetName}</span>
      </p>
      <p>
        City:&nbsp;
        <span className={styles.span}>{props.value.city}</span>
      </p>
      <p>
        Country:&nbsp;
        <span className={styles.span}>{props.value.country}</span>
      </p>
      <p>
        Postcode:&nbsp;
        <span className={styles.span}>{props.value.postalCode}</span>
      </p>

      {props.value.id === count.defaultShipping && props.toDo === 'readOnly' ? (
        <label className={styles.default}>default Shipping&nbsp;&nbsp;</label>
      ) : (
        <></>
      )}
      {props.value.id === count.defaultBilling && props.toDo === 'readOnly' ? (
        <label className={styles.default}>default Billing</label>
      ) : (
        <></>
      )}
    </div>
  );
}
