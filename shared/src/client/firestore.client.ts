import { Firestore } from "@google-cloud/firestore";
import { TokenResponse } from "../tiktok-sdk/client/token";

export const createFirestoreClient = () => {
  return new Firestore({
    projectId: process.env.PROJECT_ID,
    databaseId: process.env.DATABASE_ID,
  });
};

export const storeAccessToken = async (firestore: Firestore, data: TokenResponse) => {
  const docRef = firestore.collection('tiktok_tokens').doc(data.open_id!);
    
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
  };
  
  await docRef.set(tokenData, { merge: true });
}

export async function getTokensNeedingRefresh(firestore: Firestore) {
  try {
    const now = Math.floor(Date.now() / 1000);
    const expiringIn24Hours = now + 86400; // 24 hours from now

    const snapshot = await firestore
      .collection(process.env.FIRESTORE_COLLECTION_NAME as string)
      .where('access_token_expire_at', '<=', expiringIn24Hours)
      .get();

    const tokens: any[] = [];
    snapshot.forEach((doc) => {
      tokens.push(doc.data());
    });

    return tokens;
  } catch (error) {
    console.error('Error querying tokens:', error);
    throw error;
  }
}