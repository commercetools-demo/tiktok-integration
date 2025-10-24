import { client } from './client';

export const getAuthorizedShops = async (access_token: string) => {
  const { body } = await client.api.AuthorizationV202309Api.ShopsGet(access_token, 'application/json');
  return body;
};
