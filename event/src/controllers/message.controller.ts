import { logger } from '../utils/logger.utils';
import {
  inventoryEntryMessageHandler,
  InventoryEntryMessageType,
} from './inventory/inventory-message.router';
import {
  orderStatusChange,
  reverseStatusUpdate,
} from './order/tiktok.order.controller';
import { productTailoringMessageHandler, ProductTailoringMessageType } from './product-tailoring/product-tailoring-message.router';
import {
  ProductMessageType,
  productMessageHandler,
} from './product/product-message.router';

export type TiktokWebhookOrderStatusChangeMessageType = {
  type: number;
  notificationType: string;
  tts_notification_id: string;
  shop_id: string;
  timestamp: number;
  data: {
    is_on_hold_order?: boolean;
    order_id: string;
    order_status: string;
    update_time: number;
  };
};

export const resourceMessage = async (
  message: ProductMessageType | InventoryEntryMessageType | ProductTailoringMessageType
) => {
  const { resource } = message;
  const { typeId, id } = resource;
  if (typeId === 'product') {
    const product = await productMessageHandler(
      message as ProductMessageType,
      id
    );
    logger.info(product);
  }
  if (typeId === 'inventory-entry') {
    const inventoryEntityid = await inventoryEntryMessageHandler(
      message as InventoryEntryMessageType,
      id
    );
    logger.info(inventoryEntityid);
  }
  if (typeId === 'product-tailoring') {
    const productTailoringId = await productTailoringMessageHandler(
      message as ProductTailoringMessageType,
      id
    );
    logger.info(productTailoringId);
  }
};

export const resourceTiktokWebhook = async (
  message: TiktokWebhookOrderStatusChangeMessageType
) => {
  if (message.shop_id !== process.env.TIKTOK_SHOP_ID) {
    return;
  }
  try {
    switch (message.type) {
      case 1:
        await orderStatusChange(message);
        break;
      case 2:
        await reverseStatusUpdate(message);
        break;
    }
  } catch (error) {
    logger.error('Error processing webhook', error);
  }
};
