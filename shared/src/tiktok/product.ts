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
