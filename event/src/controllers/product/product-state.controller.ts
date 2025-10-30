import {
  ProductPublishedMessage,
  ProductUnpublishedMessage,
  ProductSlugChangedMessage,
  ByProjectKeyRequestBuilder,
  ProductProjection,
  ProductDeletedMessage,
} from '@commercetools/platform-sdk';
import {
  CommercetoolsClient,
  CommercetoolsStorage,
  Mappers,
  ProductController,
  TiktokProduct,
  Utils,
} from 'tiktok-integration-shared';
import { logger } from '../../utils/logger.utils';
import { ShopConfigurationData } from 'tiktok-integration-shared/build/interfaces';

export const productPublished = async (
  apiRoot: ByProjectKeyRequestBuilder,
  shopConfiguration: ShopConfigurationData,
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
    const tiktokProductIds = [];
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
      tiktokProductIds.push(
        ...tiktokProducts.products.map((tiktokProduct) => tiktokProduct.id!)
      );
      logger.info(`Found ${tiktokProductIds} tiktok products for product ${productId}`);
      const tiktokProductsData = await Promise.all(
        tiktokProductIds.map(
          async (id) =>
            await TiktokProduct.getProduct(id, {
              draft: false,
              locale: shopConfiguration.locale,
            })
        )
      );
      if (!tiktokProductsData || !tiktokProductsData.length) {
        throw new Error(`No tiktok product found for product ${productId}`);
      }
      await Promise.all(
        tiktokProductsData
          .filter(
            (tiktokProductData) => typeof tiktokProductData !== 'undefined'
          )
          .map(async (tiktokProductData) => {
            const merged =
              await Mappers.Product.mergeTiktokProductAndCommercetoolsProductToTiktokProductEdit(
                apiRoot,
                process.env.TIKTOK_APP_KEY as string,
                tiktokProductData,
                product
              );
            return TiktokProduct.publishProduct(tiktokProductData.id, merged);
          })
      );
      return productId;
    }
  } catch (error: any) {
    logger.error(`Error publishing product ${productId}`, error);
    return productId;
  }
};

export const productUnpublished = async (
  apiRoot: ByProjectKeyRequestBuilder,
  shopConfiguration: ShopConfigurationData,
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
      return productId;
    }
  } catch (error) {
    logger.error(`Error unpublishing product ${productId}`, error);
    return productId;
  }
};

export const productDeleted = async (
  apiRoot: ByProjectKeyRequestBuilder,
  shopConfiguration: ShopConfigurationData,
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
      return productId;
    }
  } catch (error) {
    logger.error(`Error unpublishing product ${productId}`, error);
    return productId;
  }
};
