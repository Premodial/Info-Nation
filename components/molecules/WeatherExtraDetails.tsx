import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ColorScheme } from '@constants/colorScheme';

interface weather {
    [key: string]: any;
}

const WeatherExtraDetailsView: React.FC<weather> = ({ weather }) => {
  return (
    <View style={styles.detailsContainer}>
      <Text style={styles.placeName}>Current Weather Conditions</Text>
      <View style={styles.infoContainer}>
        <InfoItem label="Description" value={weather?.weather[0].description} />
        <InfoItem label="Main" value={weather?.weather[0].main} />
        <InfoItem label="Visibility" value={`${weather?.visibility} meters`} />
        <InfoItem label="Humidity" value={`${weather?.main.humidity}%`} />
      </View>
    </View>
  );
};

const InfoItem = ({ label, value }:{label: any, value: string}) => (
  <View style={styles.infoItem}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 10,
    margin: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  placeName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: ColorScheme.GraphitePrimary,
  },
  infoContainer: {
    marginTop: 10,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  infoLabel: {
    fontWeight: 'bold',
  },
  infoValue: {
    fontWeight: 'normal',
  },
});

export default WeatherExtraDetailsView;
