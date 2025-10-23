import { Request, Response } from 'express';
import {
  TiktokAuth,
  FirestoreClient,
  FirestoreActions,
} from 'tiktok-integration-shared';


export const authorizeApp = async (req: Request, res: Response) => {
  const { app_key, code, locale, shop_region } = req.query;

  if (app_key !== process.env.TIKTOK_APP_KEY || !code) {
    return res.status(401).send('Unauthorized');
  }
  const { data } = await TiktokAuth.getAccessToken(
    code as string,
    app_key as string,
    process.env.TIKTOK_APP_SECRET as string
  );

  if (!data) {
    return res.status(400).send('Failed to get access token data');
  }

  const firestore = FirestoreClient.createFirestoreClient({
    projectId: process.env.GCP_PROJECT_ID as string,
    databaseId: process.env.GCP_FIRESTORE_DATABASE_ID as string,
    credentials: {
      client_email: process.env.GCP_SERVICE_ACCOUNT_CLIENT_EMAIL as string,
      private_key: process.env.GCP_SERVICE_ACCOUNT_PRIVATE_KEY as string,
    },
  });
  await FirestoreActions.storeAccessToken(firestore, process.env.TIKTOK_APP_KEY as string, data, locale as string, shop_region as string);

  console.log(`Token stored successfully for seller: ${data.seller_name}`);

  res.status(200).send('success');
};
