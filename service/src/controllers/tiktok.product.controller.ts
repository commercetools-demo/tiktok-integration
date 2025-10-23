import { FirestoreClient, TiktokProduct } from "tiktok-integration-shared";
import { logger } from "../utils/logger.utils";
import { Request, Response } from "express";

export const searchProducts = async (req: Request, res: Response) => {
    const { shop_cipher } = req.query;
    if (!shop_cipher) {
        logger.error('No shop cipher found');
        return res.status(400).send('No shop cipher found');
    }
    const access_token = await FirestoreClient.getAccessToken(process.env.TIKTOK_APP_KEY as string);
    if (!access_token) {
        logger.error('No access token found getting shops');
        return res.status(401).send('No access token found');
    }
    const products = await TiktokProduct.productSearch(access_token, shop_cipher as string);
    return res.status(200).send(products);
}

export const checkListingPrerequisites = async (req: Request, res: Response) => {
    const { shop_cipher } = req.query;
    if (!shop_cipher) {
        logger.error('No shop cipher found');
        return res.status(400).send('No shop cipher found');
    }
    const access_token = await FirestoreClient.getAccessToken(process.env.TIKTOK_APP_KEY as string);
    if (!access_token) {
        logger.error('No access token found getting shops');
        return res.status(401).send('No access token found');
    }
    const prerequisites = await TiktokProduct.checkListingPrerequisites(access_token, shop_cipher as string);
    return res.status(200).send(prerequisites);
}