import { Firestore } from "@google-cloud/firestore";
import { TokenResponse } from "../tiktok-sdk/client/token";

export const storeAccessToken = async (
    firestore: Firestore,
    app_key: string,
    data: TokenResponse,
    locale?: string,
    shop_region?: string
  ) => {
    const docRef = firestore
      .collection(process.env.GCP_FIRESTORE_COLLECTION_NAME as string)
      .doc(app_key);
  
    const tokenData = {
      open_id: data.open_id,
      seller_name: data.seller_name,
      seller_base_region: data.seller_base_region,
      user_type: data.user_type,
  
      // Token information
      access_token: data.access_token,
      access_token_expire_at: data.access_token_expire_in,
      refresh_token: data.refresh_token,
      refresh_token_expire_at: data.refresh_token_expire_in,
  
      // Metadata
      created_at: new Date(),
      updated_at: new Date(),
      last_refreshed_at: new Date(),
  
      // Locale and shop region
      ...(locale && {locale: locale}),
      ...(shop_region && {shop_region: shop_region}),
    };
  
    await docRef.set(tokenData, { merge: true });
  };
  
  export const getAccessToken = async (firestore: Firestore, app_key: string): Promise<string | null> => {
    const snapshot = await firestore
      .collection(process.env.GCP_FIRESTORE_COLLECTION_NAME as string)
      .doc(app_key)
      .get();
    if (!snapshot.exists) {
      return null;
    }
    return snapshot.data()?.access_token;
  };
  
  export const getLocaleAndShopRegion = async (firestore: Firestore, app_key: string): Promise<{ locale: string, shop_region: string } | null> => {
    const snapshot = await firestore
      .collection(process.env.GCP_FIRESTORE_COLLECTION_NAME as string)
      .doc(app_key)
      .get();
    if (!snapshot.exists) {
      return null;
    }
    return {
      locale: snapshot.data()?.locale,
      shop_region: snapshot.data()?.shop_region,
    };
  };
  
  export async function getTokensNeedingRefresh(
    firestore: Firestore,
    app_key: string
  ): Promise<string | null> {
    try {
      const now = Math.floor(Date.now() / 1000);
      const expiringIn24Hours = now + 86400; // 24 hours from now
  
      const snapshot = await firestore
        .collection(process.env.GCP_FIRESTORE_COLLECTION_NAME as string)
        .doc(app_key)
        .get();
      const tokenData = snapshot.data();
  
      // Check if token is expired
      if (tokenData?.access_token_expire_at <= expiringIn24Hours) {
        return tokenData?.refresh_token as string;
      }
      return null;
    } catch (error) {
      console.error('Error querying tokens:', error);
      throw error;
    }
  }