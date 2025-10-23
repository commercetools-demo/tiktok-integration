import { Product202309SearchProductsRequestBody } from '../tiktok-sdk';
import { client } from './client';

export const productSearch = async (
  access_token: string,
  shop_cipher: string,
  page?: {
    pageSize: number;
    pageToken?: string;
  },
  query?: Product202309SearchProductsRequestBody
) => {
  const { body } = await client.api.ProductV202309Api.ProductsSearchPost(
    page?.pageSize ?? 10,
    access_token,
    'application/json',
    page?.pageToken ?? undefined,
    undefined,
    shop_cipher,
    query ?? undefined
  );
  return body;
};


export const checkListingPrerequisites = async (
  access_token: string,
  shop_cipher: string
) => {
  const { body } = await client.api.ProductV202309Api.PrerequisitesGet(
    access_token,
    'application/json',
    shop_cipher
  );
  if (!body.data || !body.data.shop) {
    throw new Error('No data found in CheckListingPrerequisitesResponse');
  }
  const { shop } = body.data;
  const shopRes= Object.entries(shop).reduce((acc, [key, value]) => {
    if (typeof value === 'string') {
      acc[key] = JSON.parse(value);
    } else {
      acc[key] = value;
    }
    return acc;
  }, {} as Record<string, any>);

  
   return shopRes;
}