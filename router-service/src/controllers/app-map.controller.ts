import { Request, Response } from 'express';
import { getFirestoreClient } from '../utils/firestore.utils';
import {
  Firestore,
  TiktokAuth,
  TiktokShop,
  TiktokWarehouse,
} from 'tiktok-integration-shared';
import { logger } from '../utils/logger.utils';

/**
 * Stores an app mapping in Firestore
 * @param req - The request object
 * @param res - The response object
 * @returns The response object
 */
export const authorizeApp = async (req: Request, res: Response) => {
  const { app_key, code, locale, shop_region } = req.query;

  if (app_key !== process.env.TIKTOK_APP_KEY) {
    throw new Error('Invalid app key');
  }

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
    const { project_key, service_url, shop_doc_id, shop_id } = req.body;

    if (!project_key || !service_url || !shop_doc_id) {
      throw new Error('Project key, service url and docId are required');
    }

    const firestore = getFirestoreClient(req);

    const updateResult =
      await Firestore.FirestoreController.MapController.updateDataByDocId(
        firestore,
        shop_doc_id,
        {
          service_url: service_url,
          project_key: project_key,
          shop_id: shop_id,
        },
      );
    if (!updateResult) {
      throw new Error('Failed to update data by docId');
    }
    const appMapData =
      await Firestore.FirestoreController.MapController.getMappingById(
        firestore,
        shop_doc_id,
      );
    if (!appMapData) {
      throw new Error('Failed to get mapping by docId');
    }

    if (appMapData?.options?.code_consumed) {
      throw new Error('Code already consumed');
    }

    const { data } = await TiktokAuth.getAccessToken(
      appMapData?.options?.code as string,
      process.env.TIKTOK_APP_KEY as string,
      process.env.TIKTOK_APP_SECRET as string,
    ).catch((error) => {
      throw new Error('Cannot authenticate with tiktok: ' + error.message);
    });

    if (!data) {
      throw new Error('Cannot authenticate with tiktok');
    }

    const shops = await TiktokShop.getAuthorizedShops(data.access_token);
    if (!shops) {
      throw new Error('No shops found');
    }
    const shop = shops.find((shop) => shop.id === shop_id);
    if (!shop) {
      throw new Error('Shop not found');
    }

    const warehouses = await TiktokWarehouse.getWarehouseList(
      data.access_token,
      shop.cipher,
    );
    if (!warehouses || warehouses.length === 0) {
      throw new Error('No warehouses found in TikTok');
    }

    await Firestore.FirestoreController.MapController.updateOptionsByDocId(
      firestore,
      shop_doc_id,
      {
        code_consumed: true,
        shop_cipher: shop.cipher,
        warehouses: warehouses
          .map((warehouse) => ({
            id: warehouse.id,
            entityId: warehouse.entityId,
          }))
          .filter((warehouse) => warehouse.id && warehouse.entityId) as {
          id: string;
          entityId: string;
        }[],
      },
    );

    const updatedAppMapData =
      await Firestore.FirestoreController.MapController.getMappingById(
        firestore,
        shop_doc_id,
      );

    return res.status(200).send({
      access_token_data: data,
      app_map_data: updatedAppMapData,
    });
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
