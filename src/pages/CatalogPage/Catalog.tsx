import { ProductProjection } from '@commercetools/platform-sdk';
import { Button } from 'primereact/button';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FilterProducts } from '../../api/Client';
import { ProductItem } from '../../components/Product';
import { PRODUCTS_IN_PAGE } from '../../constants/common';
import { getPageCount, getPagesArray } from '../../utils/product';
import styles from './Catalog.module.scss';

export const Catalog = ({ ...filter }): JSX.Element => {
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
    //ну и вот эту функцию надо будет тоже за useEffect вынести,
    const getCategoryID = (): string | undefined => {
      const idCategory = filter.filter;
      if (idCategory.length > 0) {
        return idCategory;
      }
      return undefined;
    };

    const getCategoryProduct = async (): Promise<void> => {
      try {
        // название функции поменять на filterProducts
        const products = await FilterProducts(
          startIndexProduct,
          PRODUCTS_IN_PAGE,
          getCategoryID(),
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
  }, [startIndexProduct, filter.filter]); // filter.filter это надо будет выпилить, подумать как только

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
