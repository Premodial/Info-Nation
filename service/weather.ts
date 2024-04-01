import axios from 'axios';
import { WeatherApiResponse } from '../models/weather';
import {KELVIN_TO_CELSIUS} from '../constants/index';
/**
 * Fetches the current weather data for a given location.
 *
 * @param lat - The latitude of the location.
 * @param lng - The longitude of the location.
 * @returns A promise that is resolved to an object containing the current weather data or an error object.
 */

export const getCurrentWeather = async (lat: number, lng: number): Promise<WeatherApiResponse> => {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
      params: {
        lat,
        lon: lng,
        appid: "a864b4a2351a3d963bcf6042211f4080",
      },
    });    

    response.data.main.temp =  Math.round(response.data.main.temp - KELVIN_TO_CELSIUS);
    response.data.main.temp_min = Math.round(response.data.main.temp_min - KELVIN_TO_CELSIUS);
    response.data.main.temp_max = Math.round(response.data.main.temp_max - KELVIN_TO_CELSIUS);
    const mainWeather = response.data.weather[0].main.toLowerCase();
    if (mainWeather.includes('clear')) {
      response.data.weather[0].main = 'Sunny'; 
    } else if (mainWeather.includes('cloud')) {
      response.data.weather[0].main = 'Cloudy'; 
    } else if (mainWeather.includes('rain')) {
      response.data.weather[0].main = 'Rainy'; 
    }
    return response.data as WeatherApiResponse;
  } catch (error) {
    throw new Error("Failed to get weather");
  }
};