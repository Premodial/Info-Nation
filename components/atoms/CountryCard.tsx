import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Country } from '../../types';

interface CountryCardProps {
  country: Country;
  onSelect: (country: any) => void;
  isSelected: boolean;
}

const CountryCard: React.FC<CountryCardProps> = ({ country, onSelect, isSelected }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onSelect(country)}>
      <Text style={styles.text}>{country.name}</Text>
      {isSelected && <Entypo name="check" size={20} color="green" />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
  },
});

export default CountryCard;
