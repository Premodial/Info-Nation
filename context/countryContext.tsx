import React, { createContext, useState, useMemo, ReactNode } from 'react';
import { latlng } from '@/types/location';

// Define the shape of the context's value to improve TypeScript usage throughout your app.
interface CountryContextType {
  countryCode: string | null;
  setCountryCode: (code: string | null) => void;
  latLong: latlng | null;
  setLatLong: (latLong: latlng | null) => void;
}

// Initialize the context with an undefined value but explicitly state the expected type.
export const CountryContext = createContext<CountryContextType | undefined>(undefined);

interface CountryProviderProps {
  children: ReactNode;
}

/**
 * CountryProvider encapsulates country-specific state management,
 * providing a clean and accessible interface for components deep in the tree
 * to consume and manipulate country data without prop-drilling.
 * 
 * @param {ReactNode} children - Child components that will consume the context.
 */
export const CountryProvider: React.FC<CountryProviderProps> = ({ children }) => {
  // Manage the country code state.
  const [countryCode, setCountryCode] = useState<string | null>(null);
  // Manage the latitude and longitude state.
  const [latLong, setLatLong] = useState<latlng | null>(null);

  // useMemo ensures the context value is stable between renders unless its dependencies change.
  // This prevents unnecessary re-renders of context consumers.
  const contextValue = useMemo(() => ({
    countryCode,
    setCountryCode,
    latLong,
    setLatLong,
  }), [countryCode, latLong]);

  return <CountryContext.Provider value={contextValue}>{children}</CountryContext.Provider>;
};

export default CountryProvider;
