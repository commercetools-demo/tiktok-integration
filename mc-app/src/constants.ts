// Make sure to import the helper functions from the `ssr` entry point.
import { entryPointUriPathToPermissionKeys } from '@commercetools-frontend/application-shell/ssr';

export const entryPointUriPath = 'tiktok-connect';

export const PERMISSIONS = entryPointUriPathToPermissionKeys(entryPointUriPath);

// Service URL Custom Object Configuration
export const SHARED_SHOP_CONTAINER_KEY = 'shared_shop_container';
export const SHARED_SHOP_SERVICE_URL_VARIABLE_KEY = 'service_url';
export const SHARED_SHOP_CONFIGURATION_VARIABLE_KEY = 'tiktok_configuration';
