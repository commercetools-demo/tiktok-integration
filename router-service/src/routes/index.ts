import { Router } from 'express';
import { logger } from '../utils/logger.utils';
import { authorizeApp , authorizeProject} from '../controllers/app-map.controller';

const serviceRouter = Router();

/**
 * Gets called by the TikTok app to authorize the app
 */
serviceRouter.get('/authorize-app', async (req, res, next) => {
  await authorizeApp(req, res).catch((error) => {
    logger.error('Error authorizing app', error);
    return res.status(500).send(error.message);
  });
});

/**
 * Gets called by the MC app to authorize the project
 */
serviceRouter.post('/authorize-project', async (req, res, next) => {
  await authorizeProject(req, res).catch((error) => {
    logger.error('Error authorizing app', error);
    return res.status(500).send(error.message);
  });
});


export default serviceRouter;
