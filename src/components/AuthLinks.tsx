import {
  LinkToLogOut,
  LinkToRegistration,
  LinkToSignIn,
  commonLinks,
} from './Links';

interface AuthLinksProps {
  isAuth: boolean;
}

export const AuthLinks = ({ isAuth }: AuthLinksProps): JSX.Element => {
  return (
    <>
      {commonLinks}
      {isAuth ? (
        <LinkToLogOut />
      ) : (
        <>
          <LinkToSignIn />
          <LinkToRegistration />
        </>
      )}
    </>
  );
};
