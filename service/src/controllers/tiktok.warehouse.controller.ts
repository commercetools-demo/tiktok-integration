import { Request, Response } from 'express';
import { TiktokWarehouse } from 'tiktok-integration-shared';
import { getAccessToken } from '../utils/tiktok.utils';
import { logger } from '../utils/logger.utils';

export const getWarehouseList = async (req: Request, res: Response) => {
    const { shop_cipher } = req.query;
    
    const access_token = await getAccessToken();
    if (!access_token) {
        logger.error('No access token found getting warehouse list');
        return res.status(401).send('No access token found');
    }
    
    const warehouses = await TiktokWarehouse.getWarehouseList(
        access_token,
        shop_cipher as string | undefined
    );
    return res.status(200).send(warehouses);
};

