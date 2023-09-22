import { useContext } from 'react';
import { AuthContext } from './authProvider';
import { commonLinks, LinksIsNotAuth, LinksIsAuth } from './Links';

export const LinksForHeader = (): JSX.Element => {
  const { isAuth } = useContext(AuthContext);

  return (
    <>
      {commonLinks}
      {isAuth ? <LinksIsAuth /> : <LinksIsNotAuth />}
    </>
  );
};
