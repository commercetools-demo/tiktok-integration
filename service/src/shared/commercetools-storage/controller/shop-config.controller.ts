import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { SHARED_SHOP_CONTAINER_KEY } from '../../constants';
import { Types as SharedTypes } from 'common-tiktok';
import { getConfigurationVariableKey } from '../../utils';
import {
  CustomObjectController,
} from 'common-tiktok';
import { logger } from '../../utils/logger';

export const storeShopConfiguration = async (
  apiRoot: ByProjectKeyRequestBuilder,
  data: SharedTypes.ShopConfigurationData,
): Promise<void> => {
  let configData: SharedTypes.ShopConfigurationData =
    (await CustomObjectController.readCustomObject<SharedTypes.ShopConfigurationData>(
      apiRoot,
      SHARED_SHOP_CONTAINER_KEY,
      getConfigurationVariableKey(),
    )) || ({} as SharedTypes.ShopConfigurationData);

  logger.info('Config data: ${configData}', { configData });

  if (Object.keys(data).length === 0) {
    return;
  }
  configData = {
    ...configData,
    ...Object.entries(data).reduce(
      (acc, [key, value]) => {
        if (typeof value !== 'undefined') {
          acc[key] = value;
        }
        return acc;
      },
      {} as Record<string, any>,
    ),
  };

  logger.info('Config data to store: ${configData}', { configData });

  await CustomObjectController.createOrUpdateCustomObject(
    apiRoot,
    SHARED_SHOP_CONTAINER_KEY,
    getConfigurationVariableKey(),
    configData,
  );
};

export const getShopConfiguration = async (
  apiRoot: ByProjectKeyRequestBuilder,
): Promise<SharedTypes.ShopConfigurationData | null> => {
  return CustomObjectController.readCustomObject<SharedTypes.ShopConfigurationData>(
    apiRoot,
    SHARED_SHOP_CONTAINER_KEY,
    getConfigurationVariableKey(),
  );
};
/**
 * Get locale and shop region from shop configuration
 * @param apiRoot - The CommerceTools API root
 * @returns Object with locale and shop_region or null if not found
 */
export const getLocaleAndShopRegion = async (
  apiRoot: ByProjectKeyRequestBuilder,
): Promise<{ locale?: string; shop_region?: string }> => {
  const configData = await getShopConfiguration(apiRoot);
  if (!configData) {
    return { locale: undefined, shop_region: undefined };
  }

  return {
    locale: configData?.locale,
    shop_region: configData?.shop_region,
  };
};

/**
 * Get shop cipher from CommerceTools custom objects
 * @param apiRoot - The CommerceTools API root
 * @returns Shop cipher or null if not found
 */
export const getShopCipher = async (
  apiRoot: ByProjectKeyRequestBuilder,
): Promise<string | undefined> => {
  const configData = await getShopConfiguration(apiRoot);
  if (!configData) {
    return undefined;
  }
  return configData?.shopCipher;
};

/**
 * Check if shop is authorized
 * @param apiRoot - The CommerceTools API root
 * @returns True if shop is authorized, false otherwise
 */
export const isAuthorized = async (
  apiRoot: ByProjectKeyRequestBuilder,
): Promise<boolean> => {
  const configData = await getShopConfiguration(apiRoot);
  logger.info('Config data in isAuthorized: ${configData}', { configData });
  if (!configData) {
    return false;
  }

  return configData?.isAuthorized || false;
};

/**
 * Check if shop is initialized
 * @param apiRoot - The CommerceTools API root
 * @returns True if shop is initialized, false otherwise
 */
export const isInitialized = async (
  apiRoot: ByProjectKeyRequestBuilder,
): Promise<boolean> => {
  const configData = await getShopConfiguration(apiRoot);
  if (!configData) {
    return false;
  }

  return (configData?.isAuthorized && configData?.isInitialized) || false;
};
