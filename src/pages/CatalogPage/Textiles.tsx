import { ProductProjection } from '@commercetools/platform-sdk';
import { Button } from 'primereact/button';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FilterProducts } from '../../api/Client';
import { ProductItem } from '../../components/Product';
import { ID_PRODUCT_CATEGORIES } from '../../constants/api';
import { PRODUCTS_IN_PAGE } from '../../constants/common';
import { getPageCount, getPagesArray } from '../../utils/product';
import styles from './Sets.module.scss';

export const TextilesPage = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentLocation = parseInt(location.search?.split('=')[1]) || 1;

  const [products, setProducts] = useState<ProductProjection[]>();
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(currentLocation);
  const startIndexProduct = (currentPage - 1) * PRODUCTS_IN_PAGE;
  const pagesArray = getPagesArray(totalPages);

  useEffect(() => {
    setCurrentPage(currentLocation);
  }, [currentLocation]);

  useEffect(() => {
    const getCategoryProduct = async (): Promise<void> => {
      try {
        const products = await FilterProducts(
          ID_PRODUCT_CATEGORIES.textiles,
          startIndexProduct,
          PRODUCTS_IN_PAGE,
        );
        const totalCount = products.body.total;
        if (totalCount)
          setTotalPages(getPageCount(totalCount, PRODUCTS_IN_PAGE));
        setProducts(products.body.results);
      } catch (err) {
        console.error(err);
      }
    };
    getCategoryProduct();
  }, [startIndexProduct]);

  return (
    <>
      <div className={styles.content}>
        {products?.map(data => <ProductItem {...data} key={data.id} />)}
      </div>
      <div className={styles.pagination}>
        {pagesArray.map(
          (index): JSX.Element => (
            <Button
              className={
                currentPage === index
                  ? styles.paginationButtonActive
                  : styles.paginationButton
              }
              key={index}
              onClick={(): void => {
                navigate(`?page=${index}`);
              }}>
              {index}
            </Button>
          ),
        )}
      </div>
    </>
  );
};
