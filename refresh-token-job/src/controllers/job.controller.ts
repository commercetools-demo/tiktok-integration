import { Request, Response } from 'express';

import CustomError from '../errors/custom.error';
import { logger } from '../utils/logger.utils';
import { CommercetoolsClient, Utils, CommercetoolsStorage } from 'tiktok-integration-shared';
import type { TiktokSDK } from 'tiktok-integration-shared';

/**
 * Exposed job endpoint.
 *
 * @param {Request} _request The express request
 * @param {Response} response The express response
 * @returns
 */
export const post = async (_request: Request, res: Response) => {
  try {
    const apiRoot = CommercetoolsClient.createApiRoot(Utils.readConfiguration());
    const refreshToken = await CommercetoolsStorage.TokenController.getTokensNeedingRefresh(
      apiRoot,
    );

    logger.info('tokens needing refresh');
    if (!refreshToken) {
      res.status(200).send();
      return;
    }

    const serviceUrl = await CommercetoolsStorage.ServiceURLController.getServiceURLStorageLink(apiRoot);
    if (!serviceUrl) {
      throw new Error('Service URL not found');
    }

    const response = await fetch(`${serviceUrl}/tiktok/refresh-access-token?refresh_token=${refreshToken}`, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error('Failed to refresh access token');
    }
    const data: TiktokSDK.TokenResponse = await response.json();
    if (data) {
      await CommercetoolsStorage.TokenController.updateRefreshedToken(
        apiRoot,
        data,
      );
    }


    res.status(200).send();
  } catch (error) {
    throw new CustomError(500, `Internal Server Error - Error retrieving all orders from the commercetools SDK`);
  }
};
