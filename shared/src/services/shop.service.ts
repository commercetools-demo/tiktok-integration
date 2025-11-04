import { CommercetoolsClient, CommercetoolsStorage, TiktokShop, Utils } from "..";
import { logger } from "../utils/logger";

export const getShopCipher = async (): Promise<{ shopCipher: string, access_token: string } | null> => {
  const apiRoot = CommercetoolsClient.createApiRoot(Utils.readConfiguration());
  const access_token =
    await CommercetoolsStorage.TokenController.getAccessToken(
      apiRoot,
    );

  if (!access_token) {
    logger.error('No access token found');
    return null;
  }

  const shops = await TiktokShop.getAuthorizedShops(access_token);

  const shop = shops?.[0];
  if (!shop || !shop.cipher) {
    logger.error('No shop found');
    return null;
  }
  return { shopCipher: shop.cipher, access_token };
}