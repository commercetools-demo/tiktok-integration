/// <reference path="../../../@types/commercetools__sync-actions/index.d.ts" />
/// <reference path="../../../@types-extensions/graphql-ctp/index.d.ts" />

import type { ApolloError } from '@apollo/client';
import {
  useMcQuery,
  useMcMutation,
} from '@commercetools-frontend/application-shell';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import FetchStoresQuery from './fetch-stores.ctp.graphql';
import UpdateStoreCustomMutation from './update-store-custom.ctp.graphql';

type TCustomFieldRaw = {
  name: string;
  value: string;
};

type TCustomType = {
  id: string;
  key: string;
};

type TChannel = {
  id: string;
  key: string;
};

type TLocalizedString = {
  locale: string;
  value: string;
};

type TStore = {
  id: string;
  version: number;
  key: string;
  name?: string;
  nameAllLocales?: TLocalizedString[];
  languages?: string[];
  countries?: string[];
  distributionChannels?: TChannel[];
  supplyChannels?: TChannel[];
  custom?: {
    type: TCustomType;
    customFieldsRaw: TCustomFieldRaw[];
  };
};

type TFetchStoresQuery = {
  stores: {
    total: number;
    count: number;
    offset: number;
    results: TStore[];
  };
};

type TFetchStoresQueryVariables = {
  limit?: number;
  offset?: number;
  sort?: string[];
};

type TUpdateStoreCustomMutation = {
  updateStore: TStore;
};

type TUpdateStoreCustomMutationVariables = {
  storeId: string;
  version: number;
  actions: Array<{
    setCustomType?: {
      type?: {
        typeId: string;
        key: string;
      };
      fields?: Record<string, any>;
    };
  }>;
};

type TUseStoresFetcher = (variables?: TFetchStoresQueryVariables) => {
  stores?: TStore[];
  storesResult?: TFetchStoresQuery['stores'];
  error?: ApolloError;
  loading: boolean;
  refetch: () => void;
};

export const useStoresFetcher: TUseStoresFetcher = (variables = {}) => {
  const { data, error, loading, refetch } = useMcQuery<
    TFetchStoresQuery,
    TFetchStoresQueryVariables
  >(FetchStoresQuery, {
    variables: {
      limit: variables.limit || 500,
      offset: variables.offset || 0,
      sort: variables.sort || ['createdAt asc'],
    },
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    },
  });

  return {
    stores: data?.stores?.results,
    storesResult: data?.stores,
    error,
    loading,
    refetch,
  };
};

type TUseStoreCustomUpdater = () => {
  updateStoreCustom: (params: {
    storeId: string;
    version: number;
    typeKey?: string;
    typeId?: string;
    fields?: Record<string, any>;
  }) => Promise<TStore>;
  loading: boolean;
};

export const useStoreCustomUpdater: TUseStoreCustomUpdater = () => {
  const [updateStoreMutation, { loading }] = useMcMutation<
    TUpdateStoreCustomMutation,
    TUpdateStoreCustomMutationVariables
  >(UpdateStoreCustomMutation);

  const updateStoreCustom = async ({
    storeId,
    version,
    typeKey,
    fields = {},
  }: {
    storeId: string;
    version: number;
    typeKey?: string;
    fields?: Record<string, any>;
  }) => {
    const actions: TUpdateStoreCustomMutationVariables['actions'] = [];

    // Set custom type action
    if (typeKey) {
      actions.push({
        setCustomType: {
          type: {
            typeId: 'type',
            key: typeKey,
          },
          fields: fields
        },
      });
    } 

    try {
      const result = await updateStoreMutation({
        context: {
          target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
        },
        variables: {
          storeId,
          version,
          actions,
        },
      });

      if (!result.data?.updateStore) {
        throw new Error('Failed to update store custom fields');
      }

      return result.data.updateStore;
    } catch (error) {
      throw error;
    }
  };

  return {
    updateStoreCustom,
    loading,
  };
};

