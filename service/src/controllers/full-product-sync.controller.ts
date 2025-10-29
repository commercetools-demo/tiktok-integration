import { Request, Response } from 'express';
import {
  CommercetoolsClient,
  CommercetoolsStorage,
  Mappers,
  ProductController,
  TiktokProduct,
  Utils,
} from 'tiktok-integration-shared';
import { logger } from '../utils/logger.utils';

export const fullProductSync = async (req: Request, res: Response) => {
  const apiRoot = CommercetoolsClient.createApiRoot(Utils.readConfiguration());

  const shopConfig =
    await CommercetoolsStorage.ShopConfigController.getShopConfiguration(
      apiRoot,
      process.env.TIKTOK_APP_KEY as string,
    );

  const products = await ProductController.getAllProducts(apiRoot, shopConfig);
  res.status(200).send('Full sync started...');

  for await (const product of products.results) {
    try {
      const productDraft =
        await Mappers.Product.commercetoolsProductToTiktokProduct(
          apiRoot,
          process.env.TIKTOK_APP_KEY as string,
          product,
        );
      await TiktokProduct.createProduct(productDraft);
    } catch (error) {
      logger.error(
        `Full-Sync: Error creating product draft for product ${product.id}`,
      );
      continue;
    }
    logger.info(`Full-Sync: Successfully created product ${product.id}`);
  }
};

export const fullProductCheck = async (req: Request, res: Response) => {
  const apiRoot = CommercetoolsClient.createApiRoot(Utils.readConfiguration());

  const shopConfig =
    await CommercetoolsStorage.ShopConfigController.getShopConfiguration(
      apiRoot,
      process.env.TIKTOK_APP_KEY as string,
    );

  const products = await ProductController.getAllProducts(apiRoot, shopConfig);

  const importableProducts = [];
  const unimportableProducts = [];

  for await (const product of products.results) {
    try {
      await Mappers.Product.commercetoolsProductToTiktokProductCheck(
        apiRoot,
        process.env.TIKTOK_APP_KEY as string,
        product,
      );
      importableProducts.push(product.id);
    } catch (error: any) {
      unimportableProducts.push({ id: product.id, error: error.message });
      continue;
    }
  }

  res.status(200).send({ importableProducts, unimportableProducts });
};
