import { client } from './client';

export const getWarehouseList = async (access_token: string, shop_cipher?: string) => {
  const { body } = await client.api.LogisticsV202309Api.WarehousesGet(access_token, 'application/json', shop_cipher);
  return body;
};
