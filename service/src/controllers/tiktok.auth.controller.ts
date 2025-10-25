import { Request, Response } from 'express';
import { TiktokAuth, CommercetoolsClient, Utils, CommercetoolsStorage, Services } from 'tiktok-integration-shared';
import { logger } from '../utils/logger.utils';

export const authorizeApp = async (req: Request, res: Response) => {
  const { app_key, code, locale, shop_region } = req.query;

  if (app_key !== process.env.TIKTOK_APP_KEY || !code) {
    return res.status(401).send('Unauthorized');
  }
  const { data } = await TiktokAuth.getAccessToken(
    code as string,
    app_key as string,
    process.env.TIKTOK_APP_SECRET as string,
  );
  res.status(200).send('success');

  if (!data) {
    return res.status(400).send('Failed to get access token data');
  }
  const apiRoot = CommercetoolsClient.createApiRoot(Utils.readConfiguration());

  await CommercetoolsStorage.TokenController.storeAccessToken(apiRoot, process.env.TIKTOK_APP_KEY as string, data);
  logger.info('Token stored successfully for seller');
  await CommercetoolsStorage.ShopConfigController.storeShopConfiguration(
    apiRoot,
    process.env.TIKTOK_APP_KEY as string,
    {
      isAuthorized: true,
      locale: locale as string,
      shop_region: shop_region as string,
    },
  );
  logger.info('Shop configuration stored successfully');
  const isInitialized = await CommercetoolsStorage.ShopConfigController.isInitialized(
    apiRoot,
    process.env.TIKTOK_APP_KEY as string,
  );
  logger.info('Shop initialized: ${isInitialized}', { isInitialized });
  if (!isInitialized) {
    await Services.initializeShop(
      apiRoot,
      data.access_token,
      process.env.TIKTOK_APP_KEY as string,
      process.env.TIKTOK_SHOP_ID as string,
    );
  }

  console.log(`Token stored successfully for seller: ${data.seller_name}`);
};
