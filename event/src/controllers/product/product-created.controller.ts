import {
  CommercetoolsClient,
  TiktokProduct,
  Utils,
  TiktokShop,
  CommercetoolsStorage,
  Mappers,
  ProductController,
} from 'tiktok-integration-shared';
import { logger } from '../../utils/logger.utils';

export const productCreated = async (productId: string) => {
  const apiRoot = CommercetoolsClient.createApiRoot(Utils.readConfiguration());
  const shopConfig = await CommercetoolsStorage.ShopConfigController.getShopConfiguration(apiRoot, process.env.TIKTOK_APP_KEY as string);
  // TODO: use PPR in store
  const product = await ProductController.getProduct(apiRoot, productId, shopConfig);
 
  const productDraft =
    await Mappers.Product.commercetoolsProductToTiktokProduct(
      apiRoot,
      process.env.TIKTOK_APP_KEY as string,
      product
    );
  console.log('productDraft', JSON.stringify(productDraft, null, 2));
  const resultCreateProduct = await TiktokProduct.createProduct(
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
