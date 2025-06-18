import React, { createContext, useState, useContext, useCallback } from 'react';
import Spinner from '../components/Spinner';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  // Use useCallback to ensure function references remain stable
  const showLoader = useCallback(() => {
    setIsLoading(true);
  }, []);
  
  const hideLoader = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, showLoader, hideLoader }}>
      {isLoading && <Spinner />}
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};
