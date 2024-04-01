import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import WeatherDetails from '@/components/molecules/WeatherDetails';
import CountryDetailsView from '@components/molecules/CountryDetailsView';
import { ColorScheme } from '@constants/colorScheme';
import { useCountryDetails } from '@/hooks/useCountry';
import { useCurrentWeather } from '@/hooks/useWeather';
import { useCountry } from '@/context/useCountry';
import WeatherExtraDetailsView from '@/components/molecules/WeatherExtraDetails';

export default function CountryDetails() {
  const {countryCode, latLong }  = useCountry()

  const { data: country, isLoading, error } = useCountryDetails(countryCode);
  const { data: weather, isLoading: isLoadingWeather, error: errorWeather } = useCurrentWeather(latLong.lat, latLong.long);

  if (isLoading || isLoadingWeather) {
    return (
        <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={ColorScheme.MagentaPrimary} />
        </View>
    );
 }

 if (error  || errorWeather) {
  return (
      <View style={styles.errorContainer}>
          <Text>An error occurred</Text>
      </View>
  );
}

  return (
    <View style={styles.container}>
      <WeatherDetails weather={weather} countryName={country?.name?.official} />
      <CountryDetailsView country={country} />
      <WeatherExtraDetailsView weather={weather}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorScheme.GreyWhite,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorScheme.GreyWhite,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: ColorScheme.GreyWhite,
  },
});
