import { logger } from '../utils/logger.utils';
import { AppProjectMapping } from 'tiktok-integration-shared/build/firestore/controller/map.controller';
import { TokenResponse } from 'tiktok-integration-shared/build/tiktok-sdk/client/token';

/**
 * Response type from router service authorize-project endpoint
 */
export interface AuthorizeProjectResponse {
  access_token_data: TokenResponse;
  app_map_data: AppProjectMapping;
}

/**
 * Authorize a project with the router service
 * @param shop_doc_id - The shop document ID from Firestore
 * @param service_url - The service URL for callbacks
 * @returns The authorization response data
 */
export const authorizeProject = async (
  shop_doc_id: string,
  service_url: string,
): Promise<AuthorizeProjectResponse> => {
  const routerServiceUrl = process.env.ROUTER_SERVICE_URL_ENDPOINT;

  if (!routerServiceUrl) {
    throw new Error(
      'ROUTER_SERVICE_URL_ENDPOINT environment variable is not set',
    );
  }

  logger.info('Authorizing project with router service', {
    shop_doc_id,
    project_key: process.env.CTP_PROJECT_KEY as string,
    service_url,
    shop_id: process.env.TIKTOK_SHOP_ID as string,
  });

  const response = await fetch(`${routerServiceUrl}/authorize-project`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      shop_doc_id,
      project_key: process.env.CTP_PROJECT_KEY as string,
      service_url,
      shop_id: process.env.TIKTOK_SHOP_ID as string,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    logger.error('Failed to authorize project with router service', { error });
    throw new Error(`Router service authorization failed: ${error}`);
  }

  const data: AuthorizeProjectResponse = await response.json();

  if (!data || !data.access_token_data || !data.app_map_data) {
    throw new Error(
      'Invalid response from router service: missing required data',
    );
  }

  logger.info('Project authorized successfully with router service');

  return data;
};

/**
 * Refresh access token via router service
 * @param refresh_token - The refresh token
 * @returns The new token data
 */
export const refreshAccessToken = async (
  refresh_token: string,
): Promise<TokenResponse> => {
  const routerServiceUrl = process.env.ROUTER_SERVICE_URL_ENDPOINT;

  if (!routerServiceUrl) {
    throw new Error(
      'ROUTER_SERVICE_URL_ENDPOINT environment variable is not set',
    );
  }

  logger.info('Refreshing access token via router service');

  const response = await fetch(
    `${routerServiceUrl}/tiktok/refresh-access-token?refresh_token=${encodeURIComponent(refresh_token)}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (!response.ok) {
    const error = await response.text();
    logger.error('Failed to refresh access token', { error });
    throw new Error(`Token refresh failed: ${error}`);
  }

  const data: TokenResponse = await response.json();
  logger.info('Access token refreshed successfully');

  return data;
};

/**
 * Create a product via router service
 * @param access_token - The TikTok access token
 * @param shop_cipher - The TikTok shop cipher
 * @param productData - The product data to create
 * @param productImages - The product images to create
 * @returns The created product response
 */
export const createProduct = async (
  access_token: string,
  shop_cipher: string,
  productData: any,
  productImages: string[],
): Promise<any> => {
  const routerServiceUrl = process.env.ROUTER_SERVICE_URL_ENDPOINT;

  if (!routerServiceUrl) {
    throw new Error(
      'ROUTER_SERVICE_URL_ENDPOINT environment variable is not set',
    );
  }

  logger.info('Creating product via router service', {
    access_token: access_token.substring(0, 10) + '...',
    shop_cipher: shop_cipher.substring(0, 10) + '...',
  });

  const url = new URL(`${routerServiceUrl}/tiktok/products`);
  url.searchParams.append('access_token', access_token);
  url.searchParams.append('shop_cipher', shop_cipher);

  const response = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productData, productImages }),
  });

  if (!response.ok) {
    const error = await response.text();
    logger.error('Failed to create product via router service', { error });
    throw new Error(`Product creation failed: ${error}`);
  }

  const data = await response.json();
  logger.info('Product created successfully via router service');

  return data;
};
