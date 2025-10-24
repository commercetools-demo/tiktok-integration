import { ByProjectKeyRequestBuilder } from "@commercetools/platform-sdk";
import { ChannelController, CommercetoolsStorage, TiktokCategory, TiktokShop, TiktokWarehouse } from "../..";
import { logger } from "../../utils/logger";

export const initializeShop = async (apiRoot: ByProjectKeyRequestBuilder, access_token: string, app_key: string, shop_id: string) => {
    const isAuthorized = await CommercetoolsStorage.ShopConfigController.isAuthorized(apiRoot, app_key);
    if (!isAuthorized) {
        throw new Error('App is not authorized to access the shop');
    }
    const { locale } = await CommercetoolsStorage.ShopConfigController.getLocaleAndShopRegion(apiRoot, app_key);
    const shops = await TiktokShop.getAuthorizedShops(access_token);
    if (!shops) {
        throw new Error('No shops found');
    }
    const shop = shops.find(shop => shop.id === shop_id);
    if (!shop) {
        throw new Error('Shop not found');
    }

    const warehouseChannels = await ChannelController.findChannel(apiRoot,
        [
            'custom(fields(isTikTokWarehouse=true))'
        ]
    );
    if (!warehouseChannels || warehouseChannels.length === 0) {
        throw new Error('No warehouse channel found');
    }
    if (warehouseChannels.length > 1) {
        throw new Error('Multiple warehouse channels found');
    }

    const priceChannels = await ChannelController.findChannel(apiRoot,
        [
            'custom(fields(isTikTokPrice=true))'
        ]
    );
    if (!priceChannels || priceChannels.length === 0) {
        logger.info('No price channel found');
    }

    const ctWarehouseChannel = warehouseChannels?.[0];
    const ctPriceChannel = priceChannels?.[0];

    if (!ctWarehouseChannel?.custom?.fields.warehouseId) {
        throw new Error('No warehouse ID found in warehouse channel');
    }
    if (!shop.cipher) {
        throw new Error('No shop cipher found');
    }
    await CommercetoolsStorage.ShopConfigController.storeShopConfiguration(apiRoot, app_key, {
        shopCipher: shop.cipher,
        ctSupplyChannelId: ctWarehouseChannel.id,
        ctDistributionChannelId: ctPriceChannel?.id,
    });

    const warehouses = await TiktokWarehouse.getWarehouseList(access_token, shop.cipher);
    if (!warehouses || warehouses.length === 0) {
        throw new Error('No warehouses found in TikTok');
    }
    const warehouse = warehouses.find(warehouse => warehouse.id === ctWarehouseChannel?.custom?.fields.warehouseId);
    if (!warehouse) {
        throw new Error('Warehouses in Tiktok and CT do not match');
    }
    await CommercetoolsStorage.ShopConfigController.storeShopConfiguration(apiRoot, app_key, {
        tiktokWarehouseId: warehouse.id,
        tiktokWarehouseEntityId: warehouse.entityId,
    });

    const categories = await TiktokCategory.getCategories(access_token, shop.cipher, {
        categoryVersion: 'v2',
        locale,
    });
    if (!categories || categories.length === 0) {
        throw new Error('No categories found in TikTok');
    }
    await CommercetoolsStorage.CategoryController.storeCategories(apiRoot, app_key, categories);
    await CommercetoolsStorage.ShopConfigController.storeShopConfiguration(apiRoot, app_key, {
        isInitialized: true,
    });

    return {
        success: true,
        message: 'Shop initialized successfully',
    };
}