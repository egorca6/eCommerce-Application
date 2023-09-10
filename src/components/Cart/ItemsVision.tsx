import React, { useEffect, useState } from 'react';
import { IpropsItems } from '../../types/interface';
import styles from './CartForm.module.scss';
import {
  InputNumber,
  InputNumberValueChangeEvent,
} from 'primereact/inputnumber';
import { asyncUpdateItemCart } from './useItemCart';
import { Button } from 'primereact/button';

export default function ItemsVision(props: IpropsItems): JSX.Element {
  const [value, setValue] = useState(props.value.count);
  useEffect(() => {
    setValue(props.value.count);
  }, [props.value.count]);

  const callback = (delet: boolean, sumaItem: number): void => {
    props.editDataCart(delet, props.value.price * (sumaItem - value));
  };
  return (
    <div className={styles.cart_between_row}>
      <div>
        <div className={styles.cart_small_row}>
          <img className={styles.cart_img} src={props.value.img} alt="" />
          <div className="card flex justify-content-center">
            <InputNumber
              value={value}
              onValueChange={(e: InputNumberValueChangeEvent): void => {
                if (e.value) {
                  setValue(e.value);
                  asyncUpdateItemCart(props.value.id, e.value, callback);
                }
              }}
              showButtons
              buttonLayout="vertical"
              style={{ width: '3rem' }}
              incrementButtonIcon="pi pi-plus"
              decrementButtonIcon="pi pi-minus"
            />
          </div>
          <div>
            <p className={styles.cart_span}>
              Price:&nbsp;
              <span className="cart_span" style={{ color: 'red' }}>
                {(props.value.price / 100).toFixed(2)}
              </span>
            </p>
            <p className={styles.cart_span}>
              Total:&nbsp;
              <span className="cart_span" style={{ color: 'red' }}>
                {((props.value.price * value) / 100).toFixed(2)}
              </span>
            </p>
          </div>
        </div>
        <p className={styles.cart_span}>
          Name:&nbsp;
          <span style={{ color: 'red' }}>{props.value.name}</span>
        </p>
      </div>

      <div className={styles.list_address} style={{ padding: '0rem' }}>
        <Button
          className="mt-3 mb-1 border-round-lg"
          label="Delete"
          type="submit"
          onClick={(): void => {
            asyncUpdateItemCart(props.value.id, 0, callback);
          }}
        />
      </div>
    </div>
  );
}
