import { Router } from 'express';
import { logger } from '../utils/logger.utils';
import { connectProject } from '../controllers/tiktok.auth.controller';
import {
  fullProductCheck,
  fullProductSync,
  selectiveProductSync,
} from '../controllers/product-sync.controller';
import { shopConfigSync } from '../controllers/shop-config-sync.controller';

const serviceRouter = Router();

serviceRouter.get('/connect-project', async (req, res) => {
  await connectProject(req, res).catch((error) => {
    logger.error('Error authorizing app', error);
    return res.status(500).send(error.message);
  });
});

serviceRouter.get('/full-product-sync', async (req, res) => {
  await fullProductSync(req, res).catch((error) => {
    logger.error('Error full syncing', error);
    return res.status(500).send(error.message);
  });
});

serviceRouter.post('/selective-product-sync', async (req, res) => {
  await selectiveProductSync(req, res).catch((error) => {
    logger.error('Error full syncing', error);
    return res.status(500).send(error.message);
  });
});

serviceRouter.get('/full-product-check', async (req, res) => {
  await fullProductCheck(req, res).catch((error) => {
    logger.error('Error full syncing', error);
    return res.status(500).send(error.message);
  });
});

serviceRouter.get('/shop-config-sync', async (req, res) => {
  await shopConfigSync(req, res).catch((error) => {
    logger.error('Error full syncing', error);
    return res.status(500).send(error.message);
  });
});

export default serviceRouter;
