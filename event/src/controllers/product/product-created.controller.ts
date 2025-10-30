import {
  ByProjectKeyRequestBuilder,
  ProductCreatedMessage
} from '@commercetools/platform-sdk';
import { ShopConfigurationData } from 'tiktok-integration-shared/build/interfaces';
import { logger } from '../../utils/logger.utils';

export const productCreated = async (
  apiRoot: ByProjectKeyRequestBuilder,
  shopConfig: ShopConfigurationData,
  message: ProductCreatedMessage,
  productId: string
): Promise<string> => {
    logger.info(`New product created: ${productId}. Skipping product creation in Tiktok until product is published.`);
    return productId;
};
