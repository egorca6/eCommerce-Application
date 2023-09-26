import { Link } from 'react-router-dom';
import { PAGES } from '../../constants/pages';
import styles from './ErrorPage.module.scss';

export const ErrorPage = (): JSX.Element => {
  return (
    <div className={styles.page}>
      <div className={styles.page__content}>
        <p>
          This page was not found, return to the
          <Link to={PAGES.main.route}>main page</Link>?
        </p>
      </div>
    </div>
  );
};
