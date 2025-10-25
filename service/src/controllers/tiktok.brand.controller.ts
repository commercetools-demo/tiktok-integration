import { Request, Response } from 'express';
import { TiktokBrand } from 'tiktok-integration-shared';
import { getAccessToken } from '../utils/tiktok.utils';
import { logger } from '../utils/logger.utils';

export const getBrands = async (req: Request, res: Response) => {
  const { shop_cipher, page_size, page_token, category_id, is_authorized, brand_name, category_version } = req.query;

  if (!shop_cipher) {
    logger.error('No shop cipher found');
    return res.status(400).send('No shop cipher found');
  }

  const access_token = await getAccessToken();
  if (!access_token) {
    logger.error('No access token found getting brands');
    return res.status(401).send('No access token found');
  }

  const brands = await TiktokBrand.getBrands(
    access_token,
    shop_cipher as string,
    {
      pageSize: page_size ? parseInt(page_size as string) : 100,
      pageToken: page_token as string | undefined,
    },
    {
      categoryId: category_id as string | undefined,
      isAuthorized: is_authorized === 'true',
      brandName: brand_name as string | undefined,
      categoryVersion: category_version as string | undefined,
    },
  );
  return res.status(200).send(brands);
};
