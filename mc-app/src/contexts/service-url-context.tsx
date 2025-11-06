import React, { createContext, useContext, type ReactNode } from 'react';
import type { ApolloError } from '@apollo/client';
import { useServiceUrlFetcher } from '../hooks/use-service-url';

type ServiceUrlContextValue = {
  serviceUrl?: string;
  loading: boolean;
  error?: ApolloError;
};

const ServiceUrlContext = createContext<ServiceUrlContextValue | undefined>(
  undefined
);

type ServiceUrlProviderProps = {
  children: ReactNode;
};

export const ServiceUrlProvider = ({ children }: ServiceUrlProviderProps) => {
  const { serviceUrl, loading, error } = useServiceUrlFetcher();

  return (
    <ServiceUrlContext.Provider value={{ serviceUrl, loading, error }}>
      {children}
    </ServiceUrlContext.Provider>
  );
};

export const useServiceUrl = (): ServiceUrlContextValue => {
  const context = useContext(ServiceUrlContext);
  if (context === undefined) {
    throw new Error('useServiceUrl must be used within a ServiceUrlProvider');
  }
  return context;
};

