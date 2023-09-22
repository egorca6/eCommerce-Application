import { getCategoryProducts } from '../api/products';
import { CENTS_PER_EURO, POPULAR_PRODUCTS_IN_PAGE } from '../constants/common';
import { CategoryProduct } from '../types/types';

export const covertPrice = (price: number): string => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(price / CENTS_PER_EURO);
};

export const getCategoriesOfProducts = async (): Promise<CategoryProduct[]> => {
  const arr: CategoryProduct[] = [];
  const allCategoryProduct = await getCategoryProducts();
  allCategoryProduct.body.results.forEach(category => {
    const name = category.name?.['en-US'];
    const id = category.id;
    arr.push({ name: name, id: id });
  });
  return arr;
};

export const getPageCount = (
  totalProducts: number,
  productInPages: number,
): number => {
  return Math.ceil(totalProducts / productInPages);
};

export const getPagesArray = (totalPages: number): number[] => {
  let result = [];
  for (let i = 0; i < totalPages; i++) {
    result.push(i + 1);
  }
  return result;
};

export const indexRandomProducts = (num: number): number => {
  const index = Math.floor(Math.random() * num) - POPULAR_PRODUCTS_IN_PAGE;
  if (index >= 0) {
    return index;
  }
  return 0;
};
