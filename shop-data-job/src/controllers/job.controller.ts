import { Request, Response } from 'express';
import {
  CommercetoolsClient,
  CommercetoolsStorage,
  Services,
  Utils,
} from 'tiktok-integration-shared';
import CustomError from '../errors/custom.error';

/**
 * Exposed job endpoint.
 *
 * @param {Request} _request The express request
 * @param {Response} response The express response
 * @returns
 */
export const post = async (_request: Request, response: Response) => {
  try {
    const apiRoot = CommercetoolsClient.createApiRoot(
      Utils.readConfiguration(),
    );
    const access_token =
      await CommercetoolsStorage.TokenController.getAccessToken(
        apiRoot,
        process.env.TIKTOK_APP_KEY as string,
      );
    if (!access_token) {
      throw new Error('No access token found');
    }
    await Services.initializeShop(
      apiRoot,
      access_token,
      process.env.TIKTOK_APP_KEY as string,
      process.env.TIKTOK_SHOP_ID as string,
    );

    response.status(200).send();
  } catch (error) {
    throw new CustomError(
      500,
      `Internal Server Error - Error initializing shop`,
    );
  }
};
