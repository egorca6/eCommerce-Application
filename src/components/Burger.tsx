import React, { useState, useContext } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import styles from './Headers.module.scss';
import { AuthContext } from './authProvider';
import { AuthLinks } from './AuthLinks';

export const ShowBurger = (): JSX.Element => {
  const [visibleRight, setVisibleRight] = useState<boolean>(false);
  const { isAuth } = useContext(AuthContext);

  return (
    <div className="card">
      <div className={styles.burger__button}>
        <Button icon="pi pi-bars" onClick={(): void => setVisibleRight(true)} />
      </div>
      <Sidebar
        visible={visibleRight}
        position="right"
        onHide={(): void => setVisibleRight(false)}>
        <div className={styles.open}>
          <AuthLinks isAuth={isAuth} />
        </div>
      </Sidebar>
    </div>
  );
};
