export const QUERY_KEYS = {
    countries: 'countries',
    currentWeather: 'currentWeather',
    countryDetails: (countryCode: string) => ['countryDetails', countryCode],
};
  