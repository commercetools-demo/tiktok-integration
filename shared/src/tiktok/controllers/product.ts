import {
  Product202309SearchProductsRequestBody,
  Product202309CreateProductRequestBody,
  Product202309EditProductRequestBody,
  Product202309ActivateProductRequestBody,
  Product202309SearchProductsResponseData,
  Product202309UpdatePriceRequestBody,
  Product202309SearchProductsResponseDataProducts,
  Product202309GetProductResponseData,
  Product202509PartialEditProductRequestBody,
} from '../../tiktok-sdk';
import { RequestFile } from '../../tiktok-sdk/api/apis';
import { client } from './client';
import * as https from 'https';
import * as http from 'http';
import { Mappers, Services } from '../..';
import { logger } from '../../utils/logger';

export const productSearch = async (
  page?: {
    pageSize: number;
    pageToken?: string;
  },
  query?: Product202309SearchProductsRequestBody,
): Promise<Product202309SearchProductsResponseData | undefined> => {
  const tiktokShop = await Services.getShopCipher();
  if (!tiktokShop) {
    throw new Error('No TikTok shop found');
  }
  const { body } = await client.api.ProductV202309Api.ProductsSearchPost(
    page?.pageSize ?? 10,
    tiktokShop.access_token,
    'application/json',
    page?.pageToken ?? undefined,
    undefined,
    tiktokShop.shopCipher,
    query ?? undefined,
  );
  return body.data;
};

export const getProduct = async (
  product_id: string,
  options?: {
    locale?: string;
    draft?: boolean;
  },
): Promise<Product202309GetProductResponseData | undefined> => {
  const tiktokShop = await Services.getShopCipher();
  if (!tiktokShop) {
    throw new Error('No TikTok shop found');
  }
  const { body } = await client.api.ProductV202309Api.ProductsProductIdGet(
    product_id,
    tiktokShop.access_token,
    'application/json',
    false,
    !!options?.draft,
    options?.locale,
    tiktokShop.shopCipher,
  );
  return body.data;
};

export const checkListingPrerequisites = async () => {
  const tiktokShop = await Services.getShopCipher();
  if (!tiktokShop) {
    throw new Error('No TikTok shop found');
  }
  const { body } = await client.api.ProductV202309Api.PrerequisitesGet(
    tiktokShop.access_token,
    'application/json',
    tiktokShop.shopCipher,
  );
  if (!body.data || !body.data.shop) {
    throw new Error('No data found in CheckListingPrerequisitesResponse');
  }
  const { shop } = body.data;
  const shopRes = Object.entries(shop).reduce(
    (acc, [key, value]) => {
      if (typeof value === 'string') {
        acc[key] = JSON.parse(value);
      } else {
        acc[key] = value;
      }
      return acc;
    },
    {} as Record<string, any>,
  );

  return shopRes;
};

/**
 * Fetches an image from a URL and converts it to a Buffer
 */
const fetchImageFromUrl = async (imageUrl: string): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const protocol = imageUrl.startsWith('https') ? https : http;

    protocol
      .get(imageUrl, (response) => {
        if (response.statusCode !== 200) {
          reject(
            new Error(
              `Failed to fetch image: ${response.statusCode} ${response.statusMessage}`,
            ),
          );
          return;
        }

        const chunks: Buffer[] = [];

        response.on('data', (chunk: Buffer) => {
          chunks.push(chunk);
        });

        response.on('end', () => {
          resolve(Buffer.concat(chunks));
        });
      })
      .on('error', (error) => {
        reject(new Error(`Failed to fetch image from URL: ${error.message}`));
      });
  });
};

/**
 * Extracts filename from URL or generates a default one
 */
const getFilenameFromUrl = (url: string): string => {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const filename = pathname.split('/').pop() || 'image.jpg';
    return filename;
  } catch {
    return 'image.jpg';
  }
};

/**
 * Determines content type from filename extension
 */
