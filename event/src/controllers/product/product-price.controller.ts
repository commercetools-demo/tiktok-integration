import { ProductPriceChangedMessage, ProductPriceAddedMessage, ProductPriceRemovedMessage } from "@commercetools/platform-sdk";
import { CommercetoolsClient, CommercetoolsStorage, Utils } from "tiktok-integration-shared";
import { logger } from "../../utils/logger.utils";

export const productPriceChanged = async (message: ProductPriceChangedMessage, productId: string): Promise<string> => {
  const apiRoot = CommercetoolsClient.createApiRoot(Utils.readConfiguration());
  const shopConfig = await CommercetoolsStorage.ShopConfigController.getShopConfiguration(apiRoot, process.env.TIKTOK_APP_KEY as string);
  const { body: product } = await apiRoot
    .products()
    .withId({ ID: productId })
    .get()
    .execute();
  const variant = [product.masterData.current.masterVariant, ...product.masterData.current.variants].find(variant => variant.id === message.variantId);
  if (!variant) {
    logger.info(`Variant not found for product ${productId} and variant ${message.variantId}`);
    return productId;
  }
  if (message.newPrice?.channel?.id !== shopConfig?.ctDistributionChannelId) {
    logger.info(`Price changed for product ${productId} but not for the distribution channel ${shopConfig?.ctDistributionChannelId}`);
    return productId;
  }
  // TODO: 1. fetch product by sku from titok
  // 2. update price in tiktok
  return productId;
}

export const productPriceAdded = async (message: ProductPriceAddedMessage, productId: string): Promise<string> => {
  const apiRoot = CommercetoolsClient.createApiRoot(Utils.readConfiguration());
  const shopConfig = await CommercetoolsStorage.ShopConfigController.getShopConfiguration(apiRoot, process.env.TIKTOK_APP_KEY as string);
  const { body: product } = await apiRoot
    .products()
    .withId({ ID: productId })
    .get()
    .execute();
  const variant = [product.masterData.current.masterVariant, ...product.masterData.current.variants].find(variant => variant.id === message.variantId);
  if (!variant) {
    logger.info(`Variant not found for product ${productId} and variant ${message.variantId}`);
    return productId;
  }
  if (message.price?.channel?.id !== shopConfig?.ctDistributionChannelId) {
    logger.info(`Price added for product ${productId} but not for the distribution channel ${shopConfig?.ctDistributionChannelId}`);
    return productId;
  }
  // TODO: 1. fetch product by sku from tiktok
  // 2. add/update price in tiktok
  return productId;
}

export const productPriceRemoved = async (message: ProductPriceRemovedMessage, productId: string): Promise<string> => {
  const apiRoot = CommercetoolsClient.createApiRoot(Utils.readConfiguration());
  const shopConfig = await CommercetoolsStorage.ShopConfigController.getShopConfiguration(apiRoot, process.env.TIKTOK_APP_KEY as string);
  const { body: product } = await apiRoot
    .products()
    .withId({ ID: productId })
    .get()
    .execute();
  const variant = [product.masterData.current.masterVariant, ...product.masterData.current.variants].find(variant => variant.id === message.variantId);
  if (!variant) {
    logger.info(`Variant not found for product ${productId} and variant ${message.variantId}`);
    return productId;
  }
  if (message.price?.channel?.id !== shopConfig?.ctDistributionChannelId) {
    logger.info(`Price removed for product ${productId} but not for the distribution channel ${shopConfig?.ctDistributionChannelId}`);
    return productId;
  }
  // TODO: 1. fetch product by sku from tiktok
  // 2. remove/update price in tiktok
  return productId;
}