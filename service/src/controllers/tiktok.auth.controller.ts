import { Request, Response } from 'express';
import {
  TiktokAuth,
  FirestoreClient,
} from 'tiktok-integration-shared';


export const authorizeApp = async (req: Request, res: Response) => {
  const { app_key, code } = req.query;

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

  const firestore = FirestoreClient.createFirestoreClient();
  await FirestoreClient.storeAccessToken(firestore, data);

  console.log(`Token stored successfully for seller: ${data.seller_name}`);

  res.status(200).send('success');
};
