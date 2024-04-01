import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ColorScheme } from '@constants/colorScheme';
import { KELVIN_TO_CELSIUS } from '@constants/index'

interface weather {
    [key: string]: any;
}

interface WeatherDetailsProps {
    weather?: weather;
    countryName: string;
}
const WeatherDetails: React.FC<WeatherDetailsProps> = ({ weather, countryName }) => {
  const temperature = (weather?.main.temp);
  const feelsLike = (weather?.main.feels_like - KELVIN_TO_CELSIUS).toFixed(1);

  return (
    <View style={styles.weatherBanner}>
    <View style={styles.column}>
      <Text style={styles.placeTitle}>{countryName}</Text>
      <Text style={styles.temperatureText}>{temperature}°C</Text>
      <Text style={styles.feelLikeText}>Feels like {feelsLike}°C</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  weatherBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    margin: 16,
    borderRadius: 15,
    backgroundColor: ColorScheme.GraphitePrimary,
  },
  temperatureText: {
    fontSize: 70,
    fontWeight: '700',
    color: 'white',
  },
  feelLikeText: {
    fontSize: 16,
    color: ColorScheme.GreyWhite,
  },
  column: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeTitle: {
    fontSize: 22,
    color: ColorScheme.GreyWhite,
    fontWeight: 'bold',
  },
});

export default WeatherDetails;
