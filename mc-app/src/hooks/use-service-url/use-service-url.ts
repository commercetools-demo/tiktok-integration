/// <reference path="../../../@types/commercetools__sync-actions/index.d.ts" />
/// <reference path="../../../@types-extensions/graphql-ctp/index.d.ts" />

import type { ApolloError } from '@apollo/client';
import { useMcQuery } from '@commercetools-frontend/application-shell';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import { SHARED_SHOP_CONTAINER_KEY, SHARED_SHOP_SERVICE_URL_VARIABLE_KEY } from '../../constants';
import FetchServiceUrlQuery from './fetch-service-url.ctp.graphql';

type TFetchServiceUrlQuery = {
  customObject?: {
    id: string;
    version: number;
    container: string;
    key: string;
    value: string;
  };
};

type TFetchServiceUrlQueryVariables = {
  container: string;
  key: string;
};

type TUseServiceUrlFetcher = () => {
  serviceUrl?: string;
  error?: ApolloError;
  loading: boolean;
};

export const useServiceUrlFetcher: TUseServiceUrlFetcher = () => {
  const { data, error, loading } = useMcQuery<
    TFetchServiceUrlQuery,
    TFetchServiceUrlQueryVariables
  >(FetchServiceUrlQuery, {
    variables: {
      container: SHARED_SHOP_CONTAINER_KEY,
      key: SHARED_SHOP_SERVICE_URL_VARIABLE_KEY,
    },
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    },
  });

  // Parse the value from the custom object
  let serviceUrl: string | undefined;
  if (data?.customObject?.value) {
    try {
      // The value in custom objects is stored as a JSON string
      const parsedValue = JSON.parse(data.customObject.value);
      serviceUrl = parsedValue.serviceUrl || parsedValue.url;
    } catch (e) {
      // If parsing fails, use the value directly
      serviceUrl = data.customObject.value;
    }
  }

  return {
    serviceUrl,
    error,
    loading,
  };
};

