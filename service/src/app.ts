import * as dotenv from 'dotenv';
dotenv.config();

import express, { Express } from 'express';
import bodyParser from 'body-parser';

// Import routes
import ServiceRoutes from './routes/service.route';
import TiktokRoutes from './routes/tiktok.route';
import WebhookRoutes from './routes/webhook.route';
import { Utils } from 'tiktok-integration-shared';
import { errorMiddleware } from './middleware/error.middleware';
import CustomError from './errors/custom.error';
import { initializeFirestoreClient } from './utils/firestore.utils';

// Read env variables
Utils.readConfiguration();

const featureFlagEnableTiktokRoutes = process.env.FEATURE_FLAG_ENABLE_TEST_TIKTOK_ROUTES === 'true';

// Create the express app
const app: Express = express();
app.disable('x-powered-by');

// Initialize Firestore client and make it available to all routes
initializeFirestoreClient(app);

// Define configurations
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes
app.use('/service', ServiceRoutes);
app.use('/service/webhook', WebhookRoutes);
featureFlagEnableTiktokRoutes && app.use('/service/tiktok', TiktokRoutes);
app.use('*', () => {
  throw new CustomError(404, 'Path not found.');
});
// Global error handler
app.use(errorMiddleware);

export default app;
