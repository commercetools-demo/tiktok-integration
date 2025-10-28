import { ProductMessageType, productUpdated } from "./product/product-updated.controller";

export const resourceMessage = async (message: ProductMessageType) => {
  const { resource } = message;
  const { typeId, id } = resource;
  if (typeId === 'product') {
    const product = await productUpdated(message, id);
    console.log(product);
  }
}