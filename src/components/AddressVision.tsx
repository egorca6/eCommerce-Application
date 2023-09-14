import { IPropsAddress } from '../types/interface';
import styles from './AddressVision.module.scss';
import { count } from '../constants/registratForm';

export function AddressVision(props: IPropsAddress): JSX.Element {
  return (
    <div>
      <div className={styles.block}>
        <p className={styles.paragraph}>
          Street:&nbsp;
          <span className={styles.span}>{props.value.streetName}</span>
        </p>
        <p className={styles.paragraph}>
          City:&nbsp;
          <span className={styles.span}>{props.value.city}</span>
        </p>
        <p className={styles.paragraph}>
          Country:&nbsp;
          <span className={styles.span}>{props.value.country}</span>
        </p>
        <p className={styles.paragraph}>
          Postcode:&nbsp;
          <span className={styles.span}>{props.value.postalCode}</span>
        </p>
      </div>
      {props.value.id === count.defaultShipping && props.toDo === 'readOnly' ? (
        <label className={styles.address}>default Shipping&nbsp;&nbsp;</label>
      ) : (
        <></>
      )}
      {props.value.id === count.defaultBilling && props.toDo === 'readOnly' ? (
        <label className={styles.address}>default Billing</label>
      ) : (
        <></>
      )}
    </div>
  );
}
