import { Aside } from '../../components/Aside';
import styles from './MainPage.module.scss';

export const MainPage = (): JSX.Element => {
  return (
    <>
      <div className={styles.page}>
        <Aside />
        <div className={styles.page__content}>
          <div className={styles.page__header}>
            <p>The best items</p>
            <p>&nbsp; for your bath</p>
          </div>
          <h1>Main page</h1>
          <p>This is main page</p>
        </div>
      </div>
    </>
  );
};
