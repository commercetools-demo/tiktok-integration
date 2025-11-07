import { AppProjectMapping, TokenResponse } from '../interfaces';
import { logger } from '../utils/logger';

/**
 * Response type from router service authorize-project endpoint
 */
export interface AuthorizeProjectResponse {
  access_token_data: TokenResponse;
  app_map_data: AppProjectMapping;
}

/**
 * Get router service URL from environment variable
 * @returns The router service URL
 */
const getRouterServiceUrl = (): string => {
  const url = process.env.ROUTER_SERVICE_URL_ENDPOINT;

  if (!url) {
    throw new Error(
      'ROUTER_SERVICE_URL_ENDPOINT environment variable is not set',
    );
  }

  return url;
};

/**
 * Refresh access token via router service
 * @param refresh_token - The refresh token
 * @returns The new token data
 */
export const refreshAccessToken = async (
  refresh_token: string,
): Promise<TokenResponse> => {
  const url = getRouterServiceUrl();

  logger.info('Refreshing access token via router service');

  const response = await fetch(
    `${url}/tiktok/refresh-access-token?refresh_token=${encodeURIComponent(refresh_token)}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (!response.ok) {
    const error = await response.text();
    logger.error('Failed to refresh access token via router service', {
      error,
    });
    throw new Error(`Token refresh failed: ${error}`);
  }

  const data: TokenResponse = await response.json();
  logger.info('Access token refreshed successfully via router service');

  return data;
};
