import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { TokenResponse } from '../../tiktok-sdk/client/token';
import {
  SHARED_SHOP_CONTAINER_KEY,
} from '../../constants';
import { createOrUpdateCustomObject, readCustomObject } from './custom-object.controller';
import { getAccessTokenVariableKey, getConfigurationVariableKey } from '../../utils';

/**
 * Interface for access token data stored in CommerceTools
 */
interface AccessTokenData {
  open_id?: string;
  seller_name?: string;
  seller_base_region?: string;
  user_type?: number;
  access_token: string;
  access_token_expire_at?: number;
  refresh_token: string;
  refresh_token_expire_at?: number;
  created_at: string;
  updated_at: string;
  last_refreshed_at: string;
}

/**
 * Interface for shop configuration data
 */
interface ShopConfigurationData {
  locale?: string;
  shop_region?: string;
}

/**
 * Store access token and shop information in CommerceTools custom objects
 * @param apiRoot - The CommerceTools API root
 * @param app_key - The TikTok app key (used as document identifier)
 * @param data - Token response data from TikTok
 * @param locale - Optional locale information
 * @param shop_region - Optional shop region information
 */
export const storeAccessToken = async (
  apiRoot: ByProjectKeyRequestBuilder,
  app_key: string,
  data: TokenResponse,
  locale?: string,
  shop_region?: string,
): Promise<void> => {
  const now = new Date().toISOString();

  // Prepare token data
  const tokenData: AccessTokenData = {
    ...data,
    created_at: now,
    updated_at: now,
    last_refreshed_at: now,
  };

  // Store access token
  await createOrUpdateCustomObject(apiRoot, SHARED_SHOP_CONTAINER_KEY, getAccessTokenVariableKey(app_key), tokenData);

  // Store shop configuration if locale or shop_region is provided
  if (locale || shop_region) {
    const configData: ShopConfigurationData = {
      ...(locale && { locale }),
      ...(shop_region && { shop_region }),
    };

    await createOrUpdateCustomObject(
      apiRoot,
      SHARED_SHOP_CONTAINER_KEY,
      getConfigurationVariableKey(app_key),
      configData,
    );
  }
};

/**
 * Get access token from CommerceTools custom objects
 * @param apiRoot - The CommerceTools API root
 * @param app_key - The TikTok app key (used as document identifier)
 * @returns The access token or null if not found
 */
export const getAccessToken = async (apiRoot: ByProjectKeyRequestBuilder, app_key: string): Promise<string | null> => {
  const tokenData = await readCustomObject<AccessTokenData>(
    apiRoot,
    SHARED_SHOP_CONTAINER_KEY,
    getAccessTokenVariableKey(app_key),
  );

  if (!tokenData) {
    return null;
  }

  return tokenData.access_token;
};

/**
 * Get locale and shop region from CommerceTools custom objects
 * @param apiRoot - The CommerceTools API root
 * @param app_key - The TikTok app key (used as document identifier)
 * @returns Object with locale and shop_region or null if not found
 */
export const getLocaleAndShopRegion = async (
  apiRoot: ByProjectKeyRequestBuilder,
  app_key: string,
): Promise<{ locale: string; shop_region: string } | null> => {
  const configData = await readCustomObject<ShopConfigurationData>(
    apiRoot,
    SHARED_SHOP_CONTAINER_KEY,
    getConfigurationVariableKey(app_key),
  );

  if (!configData) {
    return null;
  }

  return {
    locale: configData.locale || '',
    shop_region: configData.shop_region || '',
  };
};

/**
 * Get refresh token if access token needs refresh (expires in 24 hours)
 * @param apiRoot - The CommerceTools API root
 * @param app_key - The TikTok app key (used as document identifier)
 * @returns The refresh token if token needs refresh, null otherwise
 */
export const getTokensNeedingRefresh = async (
  apiRoot: ByProjectKeyRequestBuilder,
  app_key: string,
): Promise<string | null> => {
  try {
    const now = Math.floor(Date.now() / 1000);
    const expiringIn24Hours = now + 86400; // 24 hours from now

    const tokenData = await readCustomObject<AccessTokenData>(
      apiRoot,
      SHARED_SHOP_CONTAINER_KEY,
      getAccessTokenVariableKey(app_key),
    );

    if (!tokenData) {
      return null;
    }

    // Check if token is expired or expiring soon
    if (tokenData.access_token_expire_at && tokenData.access_token_expire_at <= expiringIn24Hours) {
      return tokenData.refresh_token;
    }

    return null;
  } catch (error) {
    console.error('Error querying tokens:', error);
    throw error;
  }
};

/**
 * Update the refresh token timestamp after successful refresh
 * @param apiRoot - The CommerceTools API root
 * @param app_key - The TikTok app key (used as document identifier)
 * @param newTokenData - New token data from refresh
 */
export const updateRefreshedToken = async (
  apiRoot: ByProjectKeyRequestBuilder,
  app_key: string,
  newTokenData: TokenResponse,
): Promise<void> => {
  // Get existing token data to preserve metadata
  const existingData = await readCustomObject<AccessTokenData>(
    apiRoot,
    SHARED_SHOP_CONTAINER_KEY,
    getAccessTokenVariableKey(app_key),
  );

  const now = new Date().toISOString();

  const updatedTokenData: AccessTokenData = {
    ...existingData,
    ...newTokenData,
    updated_at: now,
    last_refreshed_at: now,
    created_at: existingData?.created_at || now,
  };

  await createOrUpdateCustomObject(
    apiRoot,
    SHARED_SHOP_CONTAINER_KEY,
    getAccessTokenVariableKey(app_key),
    updatedTokenData,
  );
};
