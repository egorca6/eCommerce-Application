export type PageKey =
  | 'main'
  | 'about'
  | 'cart'
  | 'signin'
  | 'registration'
  | 'catalog'
  | 'profile';

export interface Page {
  key: PageKey;
  route: string;
}
