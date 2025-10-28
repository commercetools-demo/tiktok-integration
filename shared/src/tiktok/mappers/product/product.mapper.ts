import {
  Attribute,
  ByProjectKeyRequestBuilder,
  Product,
  ProductVariant,
} from '@commercetools/platform-sdk';
import {
  Product202309CreateProductRequestBody,
  Product202309CreateProductRequestBodyMainImages,
  Product202309CreateProductRequestBodyPackageDimensions,
  Product202309CreateProductRequestBodyPackageWeight,
  Product202309CreateProductRequestBodyProductAttributes,
  Product202309CreateProductRequestBodySkus,
  Product202309CreateProductRequestBodySkusInventory,
  Product202309CreateProductRequestBodySkusListPrice,
  Product202309CreateProductRequestBodySkusPrice,
  Product202309CreateProductRequestBodySkusSalesAttributes,
} from '../../../tiktok-sdk';
import { CommercetoolsStorage, Services, TiktokProduct } from '../../..';
import { PRODUCT_TYPE_TO_TIKTOK_CATEGORY } from './product-type-to-category';
import {
  PRODUCT_TYPE_TO_TIKTOK_PRODUCT_ATTRIBUTE,
  PRODUCT_TYPE_TO_TIKTOK_SKU_ATTRIBUTE,
} from './product-type-to-attribute';
import {
  ATTRIBUTE_KEY_PACKAGE_DIMENSIONS_HEIGHT,
  ATTRIBUTE_KEY_PACKAGE_DIMENSIONS_LENGTH,
  ATTRIBUTE_KEY_PACKAGE_DIMENSIONS_UNIT,
  ATTRIBUTE_KEY_PACKAGE_DIMENSIONS_WIDTH,
  ATTRIBUTE_KEY_PACKAGE_WEIGHT_UNIT,
  ATTRIBUTE_KEY_PACKAGE_WEIGHT_VALUE,
  FALLBACK_PACKAGE_DIMENSIONS_HEIGHT,
  FALLBACK_PACKAGE_DIMENSIONS_LENGTH,
  FALLBACK_PACKAGE_DIMENSIONS_UNIT,
  FALLBACK_PACKAGE_DIMENSIONS_WIDTH,
  FALLBACK_PACKAGE_WEIGHT_UNIT,
  FALLBACK_PACKAGE_WEIGHT_VALUE,
  USE_NO_CHANNEL_FOR_INVENTORY_FALLBACK,
  USE_NO_CHANNEL_FOR_LIST_PRICE,
  USE_NO_CHANNEL_FOR_MAIN_PRICE,
} from './product-contants';
import { ShopConfigurationData } from '../../../interfaces';

export const commercetoolsProductToTiktokProduct = async (
  apiRoot: ByProjectKeyRequestBuilder,
  app_key: string,
  product: Product,
): Promise<Product202309CreateProductRequestBody> => {
  const locale = await Services.getCommercetoolsLocale(apiRoot, app_key);
  const shopConfig =
    await CommercetoolsStorage.ShopConfigController.getShopConfiguration(
      apiRoot,
      app_key,
    );
  if (!shopConfig) {
    throw new Error('Shop configuration not found');
  }

  const allVariants = [
    product.masterData.current.masterVariant,
    ...product.masterData.current.variants,
  ];
  const mainImages = await commercetoolsProductToTiktokMainImages(
    apiRoot,
    app_key,
    product,
  );
  if (!mainImages) {
    throw new Error('No main images found');
  }

  const productDraft: Product202309CreateProductRequestBody = {
    saveMode: commercetoolsProductStateToSaveMode(product),
    title: product.masterData.current.name?.[locale],
    description: product.masterData.current.description?.[locale],
    categoryVersion: 'v2',
    categoryId: commercetoolsProductTypeToTiktokCategory(
      product.productType.id,
    ),
    mainImages,
    skus: allVariants
      .map((variant) =>
        commercetoolsVariantToTiktokSKU(
          product.productType.id,
          variant,
          shopConfig,
          locale,
        ),
      )
      .filter((sku) => sku !== undefined),
    productAttributes: commercetoolsProductTypeToTiktokProductAttributeList(
      product.productType.id,
      product.masterData.current.masterVariant.attributes,
      locale,
    ),
    packageWeight: commercetoolsProductTypeToTiktokProductPackageWeight(
      product.masterData.current.masterVariant.attributes,
    ),
    packageDimensions: commercetoolsProductTypeToTiktokProductPackageDimensions(
      product.masterData.current.masterVariant.attributes,
    ),
  };
  return productDraft;
};

