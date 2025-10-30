import {
  InventoryEntryCreatedMessage,
  InventoryEntryQuantitySetMessage,
  ProductCreatedMessage,
  ProductDeletedMessage,
  ProductPublishedMessage,
  ProductUnpublishedMessage
} from '@commercetools/platform-sdk';
import {
  CommercetoolsClient,
  CommercetoolsStorage,
  ProductController,
  Utils,
} from 'tiktok-integration-shared';
import { logger } from '../../utils/logger.utils';
import { inventoryEntryCreated } from './inventory.controller';


export type InventoryEntryMessageType =
  | InventoryEntryCreatedMessage
  | InventoryEntryQuantitySetMessage;

export const inventoryEntryMessageHandler = async (
  message: InventoryEntryMessageType,
  inventoryEntityid: string
): Promise<string> => {
  const apiRoot = CommercetoolsClient.createApiRoot(Utils.readConfiguration());
  const shopConfiguration =
    await CommercetoolsStorage.ShopConfigController.getShopConfiguration(
      apiRoot,
      process.env.TIKTOK_APP_KEY as string
    );

  if (!shopConfiguration || !shopConfiguration.shopCipher) {
    logger.error(
      `Shop configuration not found for inventory entity ${inventoryEntityid}. Skipping inventory entry update.`
    );
    return inventoryEntityid;
  }

  switch (message.type) {
    case 'InventoryEntryCreated':
      return inventoryEntryCreated(apiRoot, shopConfiguration, message, inventoryEntityid);
    // case 'InventoryEntryQuantitySet':
    //   return inventoryEntryQuantitySet(apiRoot, shopConfiguration, message, inventoryEntityid);
    // case 'ProductPublished':
    //   return productPublished(apiRoot, shopConfiguration, message, productId);
    // case 'ProductUnpublished':
    //   return productUnpublished(apiRoot, shopConfiguration, message, productId);
    // case 'ProductDeleted':
    //   return productDeleted(apiRoot, shopConfiguration, message, productId);
    // TODO: ProductTailoringCreated, ProductTailoringPublished,
    // TODO: ProductTailoringNameSet, ProductTailoringDescriptionSet
    // TODO: ProductVariantTailoringAdded, ProductTailoringImageAdded
    // TODO: InventoryEntryQuantitySet
    // ADD variant
    default:
      return inventoryEntityid;
  }
};
