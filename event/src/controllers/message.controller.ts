import { ProductMessageType, productMessageHandler } from "./product/product-message.controller";

export const resourceMessage = async (message: ProductMessageType) => {
  const { resource } = message;
  const { typeId, id } = resource;
  if (typeId === 'product') {
    const product = await productMessageHandler(message, id);
    console.log(product);
  }
}