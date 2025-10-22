import { Request, Response } from 'express';

import CustomError from '../errors/custom.error';
import { logger } from '../utils/logger.utils';
import { FirestoreClient, TiktokAuth } from 'tiktok-integration-shared';

/**
 * Exposed job endpoint.
 *
 * @param {Request} _request The express request
 * @param {Response} response The express response
 * @returns
 */
export const post = async (_request: Request, response: Response) => {
  try {
    const firestore = FirestoreClient.createFirestoreClient();
    const token = await FirestoreClient.getTokensNeedingRefresh(firestore, process.env.TIKTOK_APP_KEY as string);

    logger.info('tokens needing refresh');
    if (!token) {
      response.status(200).send();
      return;
    }

    const { refresh_token } = token;
    const { data } = await TiktokAuth.refreshAccessToken(
      refresh_token,
      process.env.TIKTOK_APP_KEY as string,
      process.env.TIKTOK_APP_SECRET as string
    );
    if (data) {
      await FirestoreClient.storeAccessToken(
        firestore,
        process.env.TIKTOK_APP_KEY as string,
        data
      );
    }

    response.status(200).send();
  } catch (error) {
    throw new CustomError(
      500,
      `Internal Server Error - Error retrieving all orders from the commercetools SDK`
    );
  }
};
