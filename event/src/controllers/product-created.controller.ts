import { CommercetoolsClient, Token, TiktokProduct, Utils, TiktokShop } from 'tiktok-integration-shared';
import { logger } from '../utils/logger.utils';
import { CATEGORY } from '../contants/categories';
import { ATTRIBUTES } from '../contants/attributes';
import { Product202309CreateProductRequestBody } from 'tiktok-integration-shared/build/tiktok-sdk';
import { WAREHOUSES } from '../contants/warehouses';



export const productCreated = async (productId: string) => {
    const apiRoot = CommercetoolsClient.createApiRoot(Utils.readConfiguration());
    const { body: product } = await apiRoot.products().withId({ ID: productId }).get().execute();

    const imageUrl = product.masterData.current.masterVariant.images?.[0].url;

    const warehouseId = WAREHOUSES.find(warehouse => warehouse.isDefault)?.id;

    console.log('imageUrl', imageUrl);

    if (!imageUrl) {
        logger.error('No image URL found for product');
        return product;
    }

    const access_token = await Token.getAccessToken(apiRoot, process.env.TIKTOK_APP_KEY as string);
    console.log('access_token', access_token);
    const localeAndShopRegion = await Token.getLocaleAndShopRegion(apiRoot, process.env.TIKTOK_APP_KEY as string);
    console.log('localeAndShopRegion', localeAndShopRegion);
    if (!access_token || !localeAndShopRegion) {
        logger.error('No access token found');
        return product;
    }

    const resultUploadImage = await TiktokProduct.uploadProductImage(
        access_token,
        imageUrl,
        "MAIN_IMAGE"
    );
    if (!resultUploadImage) {
        logger.error('Failed to upload product image');
        return product;
    }

    const imageUri = resultUploadImage.data?.uri;
    console.log('imageUri', imageUri);
    if (!imageUri) {
        logger.error('No image URI found for product');
        return product;
    }

    const shops = await TiktokShop.getAuthorizedShops(access_token);
    console.log('shops', shops);
    if (!shops) {
        logger.error('No shops found');
        return product;
    }

    const shop = shops.data?.shops?.[0];
    console.log('shop', shop);
    if (!shop || !shop.cipher) {
        logger.error('No shop found');
        return product;
    }

    console.log('shop.cipher', shop.cipher);

    const productDraft: Product202309CreateProductRequestBody = {
        saveMode: "AS_DRAFT",
        title: product.masterData.current.name?.[localeAndShopRegion.locale],
        description: product.masterData.current.description?.[localeAndShopRegion.locale],
        categoryVersion: 'v2',
        packageWeight: {
            value: "3.00",
            unit: "POUND"
        },
        categoryId: CATEGORY.id,
        mainImages: [
            {
                uri: imageUri,
            }
        ],
        // productAttributes: [
        //     {
                
        //     }
        // ],
        skus: [
            {
                inventory: [
                    {
                        quantity: 100,
                        warehouseId: warehouseId
                    }
                ],
                externalSkuId: product.masterData.current.masterVariant.sku,
                sellerSku: product.masterData.current.masterVariant.sku,
                listPrice: {
                    amount: product.masterData.current.masterVariant.prices?.[0].value.centAmount.toString(),
                    currency: product.masterData.current.masterVariant.prices?.[0].value.currencyCode
                },
                price: {
                    amount: product.masterData.current.masterVariant.prices?.[0].value.centAmount.toString(),
                    currency: product.masterData.current.masterVariant.prices?.[0].value.currencyCode,
                    salePrice: product.masterData.current.masterVariant.prices?.[0].value.centAmount.toString(),
                },
                salesAttributes: [
                    {
                        id: ATTRIBUTES.find(attribute => attribute.name === "Color")?.id,
                        // valueId: ATTRIBUTES.find(attribute => attribute.name === "Color")?.id,
                        // name: product.masterData.current.masterVariant.attributes?.find(attribute => attribute.name === "color")?.value?.[localeAndShopRegion.locale],
                        valueName: "Charcoal",
                        
                    }
                ],
                
            }
        ]
    };
    console.log('productDraft', JSON.stringify(productDraft, null, 2));
    const resultCreateProduct = await TiktokProduct.createProduct(
        access_token,
        shop.cipher,
        productDraft
    );
    console.log('resultCreateProduct', resultCreateProduct);
    if (!resultCreateProduct) {
        logger.error('Failed to create product');
        return product;
    }

    return resultCreateProduct;
}