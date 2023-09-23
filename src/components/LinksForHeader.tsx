import { useContext } from 'react';
import { AuthContext } from './authProvider';
import { commonLinks } from './Links/Links';
import { LinksIsAuth } from './Links/LinksIsAuth';
import { LinksIsNotAuth } from './Links/LinksIsNotAuth';

export const LinksForHeader = (): JSX.Element => {
  const { isAuth } = useContext(AuthContext);

  return (
    <>
      {commonLinks}
      {isAuth ? <LinksIsAuth /> : <LinksIsNotAuth />}
    </>
  );
};
