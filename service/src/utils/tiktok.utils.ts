import { CommercetoolsClient, CommercetoolsStorage, Utils } from 'tiktok-integration-shared';

export const getAccessToken = async () => {
  const apiRoot = CommercetoolsClient.createApiRoot(Utils.readConfiguration());
  const access_token = await CommercetoolsStorage.TokenController.getAccessToken(
    apiRoot,
    process.env.TIKTOK_APP_KEY as string,
  );

  return access_token;
};
