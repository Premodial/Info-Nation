// src/hooks/useCurrentWeather.ts
import { useQuery } from 'react-query';
import { getCurrentWeather } from '../service/weather';
import { QUERY_CONFIG } from '@/constants/queryConfig';
import { QUERY_KEYS } from '@/constants/queryKeys';

/**
 * A custom React Query hook for fetching current weather data.
 *
 * @param lat - The latitude of the location.
 * @param lng - The longitude of the location.
 * @returns A query object containing the current weather data, loading state, and any error information.
 */
export const useCurrentWeather = (lat: number, lng: number) => {
  return useQuery([QUERY_KEYS.currentWeather, lat, lng], () => getCurrentWeather(lat, lng), {
    staleTime: QUERY_CONFIG.staleTime,
    cacheTime: QUERY_CONFIG.cacheTime,
  });
};
