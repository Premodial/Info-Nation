import React from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import MapView from 'react-native-maps';
import { ColorScheme } from '@constants/colorScheme';
import { useCountry } from '@/context/useCountry';
import { useCountryDetails } from '@/hooks/useCountry';
import { CountryMarker } from '@/components/molecules/countryMarker';

interface CenteredContainerProps {
  children: React.ReactNode;
}

/**
 * A map component displaying a marker for a country retrieved from a global state.
 * Utilizes best practices for React components and hooks, ensuring clear,
 * maintainable, and scalable code.
 */
const CountryMap = () => {
  const { countryCode, latLong } = useCountry();
  const { data: country, isLoading, error } = useCountryDetails(countryCode);

  if (isLoading) {
    return (
      <CenteredContainer>
        <ActivityIndicator size="large" color={ColorScheme.MagentaPrimary} />
      </CenteredContainer>
    );
  }

  if (error) {
    return (
      <CenteredContainer>
        <Text>An error occurred</Text>
      </CenteredContainer>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        testID="mapView"
        style={styles.map}
        initialRegion={{
          latitude: latLong.lat,
          longitude: latLong.long,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <CountryMarker
          country={country}
          coordinate={{ latitude: latLong.lat, longitude: latLong.long }}
        />
      </MapView>
    </View>
  );
};

const CenteredContainer = ({ children }:CenteredContainerProps) => (
  <View style={styles.centeredContainer}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorScheme.GreyWhite,
  },
});

export default CountryMap;
