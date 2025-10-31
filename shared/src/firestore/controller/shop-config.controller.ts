import { Firestore } from '@google-cloud/firestore';
import { FIRESTORE_CONFIGURATION_COLLECTION_NAME } from '../../constants';
import { ShopConfigurationData } from '../../interfaces';
import { getCategoryDocumentId } from '../../utils';
import { logger } from '../../utils/logger';

/**
 * Store shop configuration in Firestore
 * @param db - The Firestore database instance
 * @param app_key - The TikTok app key (used as document identifier)
 * @param ct_project_key - The commercetools project key
 * @param data - Shop configuration data
 */
export const storeShopConfiguration = async (
  db: Firestore,
  app_key: string,
  ct_project_key: string,
  data: ShopConfigurationData,
): Promise<void> => {
  const docRef = db.collection(FIRESTORE_CONFIGURATION_COLLECTION_NAME).doc(getCategoryDocumentId(ct_project_key, app_key));
  const doc = await docRef.get();
  
  let configData: ShopConfigurationData = doc.exists 
    ? (doc.data() as ShopConfigurationData)
    : ({} as ShopConfigurationData);

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

  await docRef.set(configData);
};

/**
 * Get shop configuration from Firestore
 * @param db - The Firestore database instance
 * @param app_key - The TikTok app key (used as document identifier)
 * @param ct_project_key - The commercetools project key
 * @returns Shop configuration data or null if not found
 */
export const getShopConfiguration = async (
  db: Firestore,
  app_key: string,
  ct_project_key: string,
): Promise<ShopConfigurationData | null> => {
  const docRef = db.collection(FIRESTORE_CONFIGURATION_COLLECTION_NAME).doc(getCategoryDocumentId(ct_project_key, app_key));
  const doc = await docRef.get();

  if (!doc.exists) {
    return null;
  }

  return doc.data() as ShopConfigurationData;
};

/**
 * Get locale and shop region from shop configuration
 * @param db - The Firestore database instance
 * @param app_key - The TikTok app key (used as document identifier)
 * @param ct_project_key - The commercetools project key
 * @returns Object with locale and shop_region or null if not found
 */
export const getLocaleAndShopRegion = async (
  db: Firestore,
  app_key: string,
  ct_project_key: string,
): Promise<{ locale?: string; shop_region?: string }> => {
  const configData = await getShopConfiguration(db, app_key, ct_project_key);
  if (!configData) {
    return { locale: undefined, shop_region: undefined };
  }

  return {
    locale: configData?.locale,
    shop_region: configData?.shop_region,
  };
};

/**
 * Get shop cipher from Firestore
 * @param db - The Firestore database instance
 * @param app_key - The TikTok app key (used as document identifier)
 * @param ct_project_key - The commercetools project key
 * @returns Shop cipher or undefined if not found
 */
export const getShopCipher = async (
  db: Firestore,
  app_key: string,
  ct_project_key: string,
): Promise<string | undefined> => {
  const configData = await getShopConfiguration(db, app_key, ct_project_key);
  if (!configData) {
    return undefined;
  }
  return configData?.shopCipher;
};

/**
 * Check if shop is authorized
 * @param db - The Firestore database instance
 * @param app_key - The TikTok app key (used as document identifier)
 * @param ct_project_key - The commercetools project key
 * @returns True if shop is authorized, false otherwise
 */
export const isAuthorized = async (
  db: Firestore,
  app_key: string,
  ct_project_key: string,
): Promise<boolean> => {
  const configData = await getShopConfiguration(db, app_key, ct_project_key);
  logger.info('Config data in isAuthorized: ${configData}', { configData });
  if (!configData) {
    return false;
  }

  return configData?.isAuthorized || false;
};

/**
 * Check if shop is initialized
 * @param db - The Firestore database instance
 * @param app_key - The TikTok app key (used as document identifier)
 * @param ct_project_key - The commercetools project key
 * @returns True if shop is initialized, false otherwise
 */
export const isInitialized = async (
  db: Firestore,
  app_key: string,
  ct_project_key: string,
): Promise<boolean> => {
  const configData = await getShopConfiguration(db, app_key, ct_project_key);
  if (!configData) {
    return false;
  }

  return (configData?.isAuthorized && configData?.isInitialized) || false;
};
/**
 * Check if shop is initialized
 * @param db - The Firestore database instance
 * @param app_key - The TikTok app key (used as document identifier)
 * @param ct_project_key - The commercetools project key
 * @returns True if shop is initialized, false otherwise
 */
export const initializeShop = async (
  db: Firestore,
  app_key: string,
  ct_project_key: string,
): Promise<void> => {
  await storeShopConfiguration(db, app_key, ct_project_key, {
    isInitialized: true,
  });
};

