import { ProductPublishedMessage, ProductUnpublishedMessage, ProductSlugChangedMessage, ByProjectKeyRequestBuilder, ProductProjection } from "@commercetools/platform-sdk";
import { CommercetoolsClient, CommercetoolsStorage, Utils } from "tiktok-integration-shared";
import { logger } from "../../utils/logger.utils";

export const productPublished = async (apiRoot: ByProjectKeyRequestBuilder, message: ProductPublishedMessage, product: ProductProjection): Promise<string> => {
  const productId = product.id;
  const shopConfig = await CommercetoolsStorage.ShopConfigController.getShopConfiguration(apiRoot, process.env.TIKTOK_APP_KEY as string);
  
  logger.info(`Product ${productId} published`);
  
  // TODO: 1. fetch product by sku from tiktok
  // 2. update product status/availability in tiktok
  return productId;
}

export const productUnpublished = async (apiRoot: ByProjectKeyRequestBuilder, message: ProductUnpublishedMessage, product: ProductProjection): Promise<string> => {
  const productId = product.id;
  const shopConfig = await CommercetoolsStorage.ShopConfigController.getShopConfiguration(apiRoot, process.env.TIKTOK_APP_KEY as string);
  
  logger.info(`Product ${productId} unpublished`);
  
  // TODO: 1. fetch product by sku from tiktok
  // 2. update product status/availability in tiktok (set to inactive)
  return productId;
}

export const productSlugChanged = async (apiRoot: ByProjectKeyRequestBuilder, message: ProductSlugChangedMessage, product: ProductProjection): Promise<string> => {
  const productId = product.id;
  const shopConfig = await CommercetoolsStorage.ShopConfigController.getShopConfiguration(apiRoot, process.env.TIKTOK_APP_KEY as string);
  
  logger.info(`Product ${productId} slug changed from ${message.oldSlug} to ${message.slug}`);
  
  // TODO: 1. fetch product by sku from tiktok
  // 2. update product slug/URL in tiktok if applicable
  return productId;
}

