import { GalleriaResponsiveOptions } from 'primereact/galleria';

export const LIFE_TIME_MESSAGE = 3000;
export const PRODUCT_ADD = 'Product has been added to cart';
export const PRODUCT_REMOVE = 'The product has been removed from your cart';
export const WARN_MESSAGE = 'warn';
export const SUCCESS_MESSAGE = 'success';
export const LABEL_REMOVE_BUTTON = 'Remove from cart';
export const LABEL_ADD_BUTTON = 'Add item to cart';
export const BREAKPOINTS_GALLERIA: GalleriaResponsiveOptions[] = [
  {
    breakpoint: '991px',
    numVisible: 2,
  },
  {
    breakpoint: '767px',
    numVisible: 2,
  },
  {
    breakpoint: '575px',
    numVisible: 2,
  },
];
