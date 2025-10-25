import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { TokenResponse } from '../../tiktok-sdk/client/token';
import { SHARED_SHOP_CONTAINER_KEY } from '../../constants';
import { createOrUpdateCustomObject, readCustomObject } from '../../commercetools/controllers/custom-object.controller';
import { getAccessTokenVariableKey } from '../../utils';
import { AccessTokenData } from '../../interfaces';
import { storeShopConfiguration } from './shop-config.controller';

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
