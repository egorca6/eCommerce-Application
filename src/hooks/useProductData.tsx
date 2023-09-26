import { useEffect, useState } from 'react';
import { getProductByKey } from '../api/products';
import { covertPrice } from '../utils/product';
import { FIRST_INDEX } from '../constants/common';
import { count } from '../constants/registratForm';
import { ProductData } from '../types/hooks';

export function useProductData(keyProduct: string): ProductData {
  const [productData, setProductData] = useState<ProductData>({
    images: [],
    nameProduct: '',
    descriptionProduct: '',
    typeProduct: '',
    priceProductDiscount: '',
    priceFullProduct: '',
  });

  useEffect(() => {
    getProductByKey(keyProduct)
      .then(data => {
        count.productItemId = data.body.id;
        const pathToPhoto = data.body.masterVariant.images;
        const productName = data.body.name['en-US'];
        const productDescription = data.body.description?.['en-US'];
        const productType =
          data.body.masterVariant.attributes?.[FIRST_INDEX].name;
        const productPriceDiscounted =
          data.body.masterVariant.prices?.[FIRST_INDEX].discounted?.value
            .centAmount;
        const productPriceFull =
          data.body.masterVariant.prices?.[FIRST_INDEX].value.centAmount;
        if (
          productPriceFull &&
          pathToPhoto &&
          productDescription &&
          productType &&
          productPriceDiscounted
        ) {
          const productPriceFullConvert = covertPrice(productPriceFull);
          const productPriceConvert = covertPrice(productPriceDiscounted);

          setProductData({
            images: pathToPhoto,
            nameProduct: productName,
            descriptionProduct: productDescription,
            typeProduct: productType,
            priceProductDiscount: productPriceConvert,
            priceFullProduct: productPriceFullConvert,
          });
        }
      })
      .catch(error => {
        console.warn('Произошла ошибка при получении данных:', error);
      });
  }, [keyProduct]);

  return productData;
}
