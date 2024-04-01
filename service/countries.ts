import axios from 'axios';
const BASE_URL = process.env.EXPO_PUBLIC_URL_STAGING;

export const fetchCountries = async (): Promise<CountrySummary[]> => {
  try {
    const response = await axios.get(`${BASE_URL}all`);
    return response.data.map((country: any) => ({
      name: country.name.official,
      code: country.cioc,
      flag: country.flags.png,
      lat: country.latlng[0],
      long: country.latlng[1]
    }));
  } catch (error) {
    console.error("Error fetching countries:");
    throw error;
  }
};

export const fetchCountryDetails = async (countryCode: string): Promise<any> => {
  try {
    const response = await axios.get<any>(`${BASE_URL}alpha/${countryCode}`);
    return response.data[0];
  } catch (error) {
    console.error("Error fetching country details:", error);
    throw error;
  }
};
