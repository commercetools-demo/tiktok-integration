import {
  ByProjectKeyRequestBuilder,
  OrderUpdateAction,
} from '@commercetools/platform-sdk';
import { OrderController } from '../commercetools';
import { TiktokOrder } from '../interfaces/order';

export const updateCommercetoolsOrderFromTiktokOrder = async (
  apiRoot: ByProjectKeyRequestBuilder,
  order: TiktokOrder,
  updateActions: OrderUpdateAction[],
) => {
  const commercetoolsOrder = await OrderController.queryOrder(
    apiRoot,
    `custom(fields(tiktokOrderId="${order.id}"))`,
  );
  if (!commercetoolsOrder) {
    throw new Error(`Order ${order.id} not found`);
  }
  const updatedOrder = await OrderController.updateOrder(
    apiRoot,
    commercetoolsOrder.id,
    commercetoolsOrder.version,
    updateActions,
  );
  return updatedOrder;
};
