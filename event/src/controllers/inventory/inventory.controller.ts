import {
  ByProjectKeyRequestBuilder,
  InventoryEntryCreatedMessage,
  InventoryEntryQuantitySetMessage,
} from '@commercetools/platform-sdk';
import {
  Mappers,
  ProductController,
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

    if (message.inventoryEntry.supplyChannel?.id !== shopConfiguration.ctSupplyChannelId) {
      logger.info(`Inventory entry ${inventoryEntityid} is not for the supply channel ${shopConfiguration.ctSupplyChannelId}`);
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
            process.env.TIKTOK_APP_KEY as string,
            product
          );
        await TiktokProduct.createProduct(productDraft);
      } catch (error) {
        logger.error(`Error creating product draft for product ${product.id}`);
        return inventoryEntityid;
      }
      return inventoryEntityid;
    } else {
      await TiktokProduct.mergeAndUpdateProductsFromCommercetoolsProduct(
        apiRoot,
        shopConfiguration,
        process.env.TIKTOK_APP_KEY as string,
        tiktokProducts,
        product
      );
      logger.info(
        `Merged and updated ${tiktokProducts.products?.length} tiktok products for product ${product.id}`
      );
      return inventoryEntityid;
    }
  } catch (error: any) {
    logger.error(`Error creating inventory entry ${inventoryEntityid}`, error);
    return inventoryEntityid;
  }
};

// export const inventoryEntryQuantitySet = async (
//   apiRoot: ByProjectKeyRequestBuilder,
//   shopConfiguration: Types.ShopConfigurationData,
//   message: InventoryEntryQuantitySetMessage,
//   inventoryEntityid: string
// ): Promise<string> => {
//   try {
//     const sku = message.supplyChannel
//   }
// };