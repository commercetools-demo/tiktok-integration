import { Services } from '../..';
import {
  Product202309UpdateInventoryRequestBody,
  Product202309InventorySearchRequestBody,
  Product202309InventorySearchResponseData,
} from '../../tiktok-sdk';
import { logger } from '../../utils/logger';
import { client } from './client';

/**
 * Search for inventory information
 */
export const searchInventory = async (
  query?: Product202309InventorySearchRequestBody,
): Promise<Product202309InventorySearchResponseData | undefined> => {
  const tiktokShop = await Services.getShopCipher();
  if (!tiktokShop) {
    throw new Error('No TikTok shop found');
  }

  const { body } = await client.api.ProductV202309Api.InventorySearchPost(
    tiktokShop.access_token,
    'application/json',
    tiktokShop.shopCipher,
    query,
  );

  return body.data;
};

/**
 * Update inventory for a product
 */
export const updateInventory = async (
  product_id: string,
  inventoryData: Product202309UpdateInventoryRequestBody,
) => {
  const tiktokShop = await Services.getShopCipher();
  if (!tiktokShop) {
    throw new Error('No TikTok shop found');
  }

  logger.info(`Updating inventory for product ${product_id} in TikTok`);

  const { body } =
    await client.api.ProductV202309Api.ProductsProductIdInventoryUpdatePost(
      product_id,
      tiktokShop.access_token,
      'application/json',
      tiktokShop.shopCipher,
      inventoryData,
    );

  return body;
};

/**
 * Update inventory for a single SKU
 */
export const updateSkuInventory = async (
  product_id: string,
  sku_id: string,
  inventory: Array<{
    warehouseId?: string;
    quantity?: number;
    backorderQuantity?: number;
    handlingTime?: number;
  }>,
) => {
  const inventoryData: Product202309UpdateInventoryRequestBody = {
    skus: [
      {
        id: sku_id,
        inventory: inventory,
      },
    ],
  };

  return updateInventory(product_id, inventoryData);
};

