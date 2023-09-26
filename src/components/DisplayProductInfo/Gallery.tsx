import React, { useRef } from 'react';
import { Galleria, GalleriaResponsiveOptions } from 'primereact/galleria';
import { Image as ImageSDK } from '@commercetools/platform-sdk';
import { BREAKPOINTS_GALLERIA } from '../../constants/product';
import { ProductImagesGalleryProps } from '../../types/interface';
import styles from './DisplayProductInfo.module.scss';

export function ProductImagesGallery({
  images,
}: ProductImagesGalleryProps): JSX.Element {
  const galleria = useRef<Galleria>(null);

  const handleImageClick = (): void => {
    galleria.current?.show();
  };

  const itemTemplate = (item: ImageSDK): JSX.Element => {
    return (
      <img
        src={item.url}
        alt={item.label}
        style={{ width: '100%', display: 'block' }}
        onClick={handleImageClick}
      />
    );
  };

  const thumbnailTemplate = (item: ImageSDK): JSX.Element => {
    return <img src={item.url} alt={item.label} style={{ width: '50%' }} />;
  };
  const responsiveOptions: GalleriaResponsiveOptions[] = BREAKPOINTS_GALLERIA;
  return (
    <div>
      <Galleria
        value={images}
        responsiveOptions={responsiveOptions}
        numVisible={2}
        circular
        style={{ maxWidth: '500px' }}
        showItemNavigators
        showItemNavigatorsOnHover
        item={itemTemplate}
        thumbnail={thumbnailTemplate}
      />
      <Galleria
        ref={galleria}
        value={images}
        numVisible={2}
        style={{ maxWidth: '100%' }}
        className={styles.enlarged}
        circular
        fullScreen
        showItemNavigators
        showThumbnails={false}
        item={itemTemplate}
        thumbnail={thumbnailTemplate}
      />
    </div>
  );
}
