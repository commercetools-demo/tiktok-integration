import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';
import { CommercetoolsStorage, TiktokShop } from '..';

const SUPPORTED_LOCALES_MAP = {
  en: 'en-US',
};

export const getCommercetoolsLocale = async (
  apiRoot: ByProjectKeyRequestBuilder,
  app_key: string,
) => {
  const { locale } =
    await CommercetoolsStorage.ShopConfigController.getLocaleAndShopRegion(
      apiRoot,
      app_key,
    );
  if (!locale) {
    throw new Error('No locale found');
  }
  return (
    SUPPORTED_LOCALES_MAP[locale as keyof typeof SUPPORTED_LOCALES_MAP] ||
    locale
  );
};
