import { useCountry } from '@/context/useCountry';
import { useCountryDetails } from '@hooks/useCountry';
import { useCurrentWeather } from '@hooks/useWeather';

/**
 * A custom hook that combines country details and current weather information.
 * It leverages React Query's useQuery hook for data fetching, caching, and synchronization.
 * 
 * @returns An object containing both country and weather data along with their loading and error states.
 */
export const useCountryDetailsWithWeather = () => {
  const { countryCode, latLong } = useCountry();

  // Use predefined React Query hooks for fetching country details and current weather.
  const countryQuery = useCountryDetails(countryCode);
  const weatherQuery = useCurrentWeather(latLong.lat, latLong.long);

  // Combine and return data, loading, and error states.
  return {
    isLoading: countryQuery.isLoading || weatherQuery.isLoading,
    isError: countryQuery.isError || weatherQuery.isError,
    country: countryQuery.data,
    weather: weatherQuery.data,
  };
};
