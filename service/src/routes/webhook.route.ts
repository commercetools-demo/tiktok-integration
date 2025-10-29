import { Router } from 'express';
import { orderStatusChange, reverseStatusUpdate } from '../controllers/order/tiktok.order.controller';
import { logger } from '../utils/logger.utils';

const webhookRouter = Router();

webhookRouter.post('/', async (req, res, next) => {

  const webhookBody = req.body;
  if (webhookBody.shop_id !== process.env.TIKTOK_SHOP_ID) {
    return res.status(400).send('Invalid shop ID');
  }

  try {
    switch (webhookBody.type) {
      case 1:
        await orderStatusChange(webhookBody);
        break;
      case 2:
        await reverseStatusUpdate(webhookBody);
        break;
    }
  } catch (error) {
    logger.error('Error processing webhook', error);
    return res.status(500).send('Internal server error');
  }
  return res.status(200).send('Webhook received');

});

export default webhookRouter;