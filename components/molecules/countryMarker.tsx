import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Marker, Callout } from 'react-native-maps';
import { ColorScheme } from '@constants/colorScheme';
import { StyledText } from '../atoms/StyledText';
import CountryDetailsView from './CountryDetailsView';

// Define a TypeScript interface for the props.
interface Coordinate {
  latitude: number;
  longitude: number;
}

// Since the exact structure of `country` is uncertain, we use a broad definition.
interface Country {
  [key: string]: any; // This allows any property with any value. Refine this as needed.
}

interface CountryMarkerProps {
  country: Country;
  coordinate: Coordinate;
}

const CountryMarker: React.FC<CountryMarkerProps> = ({ country, coordinate }) => {
  return (
    <Marker coordinate={coordinate}>
      <View style={styles.marker}>
        <StyledText style={styles.markerText}>View</StyledText>
      </View>
      <Callout tooltip>
        <View style={styles.calloutContainer}>
            <CountryDetailsView country={country} />
        </View>
      </Callout>
    </Marker>
  );
};

const styles = StyleSheet.create({
  marker: {
    backgroundColor: ColorScheme.MagentaPrimary,
    padding: 5,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: ColorScheme.MagentaPrimary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  markerText: {
    color: 'white',
  },
  calloutContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    width: 300,
    borderColor: ColorScheme.MagentaPrimary,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.27,
    shadowRadius: 4.65, 
    elevation: 6,
  },
});

export { CountryMarker };
