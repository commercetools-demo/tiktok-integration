import {
  SHARED_SHOP_ACCESS_TOKEN_VARIABLE_KEY,
  SHARED_SHOP_CATEGORY_VARIABLE_KEY,
  SHARED_SHOP_CONFIGURATION_VARIABLE_KEY,
} from '../constants';

export const getAccessTokenVariableKey = (app_key: string) => {
  return `${app_key}_${SHARED_SHOP_ACCESS_TOKEN_VARIABLE_KEY}`;
};

export const getConfigurationVariableKey = (app_key: string) => {
  return `${app_key}_${SHARED_SHOP_CONFIGURATION_VARIABLE_KEY}`;
};

export const getCategoryVariableKey = (app_key: string) => {
  return `${app_key}_${SHARED_SHOP_CATEGORY_VARIABLE_KEY}`;
};


export const getVerifiedShopKey = (ct_project_key: string, app_key: string) => {
  return `verified_${ct_project_key}_${app_key}`;
};

export const getAccessTokenDocumentId = (ct_project_key: string, app_key: string) => {
  return `${ct_project_key}_${app_key}_access_token`;
};

export const getConfigurationDocumentId = (ct_project_key: string, app_key: string) => {
  return `${ct_project_key}_${app_key}_configuration`;
};

export const getCategoryDocumentId = (ct_project_key: string, app_key: string) => {
  return `${ct_project_key}_${app_key}_categories`;
};

