import { Request, Response } from 'express';
import { TiktokCategory } from 'tiktok-integration-shared';
import { getAccessToken } from '../utils/tiktok.utils';
import { logger } from '../utils/logger.utils';

export const getCategories = async (req: Request, res: Response) => {
    const { shop_cipher, locale, keyword, category_version, listing_platform, include_prohibited_categories } = req.query;
    
    if (!shop_cipher) {
        logger.error('No shop cipher found');
        return res.status(400).send('No shop cipher found');
    }
    
    const access_token = await getAccessToken();
    if (!access_token) {
        logger.error('No access token found getting categories');
        return res.status(401).send('No access token found');
    }
    
    const categories = await TiktokCategory.getCategories(
        access_token,
        shop_cipher as string,
        {
            locale: locale as string | undefined,
            keyword: keyword as string | undefined,
            categoryVersion: (category_version as string) || 'v2',
            listingPlatform: listing_platform as string | undefined,
            includeProhibitedCategories: include_prohibited_categories === 'true'
        }
    );
    return res.status(200).send(categories);
};

export const getCategoryRules = async (req: Request, res: Response) => {
    const { category_id } = req.params;
    const { shop_cipher, category_version, locale } = req.query;
    
    if (!shop_cipher) {
        logger.error('No shop cipher found');
        return res.status(400).send('No shop cipher found');
    }
    
    if (!category_id) {
        logger.error('No category_id found');
        return res.status(400).send('No category_id found');
    }
    
    const access_token = await getAccessToken();
    if (!access_token) {
        logger.error('No access token found getting category rules');
        return res.status(401).send('No access token found');
    }
    
    const rules = await TiktokCategory.getCategoryRules(
        access_token,
        category_id,
        shop_cipher as string,
        {
            categoryVersion: category_version as string | undefined,
            locale: locale as string | undefined
        }
    );
    return res.status(200).send(rules);
};

export const getCategoryAttributes = async (req: Request, res: Response) => {
    const { category_id } = req.params;
    const { shop_cipher, locale } = req.query;
    
    if (!shop_cipher) {
        logger.error('No shop cipher found');
        return res.status(400).send('No shop cipher found');
    }
    
    if (!category_id) {
        logger.error('No category_id found');
        return res.status(400).send('No category_id found');
    }
    
    const access_token = await getAccessToken();
    if (!access_token) {
        logger.error('No access token found getting category attributes');
        return res.status(401).send('No access token found');
    }
    
    const attributes = await TiktokCategory.getCategoryAttributes(
        access_token,
        category_id,
        shop_cipher as string,
        {
            locale: locale as string | undefined,
        }
    );
    return res.status(200).send(attributes);
};

