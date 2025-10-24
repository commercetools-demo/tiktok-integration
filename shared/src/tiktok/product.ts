import {
  Product202309SearchProductsRequestBody,
  Product202309CreateProductRequestBody,
  Product202309EditProductRequestBody,
  Product202309ActivateProductRequestBody,
} from '../tiktok-sdk';
import { RequestFile } from '../tiktok-sdk/api/apis';
import { client } from './client';
import * as https from 'https';
import * as http from 'http';

export const productSearch = async (
  access_token: string,
  shop_cipher: string,
  page?: {
    pageSize: number;
    pageToken?: string;
  },
  query?: Product202309SearchProductsRequestBody,
) => {
  const { body } = await client.api.ProductV202309Api.ProductsSearchPost(
    page?.pageSize ?? 10,
    access_token,
    'application/json',
    page?.pageToken ?? undefined,
    undefined,
    shop_cipher,
    query ?? undefined,
  );
  return body;
};

export const checkListingPrerequisites = async (access_token: string, shop_cipher: string) => {
  const { body } = await client.api.ProductV202309Api.PrerequisitesGet(access_token, 'application/json', shop_cipher);
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
          reject(new Error(`Failed to fetch image: ${response.statusCode} ${response.statusMessage}`));
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

export const uploadProductImage = async (access_token: string, imageUrl: string, useCase?: string) => {
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
  access_token: string,
  shop_cipher: string,
  productData: Product202309CreateProductRequestBody,
) => {
  const { body } = await client.api.ProductV202309Api.ProductsPost(
    access_token,
    'application/json',
    shop_cipher,
    productData,
  );
  return body;
};

export const updateProduct = async (
  access_token: string,
  product_id: string,
  shop_cipher: string,
  productData: Product202309EditProductRequestBody,
) => {
  const { body } = await client.api.ProductV202309Api.ProductsProductIdPut(
    product_id,
    shop_cipher,
    access_token,
    'application/json',
    productData,
  );
  return body;
};

export const activateProduct = async (
  access_token: string,
  product_id: string,
  shop_cipher: string,
  listing_platforms?: string[],
) => {
  const requestBody: Product202309ActivateProductRequestBody = {
    productIds: [product_id],
    listingPlatforms: listing_platforms,
  };

  const { body } = await client.api.ProductV202309Api.ProductsActivatePost(
    access_token,
    'application/json',
    shop_cipher,
    requestBody,
  );
  return body;
};
