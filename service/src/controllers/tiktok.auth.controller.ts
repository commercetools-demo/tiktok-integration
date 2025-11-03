import { Request, Response } from 'express';
import {
  ChannelController,
  CommercetoolsClient,
  CommercetoolsStorage,
  Services,
  StoreController,
  Utils,
} from 'tiktok-integration-shared';
import { AppProjectMapping } from 'tiktok-integration-shared/build/firestore/controller/map.controller';
import { TokenResponse } from 'tiktok-integration-shared/build/tiktok-sdk/client/token';
import { logger } from '../utils/logger.utils';

export const connectProject = async (req: Request, res: Response) => {
  const { shop_doc_id } = req.query;

  if (!shop_doc_id) {
    return res.status(401).send('Unauthorized');
  }
  const apiRoot = CommercetoolsClient.createApiRoot(Utils.readConfiguration());

  const serviceUrl =
    await CommercetoolsStorage.ServiceURLController.getServiceURLStorageLink(
      apiRoot,
    );

  const response = await fetch(
    `${process.env.ROUTER_SERVICE_URL_ENDPOINT}/authorize-project`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        shop_doc_id,
        project_key: process.env.CTP_PROJECT_KEY as string,
        service_url: serviceUrl,
        shop_id: process.env.TIKTOK_SHOP_ID as string,
      }),
    },
  );
  if (!response.ok) {
    const error = await response.text();
    return res.status(400).send(error);
  }
  const data: {
    access_token_data: TokenResponse;
    app_map_data: AppProjectMapping;
  } = await response.json();
  res.status(200).send('success');

  if (!data || !data.access_token_data || !data.app_map_data) {
    return res.status(400).send('Failed to get access token data');
  }

  await CommercetoolsStorage.TokenController.storeAccessToken(
    apiRoot,
    data.access_token_data,
  );
  logger.info('Token stored successfully for seller');
  await CommercetoolsStorage.ShopConfigController.storeShopConfiguration(
    apiRoot,
    {
      isAuthorized: true,
      locale: data.app_map_data.options?.locale as string,
      shop_region: data.app_map_data.options?.shop_region as string,
    },
  );
  logger.info('Shop configuration stored successfully');
  const isInitialized =
    await CommercetoolsStorage.ShopConfigController.isInitialized(apiRoot);
  logger.info('Shop initialized: ${isInitialized}', { isInitialized });
  if (!isInitialized) {
    const isAuthorized =
      await CommercetoolsStorage.ShopConfigController.isAuthorized(apiRoot);
    if (!isAuthorized) {
      throw new Error('App is not authorized to access the shop');
    }
    const { locale } =
      await CommercetoolsStorage.ShopConfigController.getLocaleAndShopRegion(
        apiRoot,
      );

    const stores = await StoreController.findStore(apiRoot, [
      'custom(fields(isTikTokShop=true))',
    ]);
    if (!stores || stores.length === 0) {
      logger.info('No store found');
    }

    const warehouseChannels = await ChannelController.findChannel(apiRoot, [
      'custom(fields(isTikTokWarehouse=true))',
    ]);
    if (!warehouseChannels || warehouseChannels.length === 0) {
      throw new Error('No warehouse channel found');
    }
    if (warehouseChannels.length > 1) {
      throw new Error('Multiple warehouse channels found');
    }

    const warehouses = data.app_map_data.options?.warehouses;
    if (!warehouses || warehouses.length === 0) {
      throw new Error('No warehouses found');
    }

    const tiktokWarehouse = warehouses.find((warehouse) => warehouseChannels.find((channel) => channel.custom?.fields.warehouseId === warehouse.id));

    if (!tiktokWarehouse) {
      throw new Error('No warehouse found');
    }

    const priceChannels = await ChannelController.findChannel(apiRoot, [
      'custom(fields(isTikTokPrice=true))',
    ]);
    if (!priceChannels || priceChannels.length === 0) {
      logger.info('No price channel found');
    }

    const ctStore = stores?.[0];
    const ctWarehouseChannel = warehouseChannels?.[0];
    const ctPriceChannel = priceChannels?.[0];

    if (!ctWarehouseChannel?.custom?.fields.warehouseId) {
      throw new Error('No warehouse ID found in warehouse channel');
    }
    if (!data.app_map_data.options?.shop_cipher) {
      throw new Error('No shop cipher found');
    }
    await CommercetoolsStorage.ShopConfigController.storeShopConfiguration(
      apiRoot,
      {
        shopCipher: data.app_map_data.options?.shop_cipher,
        ctSupplyChannelId: ctWarehouseChannel.id,
        ctDistributionChannelId: ctPriceChannel?.id,
        ctStoreId: ctStore?.id,
        ctStoreKey: ctStore?.key,
      },
    );

    await CommercetoolsStorage.ShopConfigController.storeShopConfiguration(
      apiRoot,
      {
        tiktokWarehouseId: tiktokWarehouse.id,
        tiktokWarehouseEntityId: tiktokWarehouse.entityId,
      },
    );

    await CommercetoolsStorage.ShopConfigController.storeShopConfiguration(
      apiRoot,
      {
        isInitialized: true,
      },
    );

    return {
      success: true,
      message: 'Shop initialized successfully',
    };
  }

  console.log(
    `Token stored successfully for seller: ${data.app_map_data.options?.seller_name}`,
  );
};
