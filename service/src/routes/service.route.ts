import { Router } from 'express';
import { logger } from '../utils/logger.utils';
import { post } from '../controllers/service.controller';
import { authorizeApp } from '../controllers/tiktok.auth.controller';
import { getShops } from '../controllers/tiktok.shop.controller';
import { 
  checkListingPrerequisites, 
  searchProducts,
  uploadProductImage,
  createProduct,
  updateProduct,
  activateProduct
} from '../controllers/tiktok.product.controller';
import { getWarehouseList } from '../controllers/tiktok.warehouse.controller';
import { getCategories, getCategoryRules, getCategoryAttributes } from '../controllers/tiktok.category.controller';
import { getBrands } from '../controllers/tiktok.brand.controller';

const serviceRouter = Router();

serviceRouter.get('/authorize-app', async (req, res, next) => {
  await authorizeApp(req, res).catch((error) => {
    logger.error('Error authorizing app', error);
    return res.status(500).send(error.message);
  });
});

serviceRouter.get('/get-shops', async (req, res, next) => {
  await getShops(req, res).catch((error) => {
    logger.error('Error authorizing app', error);
    return res.status(500).send(error.message);
  });
});

serviceRouter.post('/products/search', async (req, res, next) => {
  await searchProducts(req, res).catch((error) => {
    logger.error('Error searching products', error);
    return res.status(500).send(error.message);
  });
});

serviceRouter.get('/products/check-listing-prerequisites', async (req, res, next) => {
  await checkListingPrerequisites(req, res).catch((error) => {
    logger.error('Error searching products', error);
    return res.status(500).send(error.message);
  });
});

serviceRouter.get('/warehouses', async (req, res, next) => {
  await getWarehouseList(req, res).catch((error) => {
    logger.error('Error getting warehouse list', error);
    return res.status(500).send(error.message);
  });
});

serviceRouter.get('/categories', async (req, res, next) => {
  await getCategories(req, res).catch((error) => {
    logger.error('Error getting categories', error);
    return res.status(500).send(error.message);
  });
});

serviceRouter.get('/categories/:category_id/rules', async (req, res, next) => {
  await getCategoryRules(req, res).catch((error) => {
    logger.error('Error getting category rules', error);
    return res.status(500).send(error.message);
  });
});

serviceRouter.get('/categories/:category_id/attributes', async (req, res, next) => {
  await getCategoryAttributes(req, res).catch((error) => {
    logger.error('Error getting category attributes', error);
    return res.status(500).send(error.message);
  });
});

serviceRouter.get('/brands', async (req, res, next) => {
  await getBrands(req, res).catch((error) => {
    logger.error('Error getting brands', error);
    return res.status(500).send(error.message);
  });
});

serviceRouter.post('/products/images/upload', async (req, res, next) => {
  await uploadProductImage(req, res).catch((error) => {
    logger.error('Error uploading product image', error);
    return res.status(500).send(error.message);
  });
});

serviceRouter.post('/products', async (req, res, next) => {
  await createProduct(req, res).catch((error) => {
    logger.error('Error creating product', error);
    return res.status(500).send(error.message);
  });
});

serviceRouter.put('/products/:product_id', async (req, res, next) => {
  await updateProduct(req, res).catch((error) => {
    logger.error('Error updating product', error);
    return res.status(500).send(error.message);
  });
});

serviceRouter.post('/products/:product_id/activate', async (req, res, next) => {
  await activateProduct(req, res).catch((error) => {
    logger.error('Error activating product', error);
    return res.status(500).send(error.message);
  });
});

serviceRouter.post('/', async (req, res, next) => {
  logger.info('Service post message received');

  try {
    await post(req, res);
  } catch (error) {
    next(error);
  }
});

export default serviceRouter;
