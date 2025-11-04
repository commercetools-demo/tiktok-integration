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
