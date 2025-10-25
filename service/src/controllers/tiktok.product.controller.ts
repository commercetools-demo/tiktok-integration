import { Request, Response } from 'express';
import { TiktokProduct } from 'tiktok-integration-shared';
import { getAccessToken } from '../utils/tiktok.utils';
import { logger } from '../utils/logger.utils';

export const searchProducts = async (req: Request, res: Response) => {
  const { shop_cipher } = req.query;
  if (!shop_cipher) {
    logger.error('No shop cipher found');
    return res.status(400).send('No shop cipher found');
  }
  const access_token = await getAccessToken();
  if (!access_token) {
    logger.error('No access token found getting shops');
    return res.status(401).send('No access token found');
  }
  const products = await TiktokProduct.productSearch(access_token, shop_cipher as string);
  return res.status(200).send(products);
};

export const checkListingPrerequisites = async (req: Request, res: Response) => {
  const { shop_cipher } = req.query;
  if (!shop_cipher) {
    logger.error('No shop cipher found');
    return res.status(400).send('No shop cipher found');
  }
  const access_token = await getAccessToken();
  if (!access_token) {
    logger.error('No access token found getting shops');
    return res.status(401).send('No access token found');
  }
  const prerequisites = await TiktokProduct.checkListingPrerequisites(access_token, shop_cipher as string);
  return res.status(200).send(prerequisites);
};

export const uploadProductImage = async (req: Request, res: Response) => {
  const { use_case = 'MAIN_IMAGE' } = req.query;
  const { imageUrl } = req.body;

  if (!imageUrl) {
    logger.error('No image URL provided');
    return res.status(400).send('No image URL provided in request body');
  }

  const access_token = await getAccessToken();
  if (!access_token) {
    logger.error('No access token found uploading image');
    return res.status(401).send('No access token found');
  }

  const result = await TiktokProduct.uploadProductImage(access_token, imageUrl, use_case as string | undefined);
  return res.status(200).send(result);
};

export const createProduct = async (req: Request, res: Response) => {
  const { shop_cipher } = req.query;

  if (!shop_cipher) {
    logger.error('No shop cipher found');
    return res.status(400).send('No shop cipher found');
  }

  if (!req.body) {
    logger.error('No product data provided');
    return res.status(400).send('No product data provided');
  }

  const access_token = await getAccessToken();
  if (!access_token) {
    logger.error('No access token found creating product');
    return res.status(401).send('No access token found');
  }

  const product = await TiktokProduct.createProduct(access_token, shop_cipher as string, req.body);
  return res.status(200).send(product);
};

export const updateProduct = async (req: Request, res: Response) => {
  const { product_id } = req.params;
  const { shop_cipher } = req.query;

  if (!shop_cipher) {
    logger.error('No shop cipher found');
    return res.status(400).send('No shop cipher found');
  }

  if (!product_id) {
    logger.error('No product_id found');
    return res.status(400).send('No product_id found');
  }

  if (!req.body) {
    logger.error('No product data provided');
    return res.status(400).send('No product data provided');
  }

  const access_token = await getAccessToken();
  if (!access_token) {
    logger.error('No access token found updating product');
    return res.status(401).send('No access token found');
  }

  const result = await TiktokProduct.updateProduct(access_token, product_id, shop_cipher as string, req.body);
  return res.status(200).send(result);
};

export const activateProduct = async (req: Request, res: Response) => {
  const { product_id } = req.params;
  const { shop_cipher, listing_platforms } = req.query;

  if (!shop_cipher) {
    logger.error('No shop cipher found');
    return res.status(400).send('No shop cipher found');
  }

  if (!product_id) {
    logger.error('No product_id found');
    return res.status(400).send('No product_id found');
  }

  const access_token = await getAccessToken();
  if (!access_token) {
    logger.error('No access token found activating product');
    return res.status(401).send('No access token found');
  }

  const platforms = listing_platforms ? (listing_platforms as string).split(',') : undefined;

  const result = await TiktokProduct.activateProduct(access_token, product_id, shop_cipher as string, platforms);
  return res.status(200).send(result);
};
