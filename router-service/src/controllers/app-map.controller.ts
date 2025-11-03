import { Request, Response } from 'express';
import { getFirestoreClient } from '../utils/firestore.utils';
import { Firestore } from 'tiktok-integration-shared';
import { logger } from '../utils/logger.utils';

/**
 * Stores an app mapping in Firestore
 * @param req - The request object
 * @param res - The response object
 * @returns The response object
 */
export const authorizeApp = async (req: Request, res: Response) => {
  const { app_key, code, locale, shop_region } = req.query;

  const firestore = getFirestoreClient(req);
  const docId = await Firestore.FirestoreController.MapController.storeMapping(
    firestore,
    app_key as string,
    undefined,
    undefined,
    {
      locale: locale as string,
      shop_region: shop_region as string,
      code: code as string,
    },
  );

  return res.status(200).send(docId);
};

/**
 * Stores a project mapping in Firestore
 * @param req - The request object
 * @param res - The response object
 * @returns The response object
 */
export const authorizeProject = async (req: Request, res: Response) => {
  try {
    const { project_key, service_url, docId } = req.body;

    if (!project_key || !service_url || !docId) {
      throw new Error('Project key, service url and docId are required');
    }

    const firestore = getFirestoreClient(req);

    const updateResult =
      await Firestore.FirestoreController.MapController.updateDataByDocId(
        firestore,
        docId,
        {
          service_url: service_url,
          project_key: project_key,
        },
      );
    if (!updateResult) {
      throw new Error('Failed to update data by docId');
    }
    const appMapData =
      await Firestore.FirestoreController.MapController.getMappingById(
        firestore,
        docId,
      );
    if (!appMapData) {
      throw new Error('Failed to get mapping by docId');
    }
    //TODO: initialize shop
    // call service url to initialize shop
    const response = await fetch(service_url + '/initialize-shop', {
      method: 'POST',
      body: JSON.stringify(appMapData),
    });

    return res.status(200).send(updateResult);
  } catch (error) {
    logger.error('Error authorizing project', error);
    return res.status(500).send((error as Error).message);
  }
};
/**
 * Sets seller data for a project mapping in Firestore
 * @param req - The request object
 * @param res - The response object
 * @returns The response object
 */
export const setSellerData = async (req: Request, res: Response) => {
  try {
    const { seller_name, seller_id, docId } = req.body;

    if (!seller_name || !seller_id || !docId) {
      throw new Error('Seller name, seller id and docId are required');
    }

    const firestore = getFirestoreClient(req);

    const updateResult =
      await Firestore.FirestoreController.MapController.updateOptionsByDocId(
        firestore,
        docId,
        {
          seller_name: seller_name,
          seller_id: seller_id,
        },
      );
    if (!updateResult) {
      throw new Error('Failed to update data by docId');
    }
    return res.status(200).send(updateResult);
  } catch (error) {
    logger.error('Error authorizing project', error);
    return res.status(500).send((error as Error).message);
  }
};
