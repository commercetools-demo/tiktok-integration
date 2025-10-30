import {
  ByProjectKeyRequestBuilder,
  ProductDeletedMessage,
  ProductPublishedMessage,
  ProductUnpublishedMessage
} from '@commercetools/platform-sdk';
import type { Types } from 'tiktok-integration-shared';
import {
  Mappers,
  ProductController,
  TiktokProduct
} from 'tiktok-integration-shared';
import { logger } from '../../utils/logger.utils';

export const productPublished = async (
  apiRoot: ByProjectKeyRequestBuilder,
  shopConfiguration: Types.ShopConfigurationData,
  message: ProductPublishedMessage,
  productId: string
): Promise<string> => {
  try {
    const product = message.productProjection;
    logger.info(`Product ${product.id} published`);

    const variantSKUs = [product.masterVariant, ...product.variants]
      .map((variant) => variant.sku)
      .filter((sku) => typeof sku !== 'undefined');
    if (!variantSKUs || !variantSKUs.length) {
      throw new Error(`No variants found for product ${productId}`);
    }
    const tiktokProducts = await TiktokProduct.productSearch(
      { pageSize: variantSKUs.length },
      {
        sellerSkus: variantSKUs,
      }
    );

    if (!tiktokProducts || !tiktokProducts.products?.length) {
      // TODO: create product in tiktok
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
          `Error creating product draft for product ${product.id}`,
        );
        return productId;
      }
      return productId;
    } else {
      await TiktokProduct.mergeAndUpdateProductsFromCommercetoolsProduct(apiRoot, shopConfiguration, process.env.TIKTOK_APP_KEY as string, tiktokProducts, product);
      logger.info(`Merged and updated ${tiktokProducts.products?.length} tiktok products for product ${product.id}`);
      return productId;
    }
  } catch (error: any) {
    logger.error(`Error publishing product ${productId}`, error);
    return productId;
  }
};

export const productUnpublished = async (
  apiRoot: ByProjectKeyRequestBuilder,
  shopConfiguration: Types.ShopConfigurationData,
  message: ProductUnpublishedMessage,
  productId: string,
): Promise<string> => {
  try {
    logger.info(`Product ${productId} unpublished`);
  
    const product = await ProductController.getUnpublishedProduct(apiRoot, productId);
    if (!product) {
      throw new Error(`Product ${productId} not found in commercetools`);
    }
    const variantSKUs = [product.masterData.current.masterVariant, ...product.masterData.current.variants]
      .map((variant) => variant.sku)
      .filter((sku) => typeof sku !== 'undefined');
    if (!variantSKUs || !variantSKUs.length) {
      throw new Error(`No variants found for product ${productId}`);
    }
    const tiktokProductIds = [];
    const tiktokProducts = await TiktokProduct.productSearch(
      { pageSize: variantSKUs.length },
      {
        sellerSkus: variantSKUs,
      }
    );

    if (!tiktokProducts || !tiktokProducts.products?.length) {
        logger.info(`No tiktok products found for product ${productId}. Nothing to do.`);
        return productId;
    } else {
      tiktokProductIds.push(
        ...tiktokProducts.products.map((tiktokProduct) => tiktokProduct.id!)
      );
      logger.info(`Found ${tiktokProductIds} tiktok products for product ${productId}`);
      
      await TiktokProduct.deactivateProducts(tiktokProductIds);
      logger.info(`Deactivated ${tiktokProductIds} tiktok products for product ${productId}`);
      return productId;
    }
  } catch (error) {
    logger.error(`Error unpublishing product ${productId}`, error);
    return productId;
  }
};

export const productDeleted = async (
  apiRoot: ByProjectKeyRequestBuilder,
  shopConfiguration: Types.ShopConfigurationData,
  message: ProductDeletedMessage,
  productId: string,
): Promise<string> => {
  try {
    logger.info(`Product ${productId} unpublished`);
  
    const product = message.currentProjection;
    if (!product) {
      throw new Error(`Product ${productId} not found in commercetools`);
    }
    const variantSKUs = [product.masterVariant, ...product.variants]
      .map((variant) => variant.sku)
      .filter((sku) => typeof sku !== 'undefined');
    if (!variantSKUs || !variantSKUs.length) {
      throw new Error(`No variants found for product ${productId}`);
    }
    const tiktokProductIds = [];
    const tiktokProducts = await TiktokProduct.productSearch(
      { pageSize: variantSKUs.length },
      {
        sellerSkus: variantSKUs,
      }
    );

    if (!tiktokProducts || !tiktokProducts.products?.length) {
        logger.info(`No tiktok products found for product ${productId}. Nothing to do.`);
        return productId;
    } else {
      tiktokProductIds.push(
        ...tiktokProducts.products.map((tiktokProduct) => tiktokProduct.id!)
      );
      logger.info(`Found ${tiktokProductIds} tiktok products for product ${productId}`);
      
      await TiktokProduct.deleteProducts(tiktokProductIds);
      logger.info(`Deleted ${tiktokProductIds} tiktok products for product ${productId}`);
      return productId;
    }
  } catch (error) {
    logger.error(`Error unpublishing product ${productId}`, error);
    return productId;
  }
};
