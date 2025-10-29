import {
  CommercetoolsClient,
  ProductController,
  CommercetoolsStorage,
  Utils,
} from 'tiktok-integration-shared';
import {
  Message,
  ProductPriceAddedMessage,
  ProductPriceChangedMessage,
  ProductPriceRemovedMessage,
  ProductPublishedMessage,
  ProductUnpublishedMessage,
  ProductSlugChangedMessage,
} from '@commercetools/platform-sdk';
import {
  productPriceAdded,
  productPriceChanged,
  productPriceRemoved,
} from './product-price.controller';
import {
  productPublished,
  productUnpublished,
  productSlugChanged,
} from './product-state.controller';
import { logger } from '../../utils/logger.utils';

export type ProductMessageType =
  | ProductPriceChangedMessage
  | ProductPriceAddedMessage
  | ProductPriceRemovedMessage
  | ProductPublishedMessage
  | ProductUnpublishedMessage
  | ProductSlugChangedMessage;

export const productUpdated = async (
  message: ProductMessageType,
  productId: string
): Promise<string> => {
  const apiRoot = CommercetoolsClient.createApiRoot(Utils.readConfiguration());
  const shopConfiguration =
    await CommercetoolsStorage.ShopConfigController.getShopConfiguration(
      apiRoot,
      process.env.TIKTOK_APP_KEY as string
    );

  if (!shopConfiguration || !shopConfiguration.shopCipher) {
    logger.error(
      `Shop configuration not found for product ${productId}. Skipping product update.`
    );
    return productId;
  }

  const product = await ProductController.getProduct(
    apiRoot,
    productId,
    shopConfiguration
  );

  switch (message.type) {
    case 'ProductPriceChanged':
      return productPriceChanged(apiRoot, shopConfiguration, message, product);
    case 'ProductPriceAdded':
      return await productPriceAdded(apiRoot, shopConfiguration, message, product);
    case 'ProductPublished':
      return await productPublished(apiRoot, message, product);
    case 'ProductUnpublished':
      return await productUnpublished(apiRoot, message, product);
    case 'ProductSlugChanged':
      return await productSlugChanged(apiRoot, message, product);
    // TODO: ProductImageAdded
    // TODO: ProductTailoringCreated, ProductTailoringPublished,
    // TODO: ProductTailoringNameSet, ProductTailoringDescriptionSet
    // TODO: ProductVariantTailoringAdded, ProductTailoringImageAdded
    // TODO: InventoryEntryQuantitySet
    default:
      return productId;
  }
};
