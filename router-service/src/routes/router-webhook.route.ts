import { Router } from 'express';
import { Firestore } from 'tiktok-integration-shared';
import { getFirestoreClient } from '../utils/firestore.utils';

const webhookRouter = Router();

webhookRouter.post('/', async (req, res, next) => {
  const webhookBody = req.body;
  if (!webhookBody.shop_id) {
    return res.status(400).send('Invalid shop ID');
  }

  const firestore = getFirestoreClient(req);
  const mapping =
    await Firestore.FirestoreController.MapController.getMappingBySellerId(
      firestore,
      webhookBody.shop_id,
    );

  if (!mapping) {
    return res.status(400).send('No record found for this shop');
  }

  return fetch(mapping.service_url + '/webhook', {
    method: 'POST',
    body: JSON.stringify(webhookBody),
  });
});

export default webhookRouter;
