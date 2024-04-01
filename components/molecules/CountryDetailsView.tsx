import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ColorScheme } from '@constants/colorScheme';
interface Country {
    [key: string]: any; // This allows any property with any value. Refine this as needed.
  }
const CountryDetailsView : React.FC<Country>= ({ country }) => {
  return (
    <View style={styles.detailsContainer}>
      <Text style={styles.placeName}>{country?.name?.official}</Text>
      <View style={styles.infoContainer}>
        <InfoItem label="Capital City" value={country?.capital[0]} />
        <InfoItem label="Region" value={country?.region} />
        <InfoItem label="Sub Region" value={country?.subregion} />
        <InfoItem label="Population" value={country?.population?.toLocaleString()} />
        <InfoItem label="Start of Week" value={country?.startOfWeek} />
        <InfoItem label="Landlocked" value={country?.landlocked ? 'Yes' : 'No'} />
        <InfoItem label="Status" value={country?.status} />
        <InfoItem label="Independent" value={country?.independent ? 'Yes' : 'No'} />
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

export default CountryDetailsView;
