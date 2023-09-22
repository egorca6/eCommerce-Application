import { commonLinks, LinksIsNotAuth, LinksIsAuth } from './Links';

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
