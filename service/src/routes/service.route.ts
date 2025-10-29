import { Router } from 'express';
import { logger } from '../utils/logger.utils';
import { authorizeApp } from '../controllers/tiktok.auth.controller';
import { fullProductSync } from '../controllers/full-product-sync.controller';
import { shopConfigSync } from '../controllers/shop-config-sync.controller';

const serviceRouter = Router();

serviceRouter.get('/authorize-app', async (req, res, next) => {
  await authorizeApp(req, res).catch((error) => {
    logger.error('Error authorizing app', error);
    return res.status(500).send(error.message);
  });
});

serviceRouter.get('/full-product-sync', async (req, res, next) => {
  await fullProductSync(req, res).catch((error) => {
    logger.error('Error full syncing', error);
    return res.status(500).send(error.message);
  });
});
serviceRouter.get('/shop-config-sync', async (req, res, next) => {
  await shopConfigSync(req, res).catch((error) => {
    logger.error('Error full syncing', error);
    return res.status(500).send(error.message);
  });
});

export default serviceRouter;
