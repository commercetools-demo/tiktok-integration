import { Firestore } from '@google-cloud/firestore';
import { FIRESTORE_SHARED_VERIFIED_SHOPS_COLLECTION_NAME, FIRESTORE_SHARED_VERIFIED_SHOPS_MAP_DOCUMENT_ID } from '../../constants';
import { getVerifiedShopKey } from '../../utils';

/**
 * Verify a shop by adding it to the verified shops map
 * @param db - The Firestore database instance
 * @param app_key - The TikTok app key (used as document identifier)
 * @param ct_project_key - The commercetools project key
 */
export const verifyShop = async (
  db: Firestore,
  app_key: string,
  ct_project_key: string,
): Promise<void> => {
  const docRef = db
    .collection(FIRESTORE_SHARED_VERIFIED_SHOPS_COLLECTION_NAME)
    .doc(FIRESTORE_SHARED_VERIFIED_SHOPS_MAP_DOCUMENT_ID);

  const doc = await docRef.get();
  const existingMap = doc.exists ? (doc.data() as Record<string, boolean>) : {};

  const verifiedMap: Record<string, boolean> = {
    ...existingMap,
    [getVerifiedShopKey(ct_project_key, app_key)]: true,
  };

  await docRef.set(verifiedMap);
};

/**
 * Check if a shop is verified
 * @param db - The Firestore database instance
 * @param app_key - The TikTok app key (used as document identifier)
 * @param ct_project_key - The commercetools project key
 * @returns True if shop is verified, false otherwise
 */
export const isVerified = async (
  db: Firestore,
  app_key: string,
  ct_project_key: string,
): Promise<boolean> => {
  const docRef = db
    .collection(FIRESTORE_SHARED_VERIFIED_SHOPS_COLLECTION_NAME)
    .doc(getVerifiedShopKey(ct_project_key, app_key));

  const doc = await docRef.get();

  if (!doc.exists) {
    return false;
  }

  const verifiedMap = doc.data() as Record<string, boolean>;
  return verifiedMap[getVerifiedShopKey(ct_project_key, app_key)] === true;
};

/**
 * Unverify a shop by removing it from the verified shops map
 * @param db - The Firestore database instance
 * @param app_key - The TikTok app key (used as document identifier)
 * @param ct_project_key - The commercetools project key
 */
export const unverifyShop = async (
  db: Firestore,
  app_key: string,
  ct_project_key: string,
): Promise<void> => {
  const docRef = db
    .collection(FIRESTORE_SHARED_VERIFIED_SHOPS_COLLECTION_NAME)
    .doc(FIRESTORE_SHARED_VERIFIED_SHOPS_MAP_DOCUMENT_ID);

  const doc = await docRef.get();

  if (!doc.exists) {
    return; // Nothing to unverify
  }

  const existingMap = doc.data() as Record<string, boolean>;
  const verifiedMap: Record<string, boolean> = {
    ...existingMap,
    [getVerifiedShopKey(ct_project_key, app_key)]: false,
  };

  await docRef.set(verifiedMap);
};

