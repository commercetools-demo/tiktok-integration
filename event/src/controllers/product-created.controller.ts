import {
  CommercetoolsClient,
  TiktokProduct,
  Utils,
  TiktokShop,
  CommercetoolsStorage,
  Mappers,
} from 'tiktok-integration-shared';
import { logger } from '../utils/logger.utils';
import { WAREHOUSES } from '../contants/warehouses';

export const productCreated = async (productId: string) => {
  const apiRoot = CommercetoolsClient.createApiRoot(Utils.readConfiguration());
  // TODO: use PPR in store
  const { body: product } = await apiRoot
    .products()
    .withId({ ID: productId })
    .get()
    .execute();

  const access_token =
    await CommercetoolsStorage.TokenController.getAccessToken(
      apiRoot,
      process.env.TIKTOK_APP_KEY as string
    );
  const localeAndShopRegion =
    await CommercetoolsStorage.ShopConfigController.getLocaleAndShopRegion(
      apiRoot,
      process.env.TIKTOK_APP_KEY as string
    );
  if (!access_token || !localeAndShopRegion || !localeAndShopRegion.locale) {
    logger.error('No access token found');
    return product;
  }

  const shops = await TiktokShop.getAuthorizedShops(access_token);

  const shop = shops?.[0];
  if (!shop || !shop.cipher) {
    logger.error('No shop found');
    return product;
  }

  const productDraft =
    await Mappers.Product.commercetoolsProductToTiktokProduct(
      apiRoot,
      process.env.TIKTOK_APP_KEY as string,
      product
    );
  console.log('productDraft', JSON.stringify(productDraft, null, 2));
  const resultCreateProduct = await TiktokProduct.createProduct(
    access_token,
    shop.cipher,
    productDraft
  );
  console.log(
    'resultCreateProduct',
    JSON.stringify(resultCreateProduct, null, 2)
  );
  if (!resultCreateProduct) {
    logger.error('Failed to create product');
    return product;
  }

  return resultCreateProduct;
};
