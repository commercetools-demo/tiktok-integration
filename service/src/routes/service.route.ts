import { Router } from 'express';
import { logger } from '../utils/logger.utils';
import { post } from '../controllers/service.controller';
import { authorizeApp } from '../controllers/tiktok.auth.controller';
import { getShops } from '../controllers/tiktok.shop.controller';

const serviceRouter = Router();

serviceRouter.get('/authorize-app', async (req, res, next) => {
  await authorizeApp(req, res).catch((error) => {
    logger.error('Error authorizing app', error);
    return res.status(500).send(error.message);
  });
});

serviceRouter.get('/get-shops', async (req, res, next) => {
  await getShops(req, res).catch((error) => {
    logger.error('Error authorizing app', error);
    return res.status(500).send(error.message);
  });
});

serviceRouter.post('/', async (req, res, next) => {
  logger.info('Service post message received');

  try {
    await post(req, res);
  } catch (error) {
    next(error);
  }
});

export default serviceRouter;
