import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
interface SearchComponentProps{
  setSearchQuery: any;
  searchQuery: string
}
const SearchComponent: React.FC<SearchComponentProps>= ({setSearchQuery, searchQuery}) => {

  return (
    <View style={styles.container}>
      <View style={styles.searchSection}>
        <TextInput
          style={styles.input}
          placeholder="Find a countries..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Ionicons style={styles.searchIcon} name="search" size={20} color="#000" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
  },
  input: {
    flex: 1,
    padding: 10,
    height: 45
  },
  searchIcon: {
    padding: 10,
  },
});

export default SearchComponent;
