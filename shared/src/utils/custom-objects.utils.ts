import { SHARED_SHOP_ACCESS_TOKEN_VARIABLE_KEY, SHARED_SHOP_CATEGORY_VARIABLE_KEY, SHARED_SHOP_CONFIGURATION_VARIABLE_KEY } from '../constants';

export const getAccessTokenVariableKey = (app_key: string) => {
  return `${app_key}_${SHARED_SHOP_ACCESS_TOKEN_VARIABLE_KEY}`;
};

export const getConfigurationVariableKey = (app_key: string) => {
  return `${app_key}_${SHARED_SHOP_CONFIGURATION_VARIABLE_KEY}`;
};

export const getCategoryVariableKey = (app_key: string) => {
  return `${app_key}_${SHARED_SHOP_CATEGORY_VARIABLE_KEY}`;
};
