import { useQuery } from 'react-query';
import { fetchCountries, fetchCountryDetails } from '../service/countries';

import { QUERY_CONFIG } from '@/constants/queryConfig';
import { QUERY_KEYS } from '@/constants/queryKeys';

/**
 * Custom hook to fetch a list of countries.
 * Leverages React Query for data fetching, caching, and synchronization.
 * React Query's staleTime and cacheTime configurations are utilized to 
 * minimize unnecessary network requests while ensuring data freshness.
 *
 * @returns The query object from React Query, containing countries data, loading state, and error information.
 */
export const useCountries = () => {
  return useQuery(QUERY_KEYS.countries, fetchCountries, {
    staleTime: QUERY_CONFIG.staleTime,
    cacheTime: QUERY_CONFIG.cacheTime,
  });
};

/**
 * Custom hook to fetch details for a specific country identified by its countryCode.
 * This hook abstracts the fetching logic and provides a simple interface for component-level consumption.
 * It ensures data is fetched efficiently and managed correctly with React Query's powerful data synchronization and caching capabilities.
 *
 * @param {string} countryCode - The ISO Alpha-2 country code to fetch details for.
 * @returns The query object from React Query, containing the specific country's details, loading state, and error information.
 */
export const useCountryDetails = (countryCode: string) => {
  return useQuery(QUERY_KEYS.countryDetails(countryCode), () => fetchCountryDetails(countryCode), {
    staleTime: QUERY_CONFIG.staleTime,
    cacheTime: QUERY_CONFIG.cacheTime,
  });
};
