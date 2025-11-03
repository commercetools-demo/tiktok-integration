import { Application, Request } from 'express';
import { Firestore } from '@google-cloud/firestore';
import { Firestore as FirestoreModule } from 'tiktok-integration-shared';

/**
 * Initialize Firestore client from environment variables
 * @returns Firestore client instance or null if environment variables are not set
 */
export const initializeFirestoreClient = (app: Application): Firestore | null => {
  if (
    !process.env.FIRESTORE_PROJECT_ID ||
    !process.env.FIRESTORE_DATABASE_ID ||
    !process.env.FIRESTORE_CLIENT_EMAIL ||
    !process.env.FIRESTORE_PRIVATE_KEY
  ) {
    console.log('Firestore environment variables not configured, skipping initialization');
    return null;
  }

  try {
    const firestoreClient = FirestoreModule.FirestoreClient.createFirestoreClient({
      projectId: process.env.FIRESTORE_PROJECT_ID,
      databaseId: process.env.FIRESTORE_DATABASE_ID,
      credentials: {
        client_email: process.env.FIRESTORE_CLIENT_EMAIL,
        private_key: process.env.FIRESTORE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
    });
    
    app.locals.firestoreClient = firestoreClient;
    return firestoreClient;
  } catch (error) {
    console.error('Failed to initialize Firestore client:', error);
    return null;
  }
};

/**
 * Get the Firestore client from the Express app locals
 * @param req - Express request object
 * @returns Firestore client instance or null if not initialized
 */
export const getFirestoreClient = (req: Request): Firestore => {
  const firestore = req.app.locals.firestoreClient;
  if (!firestore) {
    throw new Error('Firestore client not initialized');
  }
  return firestore;
};

/**
 * Check if Firestore client is available
 * @param req - Express request object
 * @returns True if Firestore client is initialized, false otherwise
 */
export const hasFirestoreClient = (req: Request): boolean => {
  return req.app.locals.firestoreClient !== null;
};

