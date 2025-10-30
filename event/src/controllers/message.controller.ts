import { inventoryEntryMessageHandler, InventoryEntryMessageType } from "./inventory/inventory-message.router";
import { ProductMessageType, productMessageHandler } from "./product/product-message.router";

export const resourceMessage = async (message: ProductMessageType | InventoryEntryMessageType) => {
  const { resource } = message;
  const { typeId, id } = resource;
  if (typeId === 'product') {
    const product = await productMessageHandler(message as ProductMessageType, id);
    console.log(product);
  }
  if (typeId === 'inventory-entry') {
    const inventoryEntityid = await inventoryEntryMessageHandler(message as InventoryEntryMessageType, id);
    console.log(inventoryEntityid);
  }
}