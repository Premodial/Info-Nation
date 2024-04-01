// Constant representing the key used to store user authentication state.
export const user_auth_state = 'user_v2';

// Configuration constants for query behavior:
// - STALE_TIME_MS: The duration (in milliseconds) after which a piece of data becomes stale and potentially needs refetching (5 minutes).
// - RETRY_COUNT: The number of attempts to retry fetching data before throwing an error.
// - CACHE_TIME_MS: The duration (in milliseconds) to cache data before it is garbage collected and removed from cache (24 hours).
const STALE_TIME_MS = 1000 * 60 * 5; 
const RETRY_COUNT = 3;
const CACHE_TIME_MS = 1000 * 60 * 60 * 24; 

// Object consolidating the default configuration for useQuery, incorporating
// the previously defined constants for stale time, retry count, and cache time.
export const queryConfig = {
    staleTime: STALE_TIME_MS,
    retry: RETRY_COUNT,
    cacheTime: CACHE_TIME_MS,
};

export const KELVIN_TO_CELSIUS = 273.15;