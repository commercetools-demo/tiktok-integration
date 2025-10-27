import { Attribute } from '@commercetools/platform-sdk';

export interface TikTokSkuAttributeMapper {
  name: string;
  tiktokAttributeId: string;
  valueNameFetcher?: (attributes: Attribute[], locale: string) => string;
  valueIdFetcher?: (attributes: Attribute[], locale: string) => string;
}

export interface TikTokProductAttributeMapper {
  name: string;
  tiktokAttributeId: string;
  valueNamesFetcher?: (
    attributes: Attribute[],
    locale: string,
  ) => { name?: string; id?: string }[];
  valueIdsFetcher?: (
    attributes: Attribute[],
    locale: string,
  ) => { name?: string; id?: string }[];
}

export const PRODUCT_TYPE_TO_TIKTOK_SKU_ATTRIBUTE: Record<
  string,
  TikTokSkuAttributeMapper[]
> = {
  'faeb9a20-88de-43a4-84f1-501fd2dee643': [
    {
      name: 'Color',
      tiktokAttributeId: '100000',
      valueNameFetcher: (attributes: Attribute[], locale: string) =>
        attributes.find((attribute) => attribute.name === 'color')?.value?.[
          locale
        ],
    },
  ],
};

export const PRODUCT_TYPE_TO_TIKTOK_PRODUCT_ATTRIBUTE: Record<
  string,
  TikTokProductAttributeMapper[]
> = {
  'faeb9a20-88de-43a4-84f1-501fd2dee643': [
    {
      name: 'Dangerous Goods Or Hazardous Materials',
      tiktokAttributeId: '101619',
      valueIdsFetcher: (_attributes: Attribute[], _locale: string) => {
        // No
        return [{ id: '1000059' }];
      },
    },
  ],
};

export const FALLBACK_PACKAGE_WEIGHT_VALUE = '1.00';
export const FALLBACK_PACKAGE_WEIGHT_UNIT = 'POUND';
export const USE_NO_CHANNEL_FOR_INVENTORY_FALLBACK = false;
export const USE_NO_CHANNEL_FOR_LIST_PRICE = true;
export const USE_NO_CHANNEL_FOR_MAIN_PRICE = false;

export const FALLBACK_PACKAGE_DIMENSIONS_HEIGHT = '2';
export const FALLBACK_PACKAGE_DIMENSIONS_LENGTH = '2';
export const FALLBACK_PACKAGE_DIMENSIONS_WIDTH = '2';
export const FALLBACK_PACKAGE_DIMENSIONS_UNIT = 'INCH';

export const ATTRIBUTE_KEY_PACKAGE_WEIGHT_UNIT = 'weightUnit';
export const ATTRIBUTE_KEY_PACKAGE_WEIGHT_VALUE = 'weightValue';
export const ATTRIBUTE_KEY_PACKAGE_DIMENSIONS_HEIGHT = 'heightValue';
export const ATTRIBUTE_KEY_PACKAGE_DIMENSIONS_LENGTH = 'lengthValue';
export const ATTRIBUTE_KEY_PACKAGE_DIMENSIONS_WIDTH = 'widthValue';
export const ATTRIBUTE_KEY_PACKAGE_DIMENSIONS_UNIT = 'dimensionUnit';
