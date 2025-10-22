import { Request, Response } from 'express';

import CustomError from '../errors/custom.error';
import { logger } from '../utils/logger.utils';
import {
FirestoreClient,
TiktokAuth,
} from 'tiktok-integration-shared';

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
    const tokens = await FirestoreClient.getTokensNeedingRefresh(firestore);

    logger.info('tokens needing refresh', tokens.length);
    if (tokens.length === 0) {
      response.status(200).send();
      return;
    }

    for await (const token of tokens) {
      const { refresh_token } = token;
      const { data } = await TiktokAuth.refreshAccessToken(
        refresh_token,
        process.env.TIKTOK_APP_KEY as string,
        process.env.TIKTOK_APP_SECRET as string
      );
      if (data) {
        await FirestoreClient.storeAccessToken(firestore, data);
      }
    }

    response.status(200).send();
  } catch (error) {
    throw new CustomError(
      500,
      `Internal Server Error - Error retrieving all orders from the commercetools SDK`
    );
  }
};
