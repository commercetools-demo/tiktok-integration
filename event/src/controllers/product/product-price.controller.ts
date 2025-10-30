import {
  ByProjectKeyRequestBuilder,
  ProductPriceAddedMessage,
  ProductPriceChangedMessage,
  ProductPriceRemovedMessage,
  ProductProjection,
} from '@commercetools/platform-sdk';
import {
  CommercetoolsStorage,
  Mappers,
  TiktokProduct,
} from 'tiktok-integration-shared';
import { ShopConfigurationData } from 'tiktok-integration-shared/build/interfaces';
import { logger } from '../../utils/logger.utils';

export const productPriceChanged = async (
  apiRoot: ByProjectKeyRequestBuilder,
  shopConfig: ShopConfigurationData,
  message: ProductPriceChangedMessage,
  product: ProductProjection
): Promise<string> => {
  const productId = product.id;

  const variant = [product.masterVariant, ...product.variants].find(
    (variant) => variant.id === message.variantId
  );

  if (!variant || !variant.sku) {
    logger.info(
      `Variant not found for product ${productId} and variant ${message.variantId}`
    );
    return productId;
  }
  if (message.newPrice?.channel?.id !== shopConfig?.ctDistributionChannelId) {
    logger.info(
      `Price changed for product ${productId} but not for the distribution channel ${shopConfig?.ctDistributionChannelId}`
    );
    return productId;
  }
  const tiktokProducts = await TiktokProduct.productSearch(
    { pageSize: 1 },
    {
      sellerSkus: [variant.sku],
    }
  );
  if (!tiktokProducts || !tiktokProducts.products?.length) {
    logger.info(
      `No products found for product ${productId}. Product will be created once commercetools product is published.`
    );

    return productId;
  }
  const tiktokProduct = tiktokProducts.products[0];

  console.log('tiktokProduct', JSON.stringify(tiktokProduct, null, 2));

  const tiktokSku = tiktokProduct?.skus?.find(
    (sku) => sku.sellerSku === variant.sku
  );

  if (!tiktokSku) {
    logger.error(
      `No tiktok sku found for product ${productId} and variant ${variant.sku}`
    );
    return productId;
  }
  if (
    tiktokSku.price?.currency !== message.newPrice?.value?.currencyCode ||
    shopConfig.shop_region !== message.newPrice?.country
  ) {
    logger.error(
      `Price currency or region mismatch for product ${productId} and variant ${variant.sku}`
    );
    return productId;
  }

  const listPrice = Mappers.Product.commercetoolsPriceToTiktokPrice(
    message.newPrice
  );
  const price = Mappers.Product.commercetoolsPriceToTiktokPrice(
    message.newPrice
  );

  logger.info(
    `Updating price for product ${productId} and variant ${variant.sku}`
  );

  await TiktokProduct.updatePriceInDraftMode(tiktokProduct, {
    skus: [
      {
        id: tiktokSku?.id,
        listPrice,
        price,
      },
    ],
  });

  return productId;
};

export const productPriceAdded = async (
  apiRoot: ByProjectKeyRequestBuilder,
  shopConfig: ShopConfigurationData,
  message: ProductPriceAddedMessage,
  product: ProductProjection
): Promise<string> => {
  const productId = product.id;

  const variant = [product.masterVariant, ...product.variants].find(
    (variant) => variant.id === message.variantId
  );

  if (!variant || !variant.sku) {
    logger.info(
      `Variant not found for product ${productId} and variant ${message.variantId}`
    );
    return productId;
  }
  if (message.price?.channel?.id !== shopConfig?.ctDistributionChannelId) {
    logger.info(
      `Price changed for product ${productId} but not for the distribution channel ${shopConfig?.ctDistributionChannelId}`
    );
    return productId;
  }
  const tiktokProducts = await TiktokProduct.productSearch(
    { pageSize: 1 },
    {
      sellerSkus: [variant.sku],
    }
  );
  if (!tiktokProducts || !tiktokProducts.products?.length) {
    logger.info(
      `No products found for product ${productId}. Product will be created once commercetools product is published.`
    );

    return productId;
  }
  const tiktokProduct = await TiktokProduct.getProduct(
    tiktokProducts.products[0].id!,
    { draft: true, locale: shopConfig.locale }
  );

  const tiktokSku = tiktokProduct?.skus?.find(
    (sku) => sku.sellerSku === variant.sku
  );

  if (
    !tiktokSku ||
    tiktokSku.price?.currency !== message.price?.value?.currencyCode ||
    shopConfig.shop_region !== message.price?.country
  ) {
    logger.error(
      `Price currency or region mismatch for product ${productId} and variant ${variant.sku}`
    );
    return productId;
  }

  const listPrice = Mappers.Product.commercetoolsPriceToTiktokPrice(
    message.price
  );
  const price = Mappers.Product.commercetoolsPriceToTiktokPrice(message.price);

  logger.info(
    `Updating price for product ${productId} and variant ${variant.sku}`
  );

  await TiktokProduct.updatePriceInDraftMode(tiktokProduct, {
    skus: [
      {
        id: tiktokSku?.id,
        listPrice,
        price,
      },
    ],
  });

  return productId;
};

export const productPriceRemoved = async (
  apiRoot: ByProjectKeyRequestBuilder,
  message: ProductPriceRemovedMessage,
  product: ProductProjection
): Promise<string> => {
  const productId = product.id;
  const shopConfig =
    await CommercetoolsStorage.ShopConfigController.getShopConfiguration(
      apiRoot,
      process.env.TIKTOK_APP_KEY as string
    );

  const variant = [product.masterVariant, ...product.variants].find(
    (variant) => variant.id === message.variantId
  );
  if (!variant) {
    logger.info(
      `Variant not found for product ${productId} and variant ${message.variantId}`
    );
    return productId;
  }
  if (message.price?.channel?.id !== shopConfig?.ctDistributionChannelId) {
    logger.info(
      `Price removed for product ${productId} but not for the distribution channel ${shopConfig?.ctDistributionChannelId}`
    );
    return productId;
  }
  // TODO: 1. fetch product by sku from tiktok
  // 2. remove/update price in tiktok
  return productId;
};
