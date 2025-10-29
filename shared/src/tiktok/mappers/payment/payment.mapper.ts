import { PaymentDraft } from '@commercetools/platform-sdk';
import { Order202507GetOrderDetailResponseDataOrders } from '../../../tiktok-sdk';
import { convertPriceToCentAmount } from '../../../utils';

export const tiktokOrderToCommercetoolsPaymentDraft = (
  order: Order202507GetOrderDetailResponseDataOrders,
  options: { locale?: string; shopRegion?: string },
): PaymentDraft => {
  return {
    amountPlanned: {
      currencyCode: order?.payment?.currency || 'USD',
      centAmount: convertPriceToCentAmount(order?.payment?.totalAmount),
    },
    paymentMethodInfo: {
      name: {
        [options.locale || 'en']:
          order?.paymentMethodName || 'Unknown Payment Method',
      },
    },
  };
};
