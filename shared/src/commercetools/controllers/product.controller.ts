import {
  ByProjectKeyRequestBuilder,
  ProductProjection,
} from '@commercetools/platform-sdk';
import { ShopConfigurationData } from '../../interfaces';

export const getProduct = async (
  apiRoot: ByProjectKeyRequestBuilder,
  productId: string,
  shopConfiguration?: ShopConfigurationData | null,
): Promise<ProductProjection> => {
  if (!shopConfiguration) {
    return apiRoot
      .productProjections()
      .withId({ ID: productId })
      .get()
      .execute()
      .then((response) => response.body);
  }
  if (shopConfiguration?.ctStoreKey) {
    return apiRoot
      .inStoreKeyWithStoreKeyValue({ storeKey: shopConfiguration.ctStoreKey })
      .productProjections()
      .withId({ ID: productId })
      .get({
        queryArgs: {
          priceCountry: shopConfiguration.shop_region,
          priceChannel: shopConfiguration.ctDistributionChannelId,
        },
      })
      .execute()
      .then((response) => response.body);
  }
  return apiRoot
    .productProjections()
    .withId({ ID: productId })
    .get({
      queryArgs: {
        priceCountry: shopConfiguration.shop_region,
        priceChannel: shopConfiguration.ctDistributionChannelId,
      },
    })
    .execute()
    .then((response) => response.body);
};
