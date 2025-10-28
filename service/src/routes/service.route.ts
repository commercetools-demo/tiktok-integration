import { Router } from 'express';
import { logger } from '../utils/logger.utils';
import { authorizeApp } from '../controllers/tiktok.auth.controller';
import { fullSync } from '../controllers/full-sync.controller';

const serviceRouter = Router();

serviceRouter.get('/authorize-app', async (req, res, next) => {
  await authorizeApp(req, res).catch((error) => {
    logger.error('Error authorizing app', error);
    return res.status(500).send(error.message);
  });
});

serviceRouter.get('/full-sync', async (req, res, next) => {
  await fullSync(req, res).catch((error) => {
    logger.error('Error full syncing', error);
    return res.status(500).send(error.message);
  });
});

export default serviceRouter;
