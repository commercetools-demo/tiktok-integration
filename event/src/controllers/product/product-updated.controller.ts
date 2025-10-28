import { CommercetoolsClient, Utils } from "tiktok-integration-shared";
import { Message, ProductPriceAddedMessage, ProductPriceChangedMessage, ProductPriceRemovedMessage, ProductPublishedMessage, ProductUnpublishedMessage, ProductSlugChangedMessage } from "@commercetools/platform-sdk";
import { productPriceAdded, productPriceChanged, productPriceRemoved } from "./product-price.controller";
import { productPublished, productUnpublished, productSlugChanged } from "./product-state.controller";

export type ProductMessageType = ProductPriceChangedMessage | ProductPriceAddedMessage | ProductPriceRemovedMessage | ProductPublishedMessage | ProductUnpublishedMessage | ProductSlugChangedMessage


export const productUpdated = async (message: ProductMessageType, productId: string): Promise<string> => {

  switch (message.type) {
    case 'ProductPriceChanged':
      return productPriceChanged(message, productId);
    case 'ProductPriceAdded':
      return await productPriceAdded(message, productId);
    case 'ProductPriceRemoved':
      return await productPriceRemoved(message, productId);
    case 'ProductPublished':
      return await productPublished(message, productId);
    case 'ProductUnpublished':
      return await productUnpublished(message, productId);
    case 'ProductSlugChanged':
      return await productSlugChanged(message, productId);
    default:
      return productId;
  }

}