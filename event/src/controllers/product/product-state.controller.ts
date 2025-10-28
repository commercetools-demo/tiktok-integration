import { ProductPublishedMessage, ProductUnpublishedMessage, ProductSlugChangedMessage } from "@commercetools/platform-sdk";
import { CommercetoolsClient, CommercetoolsStorage, Utils } from "tiktok-integration-shared";
import { logger } from "../../utils/logger.utils";

export const productPublished = async (message: ProductPublishedMessage, productId: string): Promise<string> => {
  const apiRoot = CommercetoolsClient.createApiRoot(Utils.readConfiguration());
  const shopConfig = await CommercetoolsStorage.ShopConfigController.getShopConfiguration(apiRoot, process.env.TIKTOK_APP_KEY as string);
  const { body: product } = await apiRoot
    .products()
    .withId({ ID: productId })
    .get()
    .execute();
  
  logger.info(`Product ${productId} published with ${product.masterData.current.variants.length + 1} variants`);
  
  // TODO: 1. fetch product by sku from tiktok
  // 2. update product status/availability in tiktok
  return productId;
}

export const productUnpublished = async (message: ProductUnpublishedMessage, productId: string): Promise<string> => {
  const apiRoot = CommercetoolsClient.createApiRoot(Utils.readConfiguration());
  const shopConfig = await CommercetoolsStorage.ShopConfigController.getShopConfiguration(apiRoot, process.env.TIKTOK_APP_KEY as string);
  const { body: product } = await apiRoot
    .products()
    .withId({ ID: productId })
    .get()
    .execute();
  
  logger.info(`Product ${productId} unpublished`);
  
  // TODO: 1. fetch product by sku from tiktok
  // 2. update product status/availability in tiktok (set to inactive)
  return productId;
}

export const productSlugChanged = async (message: ProductSlugChangedMessage, productId: string): Promise<string> => {
  const apiRoot = CommercetoolsClient.createApiRoot(Utils.readConfiguration());
  const shopConfig = await CommercetoolsStorage.ShopConfigController.getShopConfiguration(apiRoot, process.env.TIKTOK_APP_KEY as string);
  const { body: product } = await apiRoot
    .products()
    .withId({ ID: productId })
    .get()
    .execute();
  
  logger.info(`Product ${productId} slug changed from ${message.oldSlug} to ${message.slug}`);
  
  // TODO: 1. fetch product by sku from tiktok
  // 2. update product slug/URL in tiktok if applicable
  return productId;
}

