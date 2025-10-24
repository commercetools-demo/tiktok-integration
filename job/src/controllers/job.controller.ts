import { Request, Response } from 'express';

import CustomError from '../errors/custom.error';
import { logger } from '../utils/logger.utils';
import { CommercetoolsClient, Token, Utils, TiktokAuth } from 'tiktok-integration-shared';

/**
 * Exposed job endpoint.
 *
 * @param {Request} _request The express request
 * @param {Response} response The express response
 * @returns
 */
export const post = async (_request: Request, response: Response) => {
  try {
    const apiRoot = CommercetoolsClient.createApiRoot(Utils.readConfiguration());
    const refreshToken = await Token.getTokensNeedingRefresh(apiRoot, process.env.TIKTOK_APP_KEY as string);

    logger.info('tokens needing refresh');
    if (!refreshToken) {
      response.status(200).send();
      return;
    }

    const { data } = await TiktokAuth.refreshAccessToken(
      refreshToken,
      process.env.TIKTOK_APP_KEY as string,
      process.env.TIKTOK_APP_SECRET as string,
    );
    if (data) {
      await Token.updateRefreshedToken(apiRoot, process.env.TIKTOK_APP_KEY as string, data);
    }

    response.status(200).send();
  } catch (error) {
    throw new CustomError(500, `Internal Server Error - Error retrieving all orders from the commercetools SDK`);
  }
};