const commercetoolsProductStateToSaveMode = (product: Product): string => {
  if (product.masterData?.published === false) {
    return 'AS_DRAFT';
  }
  return 'LISTING';
};

const commercetoolsVariantToTiktokSKU = (
  productTypeId: string,
  variant: ProductVariant,
  shopConfig: ShopConfigurationData,
  locale: string,
): Product202309CreateProductRequestBodySkus | undefined => {
  const listPrice = commercetoolsVariantToListPrice(
    variant,
    shopConfig.shop_region,
  );
  const price = commercetoolsVariantToPrice(variant, shopConfig);
  const inventory = commercetoolsVariantToTiktokSKUInventory(
    variant,
    shopConfig,
  );
  if (inventory.length === 0 || !price) {
    return undefined;
  }
  return {
    inventory: inventory,
    externalSkuId: variant.sku,
    sellerSku: variant.sku,
    ...(listPrice && { listPrice }),
    ...(price && { price }),
    salesAttributes: commercetoolsProductTypeToTiktokSKUAttributeList(
      productTypeId,
      variant.attributes,
      locale,
    ),
  };
};

const commercetoolsProductTypeToTiktokCategory = (productTypeId: string) => {
  return PRODUCT_TYPE_TO_TIKTOK_CATEGORY[productTypeId];
};

const commercetoolsVariantToTiktokSKUInventory = (
  variant: ProductVariant,
  shopConfig: ShopConfigurationData,
): Product202309CreateProductRequestBodySkusInventory[] => {
  let quantity = undefined;
  const inventory = Object.keys(variant.availability?.channels ?? {}).find(
    (channel) => channel === shopConfig.ctSupplyChannelId,
  );
  if (inventory) {
    quantity = variant.availability?.channels?.[inventory]?.availableQuantity;
  }
  if (!inventory && USE_NO_CHANNEL_FOR_INVENTORY_FALLBACK) {
    quantity = variant.availability?.availableQuantity;
  }
  if (typeof quantity === 'undefined') {
    return [];
  }
  return [
    {
      quantity,
      warehouseId: shopConfig?.tiktokWarehouseId,
    },
  ];
};

const commercetoolsProductToTiktokMainImages = async (
  apiRoot: ByProjectKeyRequestBuilder,
  app_key: string,
  product: Product,
): Promise<Product202309CreateProductRequestBodyMainImages[] | undefined> => {
  const access_token =
    await CommercetoolsStorage.TokenController.getAccessToken(apiRoot, app_key);
  if (!access_token) {
    throw new Error('Access token not found');
  }

  const images = product.masterData.current.masterVariant.images;
  const mainImages = [];
  for await (const image of images ?? []) {
    const resultUploadImage = await TiktokProduct.uploadProductImage(
      access_token,
      image.url,
      'MAIN_IMAGE',
    );
    if (!resultUploadImage) {
      throw new Error('Failed to upload product image');
    }

    mainImages.push(resultUploadImage.data?.uri);
  }
  return mainImages
    .filter((image) => image !== undefined)
    .map((image) => ({
      uri: image,
    }));
};

