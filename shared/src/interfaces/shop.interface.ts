
/**
 * Interface for shop configuration data
 */
export interface ShopConfigurationData {
    isAuthorized?: boolean;
    isInitialized?: boolean;
    ctSupplyChannelId?: string;
    ctDistributionChannelId?: string;
    tiktokWarehouseId?: string;
    tiktokWarehouseEntityId?: string;
    shopCipher?: string;
    locale?: string;
    shop_region?: string;
  }