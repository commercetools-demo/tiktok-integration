import { ResourceCreatedDeliveryPayload } from '@commercetools/platform-sdk';
import { productCreated } from './product-created.controller';


export const resourceCreation = async (resourceCreatedMessage: ResourceCreatedDeliveryPayload) => {
    const { resource } = resourceCreatedMessage;
    const { typeId, id } = resource;
    if (typeId === 'product') {
        const product = await productCreated(id);
        console.log(product);
    }
}