const commercetoolsVariantToPrice = (
  variant: ProductVariant,
  shopConfig: ShopConfigurationData,
): Product202309CreateProductRequestBodySkusPrice | undefined => {
  if (!shopConfig || !shopConfig.shop_region) {
    return undefined;
  }
  let price = variant.prices?.find(
    (price) =>
      typeof price.channel !== 'undefined' &&
      price.country?.toLowerCase() === shopConfig.shop_region?.toLowerCase() &&
      price.channel?.id === shopConfig.ctDistributionChannelId,
  );
  if (price) {
    let discounted = price.discounted?.value;
    return {
      amount: priceCentAmountToAmount(
        price.value.centAmount,
        price.value.fractionDigits,
      ),
      currency: price.value.currencyCode,
      salePrice: discounted
        ? priceCentAmountToAmount(
            discounted.centAmount,
            discounted.fractionDigits,
          )
        : priceCentAmountToAmount(
            price.value.centAmount,
            price.value.fractionDigits,
          ),
    };
  } else if (USE_NO_CHANNEL_FOR_MAIN_PRICE) {
    price = variant.prices?.find(
      (price) =>
        typeof price.channel === 'undefined' &&
        price.country?.toLowerCase() === shopConfig.shop_region?.toLowerCase(),
    );

    if (price) {
      let discounted = price.discounted?.value;
      return {
        amount: priceCentAmountToAmount(
          price.value.centAmount,
          price.value.fractionDigits,
        ),
        currency: price.value.currencyCode,
        salePrice: discounted
          ? priceCentAmountToAmount(
              discounted.centAmount,
              discounted.fractionDigits,
            )
          : priceCentAmountToAmount(
              price.value.centAmount,
              price.value.fractionDigits,
            ),
      };
    }
  }
  return undefined;
};

const commercetoolsVariantToListPrice = (
  variant: ProductVariant,
  shopRegion?: string,
): Product202309CreateProductRequestBodySkusListPrice | undefined => {
  if (!shopRegion) {
    return undefined;
  }
  if (USE_NO_CHANNEL_FOR_LIST_PRICE) {
    const noChannelPrice = variant.prices?.find(
      (price) =>
        typeof price.channel === 'undefined' &&
        price.country?.toLowerCase() === shopRegion.toLowerCase(),
    );
    if (noChannelPrice) {
      return {
        amount: priceCentAmountToAmount(
          noChannelPrice.value.centAmount,
          noChannelPrice.value.fractionDigits,
        ),
        currency: noChannelPrice.value.currencyCode,
      };
    }
  }
  return undefined;
};

const commercetoolsProductTypeToTiktokSKUAttributeList = (
  productTypeId: string,
  attributes: Attribute[] | undefined,
  locale: string,
): Product202309CreateProductRequestBodySkusSalesAttributes[] => {
  if (!attributes) return [];
  const skuAttributes =
    PRODUCT_TYPE_TO_TIKTOK_SKU_ATTRIBUTE[productTypeId]?.map((attributeMap) => {
      if (attributeMap.valueNameFetcher) {
        return {
          id: attributeMap.tiktokAttributeId,
          valueName: attributeMap.valueNameFetcher(attributes, locale),
        };
      }
      if (attributeMap.valueIdFetcher) {
        return {
          id: attributeMap.tiktokAttributeId,
          valueId: attributeMap.valueIdFetcher(attributes, locale),
        };
      }
      return {} as Product202309CreateProductRequestBodySkusSalesAttributes;
    }) ?? [];
  return skuAttributes.filter(
    (attribute) =>
      (typeof attribute.valueName !== 'undefined' &&
        attribute.valueName !== '') ||
      (typeof attribute.valueId !== 'undefined' && attribute.valueId !== ''),
  );
};

