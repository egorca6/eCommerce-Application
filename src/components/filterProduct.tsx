import { useState } from 'react';
import { Slider, SliderChangeEvent } from 'primereact/slider';
import { InputText } from 'primereact/inputtext';
import { FilterProducts, SortProducts, searchProducts } from '../api/Client';
import { ToggleButton, ToggleButtonChangeEvent } from 'primereact/togglebutton';
import { ProductProjection } from '@commercetools/platform-sdk';
import { ProductItem } from './Product';
import { Button } from 'primereact/button';
import styles from './filterProduct.module.scss';
import { PRODUCTS_IN_PAGE } from '../constants/common';
import { useLocation } from 'react-router-dom';

export function FilterByPrice(): JSX.Element {
  const [value, setValue] = useState<[number, number]>([0, 500]);
  const [checked, setChecked] = useState<boolean>(false);
  const [checked2, setChecked2] = useState<boolean>(false);
  const [sortAscending, setSortAscending] = useState<boolean>(true);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [products, setProducts] = useState<ProductProjection[]>();
  const location = useLocation();
  const currentLocation = parseInt(location.search?.split('=')[1]) || 1;
  const [currentPage, setCurrentPage] = useState<number>(currentLocation);
  const startIndexProduct = (currentPage - 1) * PRODUCTS_IN_PAGE;

  const handleInputChange = (index: number, inputValue: string): void => {
    const updatedValue = [...value];
    updatedValue[index] = +inputValue;
    setValue(updatedValue as [number, number]);
  };

  const handleButtonSubmit = (): void => {
    fetchProducts(value);
    setButtonClicked(true);
  };

  const handleInputSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    searchProductsAll(e.target.value);
  };

  const searchProductsAll = async (
    partialSearchQuery: string,
  ): Promise<void> => {
    try {
      const newProducts = await searchProducts(partialSearchQuery);
      setProducts(newProducts.body.results);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProducts = async (priceRange: [number, number]): Promise<void> => {
    try {
      const FilterByPrice = `variants.price.centAmount:range (${
        priceRange[0] * 100
      } to ${priceRange[1] * 100})`;
      const newProducts = await FilterProducts(
        startIndexProduct,
        PRODUCTS_IN_PAGE,
        FilterByPrice,
      );
      setProducts(newProducts.body.results);
    } catch (err) {
      console.error(err);
    }
  };

  const sortAllProductsByPrice = async (): Promise<void> => {
    try {
      const sortOption = sortAscending ? 'price desc' : 'price asc';
      const newProducts = await SortProducts(
        sortOption,
        startIndexProduct,
        PRODUCTS_IN_PAGE,
      );
      setProducts(newProducts.body.results);
      setSortAscending(!sortAscending);
    } catch (err) {
      console.error(err);
    }
  };

  const sortAllProductsByName = async (): Promise<void> => {
    try {
      const sortOption = sortAscending
        ? ['name.en-us desc']
        : ['name.en-us asc'];
      const newProducts = await SortProducts(
        sortOption,
        startIndexProduct,
        PRODUCTS_IN_PAGE,
      );
      setProducts(newProducts.body.results);
      setSortAscending(!sortAscending);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className={styles.wrapper}>
        <div className="card flex justify-content-start">
          <div className="w-14rem">
            <span>Цена</span>
            <div className="input-container">
              <label htmlFor="fromInput">From</label>
              <InputText
                id="fromInput"
                value={value[0].toString()}
                onChange={(e): void => handleInputChange(0, e.target.value)}
              />
            </div>
            <div className="input-container">
              <label htmlFor="toInput">To</label>
              <InputText
                id="toInput"
                value={value[1].toString()}
                onChange={(e): void => handleInputChange(1, e.target.value)}
              />
            </div>
            <Slider
              value={value}
              onChange={(e: SliderChangeEvent): void =>
                setValue(e.value as [number, number])
              }
              className="w-14rem"
              range
            />
            <Button label="Filter Price" onClick={handleButtonSubmit} />
          </div>
        </div>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText placeholder="Search" onChange={handleInputSearch} />
        </span>
        <ToggleButton
          checked={checked}
          onLabel="Price"
          offLabel="Price"
          onIcon="pi pi-arrow-up"
          offIcon="pi pi-arrow-down"
          onChange={(e: ToggleButtonChangeEvent): void => {
            sortAllProductsByPrice();
            setChecked(e.value);
          }}
          className="w-8rem"
        />
        <ToggleButton
          checked={checked2}
          onLabel="Name"
          offLabel="Name"
          onIcon="pi pi-arrow-up"
          offIcon="pi pi-arrow-down"
          onChange={(e: ToggleButtonChangeEvent): void => {
            sortAllProductsByName();
            setChecked2(e.value);
          }}
          className="w-8rem"
        />
        <div className="card flex justify-content-center"></div>
      </div>
      <div className={styles.content}>
        {products?.map(data => <ProductItem {...data} key={data.id} />)}
      </div>
    </div>
  );
}
