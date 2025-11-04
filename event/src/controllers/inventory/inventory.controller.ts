import {
  ByProjectKeyRequestBuilder,
  InventoryEntryCreatedMessage,
  InventoryEntryDeletedMessage,
  InventoryEntryQuantitySetMessage,
} from '@commercetools/platform-sdk';
import {
  InventoryController,
  Mappers,
  ProductController,
  TiktokInventory,
  TiktokProduct,
  Types,
} from 'tiktok-integration-shared';
import { logger } from '../../utils/logger.utils';

export const inventoryEntryCreated = async (
  apiRoot: ByProjectKeyRequestBuilder,
  shopConfiguration: Types.ShopConfigurationData,
  message: InventoryEntryCreatedMessage,
  inventoryEntityid: string
) => {
  try {
    const sku = message.inventoryEntry.sku;

    if (!sku) {
      throw new Error(`No sku found for inventory entry ${inventoryEntityid}`);
    }

    if (
      message.inventoryEntry.supplyChannel?.id !==
      shopConfiguration.ctSupplyChannelId
    ) {
      logger.info(
        `Inventory entry ${inventoryEntityid} is not for the supply channel ${shopConfiguration.ctSupplyChannelId}`
      );
      return inventoryEntityid;
    }

    const products = await ProductController.queryProduct(apiRoot, {
      skus: [sku],
      limit: 1,
    });
    if (!products || !products.length) {
      throw new Error(`No product found for sku ${sku}`);
    }
    const product = products[0];
    const tiktokProducts = await TiktokProduct.productSearch(
      { pageSize: 1 },
      {
        sellerSkus: [sku],
      }
    );

    if (!tiktokProducts || !tiktokProducts.products?.length) {
      try {
        const productDraft =
          await Mappers.Product.commercetoolsProductToTiktokProduct(
            apiRoot,
            product
          );
        await TiktokProduct.createProduct(productDraft);
      } catch (error) {
        logger.error(`Error creating product draft for product ${product.id}`);
        return inventoryEntityid;
      }
      return inventoryEntityid;
    } else {
      for await (const tiktokProduct of tiktokProducts.products) {
        if (!tiktokProduct) {
          continue;
        }
        const inventoryData =
          Mappers.Inventory.mapCommercetoolsInventoryToTiktokInventory(
            shopConfiguration,
            tiktokProduct,
            message.inventoryEntry
          );
        if (inventoryData) {
          await TiktokInventory.updateInventory(
            tiktokProduct?.id ?? '',
            inventoryData
          );
        }
      }
      return inventoryEntityid;
    }
  } catch (error: any) {
    logger.error(`Error creating inventory entry ${inventoryEntityid}`, error);
    return inventoryEntityid;
  }
};

export const inventoryEntryQuantitySet = async (
  apiRoot: ByProjectKeyRequestBuilder,
  shopConfiguration: Types.ShopConfigurationData,
  message: InventoryEntryQuantitySetMessage,
  inventoryEntityid: string
): Promise<string> => {
  try {
    const inventory = await InventoryController.getInventorybyId(
      apiRoot,
      inventoryEntityid
    );
    if (!inventory) {
      throw new Error(
        `No inventory found for inventory entry ${inventoryEntityid} in commercetools`
      );
    }
    const sku = inventory.sku;
    if (!sku) {
      throw new Error(`No sku found for inventory entry ${inventoryEntityid}`);
    }

    if (inventory.supplyChannel?.id !== shopConfiguration.ctSupplyChannelId) {
      logger.info(
        `Inventory entry ${inventoryEntityid} is not for the supply channel ${shopConfiguration.ctSupplyChannelId}`
      );
      return inventoryEntityid;
    }

    const products = await ProductController.queryProduct(apiRoot, {
      skus: [sku],
      limit: 1,
    });
    if (!products || !products.length) {
      throw new Error(`No product found for sku ${sku}`);
    }
    const product = products[0];
    const tiktokProducts = await TiktokProduct.productSearch(
      { pageSize: 1 },
      {
        sellerSkus: [sku],
      }
    );

    if (!tiktokProducts || !tiktokProducts.products?.length) {
      try {
        const productDraft =
          await Mappers.Product.commercetoolsProductToTiktokProduct(
            apiRoot,
            product
          );
        await TiktokProduct.createProduct(productDraft);
      } catch (error) {
        logger.error(`Error creating product draft for product ${product.id}`);
        return inventoryEntityid;
      }
      return inventoryEntityid;
    } else {
      for await (const tiktokProduct of tiktokProducts.products) {
        if (!tiktokProduct) {
          continue;
        }
        const inventoryData =
          Mappers.Inventory.mapCommercetoolsInventoryToTiktokInventory(
            shopConfiguration,
            tiktokProduct,
            inventory
          );
        if (inventoryData) {
          await TiktokInventory.updateInventory(
            tiktokProduct?.id ?? '',
            inventoryData
          );
        }
      }
      return inventoryEntityid;
    }
  } catch (error: any) {
    logger.error(`Error creating inventory entry ${inventoryEntityid}`, error);
    return inventoryEntityid;
  }
};

export const inventoryEntryDeleted = async (
  apiRoot: ByProjectKeyRequestBuilder,
  shopConfiguration: Types.ShopConfigurationData,
  message: InventoryEntryDeletedMessage,
  inventoryEntityid: string
): Promise<string> => {
  try {
    const sku = message.sku;
    if (!sku) {
      throw new Error(`No sku found for inventory entry ${inventoryEntityid}`);
    }

    if (message.supplyChannel?.id !== shopConfiguration.ctSupplyChannelId) {
      logger.info(
        `Inventory entry ${inventoryEntityid} is not for the supply channel ${shopConfiguration.ctSupplyChannelId}`
      );
      return inventoryEntityid;
    }

    const tiktokProducts = await TiktokProduct.productSearch(
      { pageSize: 1 },
      {
        sellerSkus: [sku],
      }
    );

    if (tiktokProducts && !!tiktokProducts.products?.length) {
      for await (const tiktokProduct of tiktokProducts.products) {
        if (!tiktokProduct) {
          continue;
        }
        const inventoryData =
          Mappers.Inventory.mapCommercetoolsInventoryToTiktokInventory(
            shopConfiguration,
            tiktokProduct,
            {
              availableQuantity: 0,
              sku: sku,
            }
          );
        if (inventoryData) {
          await TiktokInventory.updateInventory(
            tiktokProduct?.id ?? '',
            inventoryData
          );
        }
      }
    }
    return inventoryEntityid;
  } catch (error: any) {
    logger.error(`Error creating inventory entry ${inventoryEntityid}`, error);
    return inventoryEntityid;
  }
};