const commercetoolsProductTypeToTiktokProductAttributeList = (
  productTypeId: string,
  attributes: Attribute[] | undefined,
  locale: string,
): Product202309CreateProductRequestBodyProductAttributes[] => {
  if (!attributes) return [];
  const productAttributes =
    PRODUCT_TYPE_TO_TIKTOK_PRODUCT_ATTRIBUTE[productTypeId]?.map(
      (attributeMap) => {
        if (attributeMap.valueNamesFetcher) {
          return {
            id: attributeMap.tiktokAttributeId,
            values: attributeMap.valueNamesFetcher(attributes, locale),
          };
        }
        if (attributeMap.valueIdsFetcher) {
          return {
            id: attributeMap.tiktokAttributeId,
            values: attributeMap.valueIdsFetcher(attributes, locale) ?? [],
          };
        }
        return {} as Product202309CreateProductRequestBodyProductAttributes;
      },
    ) ?? [];

  const filteredProductAttributes = productAttributes.filter(
    (attribute) =>
      typeof attribute.values !== 'undefined' && attribute.values.length !== 0,
  );
  return filteredProductAttributes;
};

const commercetoolsProductTypeToTiktokProductPackageWeight = (
  attributes: Attribute[] | undefined,
): Product202309CreateProductRequestBodyPackageWeight => {
  if (!attributes)
    return {
      value: FALLBACK_PACKAGE_WEIGHT_VALUE,
      unit: FALLBACK_PACKAGE_WEIGHT_UNIT,
    };
  const packageWeightUnit = attributes.find(
    (attribute) => attribute.name === ATTRIBUTE_KEY_PACKAGE_WEIGHT_UNIT,
  )?.value?.key;
  let toFixedValue = 2;
  if (!packageWeightUnit) {
    return {
      value: FALLBACK_PACKAGE_WEIGHT_VALUE,
      unit: FALLBACK_PACKAGE_WEIGHT_UNIT,
    };
  }
  if (packageWeightUnit === 'KILOGRAM') {
    toFixedValue = 3;
  } else if (packageWeightUnit === 'GRAM') {
    toFixedValue = 0;
  }
  const packageWeightValue = Number(
    attributes.find(
      (attribute) => attribute.name === ATTRIBUTE_KEY_PACKAGE_WEIGHT_VALUE,
    )?.value,
  ).toFixed(toFixedValue);
  return {
    value: packageWeightValue,
    unit: packageWeightUnit,
  };
};

const commercetoolsProductTypeToTiktokProductPackageDimensions = (
  attributes: Attribute[] | undefined,
): Product202309CreateProductRequestBodyPackageDimensions => {
  if (!attributes)
    return {
      height: FALLBACK_PACKAGE_DIMENSIONS_HEIGHT,
      length: FALLBACK_PACKAGE_DIMENSIONS_LENGTH,
      unit: FALLBACK_PACKAGE_DIMENSIONS_UNIT,
      width: FALLBACK_PACKAGE_DIMENSIONS_WIDTH,
    };
  const packageDimensionsHeight = attributes.find(
    (attribute) => attribute.name === ATTRIBUTE_KEY_PACKAGE_DIMENSIONS_HEIGHT,
  )?.value;
  const packageDimensionsLength = attributes.find(
    (attribute) => attribute.name === ATTRIBUTE_KEY_PACKAGE_DIMENSIONS_LENGTH,
  )?.value;
  const packageDimensionsWidth = attributes.find(
    (attribute) => attribute.name === ATTRIBUTE_KEY_PACKAGE_DIMENSIONS_WIDTH,
  )?.value;
  const packageDimensionsUnit = attributes.find(
    (attribute) => attribute.name === ATTRIBUTE_KEY_PACKAGE_DIMENSIONS_UNIT,
  )?.value?.key;
  return {
    height: packageDimensionsHeight,
    length: packageDimensionsLength,
    unit: packageDimensionsUnit,
    width: packageDimensionsWidth,
  };
};

const priceCentAmountToAmount = (
  price: number,
  fractionDigits: number,
): string => {
  if (typeof price !== 'number' || price === 0) {
    return '0';
  }
  return (price / Math.pow(10, fractionDigits)).toFixed(fractionDigits);
};
