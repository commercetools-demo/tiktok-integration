import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';
import { createOrUpdateCustomObject } from '../../commercetools/controllers/custom-object.controller';
import { SHARED_SHOP_CONTAINER_KEY } from '../../constants';
import { getCategoryVariableKey } from '../../utils';
import { Types } from '../../';
export const storeCategories = async (
  apiRoot: ByProjectKeyRequestBuilder,
  categories: Types.TiktokCategory[],
) => {
  await createOrUpdateCustomObject(
    apiRoot,
    SHARED_SHOP_CONTAINER_KEY,
    getCategoryVariableKey(),
    categories,
  );
};
