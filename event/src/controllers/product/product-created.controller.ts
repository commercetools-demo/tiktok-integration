import {
  CommercetoolsClient,
  TiktokProduct,
  Utils,
  TiktokShop,
  CommercetoolsStorage,
  Mappers,
} from 'tiktok-integration-shared';
import { logger } from '../../utils/logger.utils';

export const productCreated = async (productId: string) => {
  const apiRoot = CommercetoolsClient.createApiRoot(Utils.readConfiguration());
  // TODO: use PPR in store
  const { body: product } = await apiRoot
    .products()
    .withId({ ID: productId })
    .get()
    .execute();
 
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
