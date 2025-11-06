import * as dotenv from 'dotenv';
dotenv.config();

import bodyParser from 'body-parser';
import express, { Express } from 'express';

// Import routes
import { Utils } from './shared';
import CustomError from './errors/custom.error';
import { errorMiddleware } from './middleware/error.middleware';
import ServiceRoutes from './routes/service.route';
import TiktokRoutes from './routes/tiktok.route';
import { logger } from './utils/logger.utils';

// Read env variables
Utils.readConfiguration();

const featureFlagEnableTiktokRoutes =
  process.env.FEATURE_FLAG_ENABLE_TEST_TIKTOK_ROUTES === 'true';

// Create the express app
const app: Express = express();
app.disable('x-powered-by');

// Define configurations
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes
app.use('/service', ServiceRoutes);
featureFlagEnableTiktokRoutes && app.use('/service/tiktok', TiktokRoutes);
app.use('*', (req) => {
  logger.info('Path not found.', req.path);
  throw new CustomError(404, 'Path not found.');
});
// Global error handler
app.use(errorMiddleware);

export default app;
