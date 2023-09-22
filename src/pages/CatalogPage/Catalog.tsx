import { ProductProjection } from '@commercetools/platform-sdk';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { MenuItem } from 'primereact/menuitem';
import { Slider, SliderChangeEvent } from 'primereact/slider';
import { ToggleButton, ToggleButtonChangeEvent } from 'primereact/togglebutton';
import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { getProducts } from '../../api/products';
import { ProductItem } from '../../components/Product';
import { PRODUCTS_IN_PAGE } from '../../constants/common';
import { PAGES } from '../../constants/pages';
import { FilterParams } from '../../types/types';
import { getPageCount, getPagesArray } from '../../utils/product';
import styles from './Catalog.module.scss';

export const Catalog = ({ ...options }): JSX.Element => {
  const idCategory = options.options.id;
  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();
  const currentLocation = searchParams.get('page') || '1';

  const [products, setProducts] = useState<ProductProjection[]>();
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<string>(currentLocation);
  const startIndexProduct = (Number(currentPage) - 1) * PRODUCTS_IN_PAGE;
  const pagesArray = getPagesArray(totalPages);

  const [checkedPrice, setCheckedPrice] = useState<boolean>();
  const [checkedName, setCheckedName] = useState<boolean>();
  const sortedPrice = checkedPrice ? 'price desc' : 'price asc';
  const sortedName = checkedName ? 'name.en-us desc' : 'name.en-us asc';

  const [filterPriceMinMax, setFilterPriceMinMax] = useState<[number, number]>([
    0, 500,
  ]);

  const handleInputChange = (index: number, inputValue: string): void => {
    const updatedValue = [...filterPriceMinMax];
    updatedValue[index] = +inputValue;
    setFilterPriceMinMax(updatedValue as [number, number]);
  };

  const filterByPrice = `variants.price.centAmount:range (${
    filterPriceMinMax[0] * 100
  } to ${filterPriceMinMax[1] * 100})`;

  const [filterParams, setFilterParams] = useState<FilterParams[]>([]);

  useEffect(() => {
    setCurrentPage(currentLocation);
  }, [currentLocation]);

  useEffect(() => {
    const getCategoryProduct = async (): Promise<void> => {
      try {
        const params = Object.fromEntries(
          filterParams.map(n => [n.name, n.value]),
        );

        const products = await getProducts(
          startIndexProduct,
          PRODUCTS_IN_PAGE,
          [idCategory, params.priceFilter],
          params.sort,
          params.searchText,
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
  }, [startIndexProduct, idCategory, filterParams]);

  const [resetFilters, setResetFilters] = useState<boolean>(false);

  useEffect(() => {
    if (resetFilters) {
      handleButtonSubmit();
      setResetFilters(false);
    }
  }, [resetFilters]);

  const handleButtonSubmit = (): void => {
    setFilterParams(currentArray => [
      ...currentArray.filter(el => el.name !== 'priceFilter'),
      { name: 'priceFilter', value: filterByPrice },
    ]);
    setResetFilters(true);
  };

  const items: MenuItem[] = [];
  const home: MenuItem = { icon: 'pi pi-home', url: '/' };
  const locationPage = location.search?.split('=')[1];

  location.pathname.split('/').forEach(path => {
    if (path === PAGES.catalog.key) {
      items.push({ label: `${path}`, url: `/${path}` });
    }
    if (path.length && path !== PAGES.catalog.key) {
      items.push({ label: `${path}`, url: `${path}` });
    }
  });
  if (locationPage) items.push({ label: `page ${locationPage}` });

  return (
    <div className={styles.content_main}>
      <div>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            style={{ width: '12rem' }}
            placeholder="Search"
            onChange={(event): void => {
              event.target.value.length >= 3
                ? setFilterParams(currentArray => [
                    ...currentArray.filter(el => el.name !== 'searchText'),
                    { name: 'searchText', value: event.target.value },
                  ])
                : setFilterParams(currentArray => [
                    ...currentArray.filter(el => el.name !== 'searchText'),
                    { name: 'searchText', value: '' },
                  ]);
            }}
          />
        </span>
        <div className="card flex justify-content-start">
          <div className="w-14rem">
            {/* <span>Price</span> */}
            <div className="input-container">
              <p style={{ margin: '0px' }}>Price From</p>
              <InputText
                style={{ width: '12rem' }}
                id="fromInput"
                value={filterPriceMinMax[0].toString()}
                onChange={(e): void => handleInputChange(0, e.target.value)}
              />
            </div>
            <div className="input-container">
              <p style={{ margin: '0px' }}>To</p>
              <InputText
                style={{ width: '12rem' }}
                id="toInput"
                value={filterPriceMinMax[1].toString()}
                onChange={(e): void => handleInputChange(1, e.target.value)}
              />
            </div>
            <Slider
              style={{ width: '12rem' }}
              value={filterPriceMinMax}
              onChange={(e: SliderChangeEvent): void =>
                setFilterPriceMinMax(e.value as [number, number])
              }
              range
            />
            <Button
              style={{ margin: '10px 0px' }}
              label="Filter Price"
              onClick={handleButtonSubmit}
            />
            <Button
              icon="pi pi-times"
              rounded
              text
              onClick={(): void => {
                setFilterPriceMinMax([0, 500]);
                setResetFilters(true);
              }}
              severity="danger"
              aria-label="User"
            />
          </div>
        </div>
      </div>

      <div className="card">
        <ToggleButton
          checked={checkedPrice}
          onLabel="Price"
          offLabel="Price"
          onIcon="pi pi-arrow-up"
          offIcon="pi pi-arrow-down"
          onChange={(e: ToggleButtonChangeEvent): void => {
            setCheckedPrice(e.value);
            setCheckedName(false);
            setFilterParams(currentArray => [
              ...currentArray.filter(el => el.name !== 'sort'),
              { name: 'sort', value: sortedPrice },
            ]);
          }}
          className="w-8rem"
        />
        <ToggleButton
          checked={checkedName}
          onLabel="Name"
          offLabel="Name"
          onIcon="pi pi-arrow-up"
          offIcon="pi pi-arrow-down"
          onChange={(e: ToggleButtonChangeEvent): void => {
            setCheckedName(e.value);
            setCheckedPrice(false);
            setFilterParams(currentArray => [
              ...currentArray.filter(el => el.name !== 'sort'),
              { name: 'sort', value: sortedName },
            ]);
          }}
          className="w-8rem"
        />
        <div className={styles.main}>
          <BreadCrumb model={items} home={home} className={styles.breadcrumb} />
          <div className={styles.content}>
            {products?.map(data => <ProductItem {...data} key={data.id} />)}
          </div>
          <div className={styles.pagination}>
            {pagesArray.map(
              (index): JSX.Element => (
                <Button
                  className={
                    currentPage === index.toString()
                      ? styles.paginationButtonActive
                      : styles.paginationButton
                  }
                  key={index}
                  onClick={(): void => {
                    setSearchParams({ page: index.toString() });
                  }}>
                  {index}
                </Button>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
