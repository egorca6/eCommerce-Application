import { PageKey } from '../types/pages';
import { AboutPage } from './AboutPage/AboutPage';
import { CartPage } from './Cart/Cart';
import { Catalog } from './CatalogPage/Catalog';
import { MainPage } from './MainPage/MainPage';
import { ProductPage } from './ProductPage/ProductPage';
import { RegistrationPage } from './RegistrationPage/RegistrationPage';
import { SignInPage } from './SignInPage/SignInPage';
import { UserProfilePage } from './UserProfilePage/UserProfilePage';

export const pagesMap: { [key in PageKey]: React.FC<{}> } = {
  main: MainPage,
  about: AboutPage,
  cart: CartPage,
  signin: SignInPage,
  registration: RegistrationPage,
  catalog: Catalog,
  profile: UserProfilePage,
  product: ProductPage,
  accessories: Catalog,
  cosmetics: Catalog,
  textiles: Catalog,
};
