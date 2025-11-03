import * as dotenv from 'dotenv';
dotenv.config();

import express, { Express } from 'express';
import bodyParser from 'body-parser';

// Import routes
import RouterServiceRoutes from './routes';
import WebhookRoutes from './routes/router-webhook.route';
import { Utils } from 'tiktok-integration-shared';
import { errorMiddleware } from './middleware/error.middleware';
import CustomError from './errors/custom.error';
import { initializeFirestoreClient } from './utils/firestore.utils';

// Read env variables
Utils.readConfiguration();


// Create the express app
const app: Express = express();
app.disable('x-powered-by');

// Initialize Firestore client and make it available to all routes
initializeFirestoreClient(app);

// Define configurations
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes
app.use('/router-service', RouterServiceRoutes);
app.use('/router-service/webhook', WebhookRoutes);
app.use('*', () => {
  throw new CustomError(404, 'Path not found.');
});
// Global error handler
app.use(errorMiddleware);

export default app;
