export type PageKey =
  | 'main'
  | 'about'
  | 'cart'
  | 'signin'
  | 'registration'
  | 'catalog'
  | 'profile'
  | 'product'
  | 'textiles'
  | 'cosmetics'
  | 'accessories';

export interface Page {
  key: PageKey;
  route: string;
}
