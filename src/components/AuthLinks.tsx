import { commonLinks } from './Links/Links';
import { LinksIsAuth } from './Links/LinksIsAuth';
import { LinksIsNotAuth } from './Links/LinksIsNotAuth';

interface AuthLinksProps {
  isAuth: boolean;
}

export const AuthLinks = ({ isAuth }: AuthLinksProps): JSX.Element => {
  return (
    <>
      {commonLinks}
      {isAuth ? <LinksIsAuth /> : <LinksIsNotAuth />}
    </>
  );
};
