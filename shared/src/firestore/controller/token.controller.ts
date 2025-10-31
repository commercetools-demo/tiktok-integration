import { Firestore } from '@google-cloud/firestore';
import { TokenResponse } from '../../tiktok-sdk/client/token';
import { SHARED_SHOP_CONTAINER_KEY } from '../../constants';
import { getAccessTokenVariableKey } from '../../utils';
import { AccessTokenData } from '../../interfaces';

/**
 * Store access token and shop information in Firestore
 * @param db - The Firestore database instance
 * @param app_key - The TikTok app key (used as document identifier)
 * @param data - Token response data from TikTok
 */
export const storeAccessToken = async (
  db: Firestore,
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

  // Store access token in Firestore
  const docRef = db.collection(SHARED_SHOP_CONTAINER_KEY).doc(getAccessTokenVariableKey(app_key));
  await docRef.set(tokenData);
};

/**
 * Get access token from Firestore
 * @param db - The Firestore database instance
 * @param app_key - The TikTok app key (used as document identifier)
 * @returns The access token or null if not found
 */
export const getAccessToken = async (
  db: Firestore,
  app_key: string,
): Promise<string | null> => {
  const docRef = db.collection(SHARED_SHOP_CONTAINER_KEY).doc(getAccessTokenVariableKey(app_key));
  const doc = await docRef.get();

  if (!doc.exists) {
    return null;
  }

  const tokenData = doc.data() as AccessTokenData;
  return tokenData?.access_token || null;
};

/**
 * Get refresh token if access token needs refresh (expires in 24 hours)
 * @param db - The Firestore database instance
 * @param app_key - The TikTok app key (used as document identifier)
 * @returns The refresh token if token needs refresh, null otherwise
 */
export const getTokensNeedingRefresh = async (
  db: Firestore,
  app_key: string,
): Promise<string | null> => {
  try {
    const now = Math.floor(Date.now() / 1000);
    const expiringIn24Hours = now + 86400; // 24 hours from now

    const docRef = db.collection(SHARED_SHOP_CONTAINER_KEY).doc(getAccessTokenVariableKey(app_key));
    const doc = await docRef.get();

    if (!doc.exists) {
      return null;
    }

    const tokenData = doc.data() as AccessTokenData;

    // Check if token is expired or expiring soon
    if (
      tokenData.access_token_expire_at &&
      tokenData.access_token_expire_at <= expiringIn24Hours
    ) {
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
 * @param db - The Firestore database instance
 * @param app_key - The TikTok app key (used as document identifier)
 * @param newTokenData - New token data from refresh
 */
export const updateRefreshedToken = async (
  db: Firestore,
  app_key: string,
  newTokenData: TokenResponse,
): Promise<void> => {
  // Get existing token data to preserve metadata
  const docRef = db.collection(SHARED_SHOP_CONTAINER_KEY).doc(getAccessTokenVariableKey(app_key));
  const doc = await docRef.get();

  const existingData = doc.exists ? (doc.data() as AccessTokenData) : null;
  const now = new Date().toISOString();

  const updatedTokenData: AccessTokenData = {
    ...existingData,
    ...newTokenData,
    updated_at: now,
    last_refreshed_at: now,
    created_at: existingData?.created_at || now,
  };

  await docRef.set(updatedTokenData);
};

