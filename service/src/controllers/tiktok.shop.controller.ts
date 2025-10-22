import { Request, Response } from 'express';
import {  FirestoreClient, TiktokShop } from 'tiktok-integration-shared';
import { logger } from '../utils/logger.utils';

export const getShops = async (req: Request, res: Response) => {    
    const access_token = await FirestoreClient.getAccessToken(process.env.TIKTOK_APP_KEY as string);
    if (!access_token) {
        logger.error('No access token found getting shops');
        return res.status(401).send('No access token found');
    }
    const shops = await TiktokShop.getAuthorizedShops(access_token);
    return res.status(200).send(shops);
}