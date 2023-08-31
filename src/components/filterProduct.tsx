import { useState } from 'react';
import { Slider, SliderChangeEvent } from 'primereact/slider';
import { InputText } from 'primereact/inputtext';
import { FilterProducts, SortProducts, searchProducts } from '../api/Client';

export function FilterByPrice(): JSX.Element {
  const [value, setValue] = useState<[number, number]>([0, 500]);
  //
  const handleInputChange = (index: number, inputValue: string): void => {
    const updatedValue = [...value];
    updatedValue[index] = +inputValue;
    setValue(updatedValue as [number, number]);
  };

  // тесты
  // (startIndexProduct, PRODUCTS_IN_PAGE);

  // const FilterCategoryByCosmetics =
  //   'categories.id:"de4d113c-211b-439d-9771-dadd0e7b9928"';
  // const FilterCategoryByAccessories =
  //   'categories.id:"059dc4ff-dab0-4723-bc77-4be94226adb5"';
  // const FilterCategoryByBathTextiles =
  //   'categories.id:"c2788add-fc7f-449d-9119-90734f995c2a"';
  const FilterByPrice = `variants.price.centAmount:range (${
    value[0] * 100
  } to ${value[1] * 100})`;
  // const FilterByPrice = 'variants.price.centAmount:range ( 100 to 1000)';

  // ['name.en-us desc'] asc - по возрастанию\ desc по убыванию
  // const sortByName = ['name.en-us desc'];
  // const sortByPrice = 'price desc';
  // SortProducts(sortByPrice).then(data => {
  //   console.log('сортировка = ', data.body.results);
  // });

  FilterProducts(1, 6, FilterByPrice).then(data => {
    console.log('Фильтр = ', data.body.results);
  });
  const partialSearchQuery = 'cosm';
  searchProducts(partialSearchQuery) // 'name asc' - сортировка по имени в порядке возрастания
    .then(response => {
      console.log(response);
      const products = response.body.results;
      if (products.length > 0) {
        console.log('Найденные товары:');

        console.log(products);
      } else {
        console.log('Товары не найдены.');
      }
    })
    .catch(error => {
      console.error('Ошибка при поиске товаров:', error);
    });
  // searchProducts(partialSearchQuery).then(data => {
  //   console.log('Поиск = ', data.body.results);
  // });

  return (
    <div className="card flex justify-content-start">
      <div className="w-14rem">
        <span>Цена</span>
        <div className="input-container">
          <label htmlFor="fromInput">От</label>
          <InputText
            id="fromInput"
            value={value[0].toString()}
            onChange={(e): void => handleInputChange(0, e.target.value)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="toInput">До</label>
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
      </div>
    </div>
  );
}
