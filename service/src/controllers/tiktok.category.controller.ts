import { Request, Response } from 'express';
import { getAccessToken } from '../utils/tiktok.utils';
import { logger } from '../utils/logger.utils';
import { RouterService } from '../shared';

export const getCategories = async (req: Request, res: Response) => {
  const {
    shop_cipher,
    locale,
    keyword,
    listing_platform,
    include_prohibited_categories,
  } = req.query;

  if (!shop_cipher) {
    logger.error('No shop cipher found');
    return res.status(400).send('No shop cipher found');
  }

  const access_token = await getAccessToken();
  if (!access_token) {
    logger.error('No access token found getting categories');
    return res.status(401).send('No access token found');
  }

  const categories = await RouterService.getCategories(
    access_token,
    shop_cipher as string,
    {
      locale: locale as string | undefined,
      keyword: keyword as string | undefined,
      listing_platform: listing_platform as string | undefined,
      include_prohibited_categories: include_prohibited_categories === 'true',
    },
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

  const rules = await RouterService.getCategoryRules(
    access_token,
    shop_cipher as string,
    category_id,
    {
      category_version: category_version as string | undefined,
      locale: locale as string | undefined,
    },
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

  const attributes = await RouterService.getCategoryAttributes(
    access_token,
    shop_cipher as string,
    category_id,
    {
      locale: locale as string | undefined,
    },
  );
  return res.status(200).send(attributes);
};
