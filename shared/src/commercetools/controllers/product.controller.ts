import {
  ByProjectKeyRequestBuilder,
  ProductProjection,
  ProductProjectionPagedQueryResponse,
} from '@commercetools/platform-sdk';
import { ShopConfigurationData } from '../../interfaces';
import { fetchAllEntitiesRecusively } from '../../utils/fetch-all';


const getProducts = async (
  apiRoot: ByProjectKeyRequestBuilder,
  shopConfiguration: ShopConfigurationData,
  limit: number = 100,
  offset: number = 0,
): Promise<ProductProjectionPagedQueryResponse> => {
  return apiRoot
  .productProjections()
  .get({
    queryArgs: {
      ...(shopConfiguration.ctStoreKey && {storeProjection: shopConfiguration.ctStoreKey}),
      limit: limit,
      offset: offset,
    },
  })
  .execute()
  .then((response) => response.body);
};


export const getAllProducts = async (
  apiRoot: ByProjectKeyRequestBuilder,
  shopConfiguration?: ShopConfigurationData | null,
): Promise<ProductProjectionPagedQueryResponse> => {
  if (!shopConfiguration) {
    throw new Error('Shop configuration is required to fetch all products');
  }
  
  return fetchAllEntitiesRecusively<ProductProjection>(apiRoot, shopConfiguration, getProducts);
};

export const getProduct = async (
  apiRoot: ByProjectKeyRequestBuilder,
  productId: string,
  shopConfiguration?: ShopConfigurationData | null,
): Promise<ProductProjection | null> => {
  if (!shopConfiguration) {
    return apiRoot
      .productProjections()
      .withId({ ID: productId })
      .get()
      .execute()
      .then((response) => response.body)
      .catch(() => {
        return null;
      });
  }
  if (shopConfiguration?.ctStoreKey) {
    return apiRoot
      .inStoreKeyWithStoreKeyValue({ storeKey: shopConfiguration.ctStoreKey })
      .productProjections()
      .withId({ ID: productId })
      .get()
      .execute()
      .then((response) => response.body)
      .catch(() => {
        return null;
      });
  }
  return apiRoot
    .productProjections()
    .withId({ ID: productId })
    .get()
    .execute()
    .then((response) => response.body)
    .catch(() => {
      return null;
    });
};
