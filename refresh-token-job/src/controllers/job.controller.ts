import { Request, Response } from 'express';

import CustomError from '../errors/custom.error';
import { logger } from '../utils/logger.utils';
import { CommercetoolsClient, Utils, CommercetoolsStorage, RouterService } from '../shared';

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

    const data = await RouterService.refreshAccessToken(refreshToken);
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
