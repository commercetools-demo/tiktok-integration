import { Firestore } from '@google-cloud/firestore';
import { Product202309GetCategoriesResponseDataCategories } from '../../tiktok-sdk';
import { SHARED_SHOP_CONTAINER_KEY } from '../../constants';
import { getCategoryVariableKey } from '../../utils';

/**
 * Store TikTok categories in Firestore
 * @param db - The Firestore database instance
 * @param app_key - The TikTok app key (used as document identifier)
 * @param categories - Array of TikTok categories
 */
export const storeCategories = async (
  db: Firestore,
  app_key: string,
  categories: Product202309GetCategoriesResponseDataCategories[],
): Promise<void> => {
  const docRef = db.collection(SHARED_SHOP_CONTAINER_KEY).doc(getCategoryVariableKey(app_key));
  await docRef.set({ categories });
};