const getContentTypeFromFilename = (filename: string): string => {
  const ext = filename.toLowerCase().split('.').pop();
  const mimeTypes: Record<string, string> = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    webp: 'image/webp',
    bmp: 'image/bmp',
  };
  return mimeTypes[ext || 'jpg'] || 'image/jpeg';
};

export const uploadProductImage = async (
  access_token: string,
  imageUrl: string,
  useCase?: string,
) => {
  // Fetch the image from the URL
  const imageBuffer = await fetchImageFromUrl(imageUrl);

  // Extract filename and content type
  const filename = getFilenameFromUrl(imageUrl);
  const contentType = getContentTypeFromFilename(filename);

  // Create RequestFile object
  const imageFile: RequestFile = {
    value: imageBuffer,
    options: {
      filename: filename,
      contentType: contentType,
    },
  };

  const { body } = await client.api.ProductV202309Api.ImagesUploadPost(
    access_token,
    'multipart/form-data',
    imageFile,
    useCase,
  );
  return body;
};

export const createProduct = async (
  productData: Product202309CreateProductRequestBody,
) => {
  const tiktokShop = await Services.getShopCipher();
  if (!tiktokShop) {
    throw new Error('No TikTok shop found');
  }
  const { body } = await client.api.ProductV202309Api.ProductsPost(
    tiktokShop.access_token,
    'application/json',
    tiktokShop.shopCipher,
    productData,
  ).catch((error) => {
    logger.error('Error creating product in Tiktok', error);
    throw error;
  });
  return body;
};

export const updateProduct = async (
  product_id: string,
  productData: Product202309EditProductRequestBody,
) => {
  const tiktokShop = await Services.getShopCipher();
  if (!tiktokShop) {
    throw new Error('No TikTok shop found');
  }
  const { body } = await client.api.ProductV202509Api.ProductsProductIdPut(
    product_id,
    tiktokShop.access_token,
    'application/json',
    tiktokShop.shopCipher,
    productData,
  );
  return body;
};

export const partialUpdateProduct = async (
  product_id: string,
  productData: Product202509PartialEditProductRequestBody,
) => {
  const tiktokShop = await Services.getShopCipher();
  if (!tiktokShop) {
    throw new Error('No TikTok shop found');
  }
  const { body } =
    await client.api.ProductV202509Api.ProductsProductIdPartialEditPost(
      product_id,
      tiktokShop.access_token,
      'application/json',
      tiktokShop.shopCipher,
      productData,
    );
  return body;
};

export const activateProduct = async (
  product_id: string,
  listing_platforms?: string[],
) => {
  const tiktokShop = await Services.getShopCipher();
  if (!tiktokShop) {
    throw new Error('No TikTok shop found');
  }
  const requestBody: Product202309ActivateProductRequestBody = {
    productIds: [product_id],
    listingPlatforms: listing_platforms,
  };

  const { body } = await client.api.ProductV202309Api.ProductsActivatePost(
    tiktokShop.access_token,
    'application/json',
    tiktokShop.shopCipher,
    requestBody,
  );
  return body;
};

export const updatePriceInDraftMode = async (
  product?: Product202309GetProductResponseData,
  priceData?: Product202309UpdatePriceRequestBody,
) => {
  if (!product || !product.id) {
    throw new Error('Product with ID is required');
  }
  if (!priceData || !priceData.skus) {
    throw new Error('Price data with SKUs is required');
  }

  const result = await partialUpdateProduct(product.id, {
    saveMode: 'AS_DRAFT',
    skus: priceData.skus.map((sku) => ({
      id: sku.id,
      price: sku.price,
      listPrice: sku.listPrice,
    })),
  });
  if (!result) {
    throw new Error('Failed to update product');
  }
  return result;
};

export const publishProduct = async (
  productId?: string,
  product?: Product202309EditProductRequestBody,
) => {
  if (!productId) {
    throw new Error('Product with ID is required');
  }
  if (!product) {
    throw new Error('Product data is required');
  }

  logger.info(`Publishing product ${productId} in Tiktok`);

  const result = await updateProduct(productId, product);
  if (!result) {
    throw new Error('Failed to update product');
  }
  return result;
};
