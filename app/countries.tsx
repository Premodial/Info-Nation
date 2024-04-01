import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, ActivityIndicator, View, SafeAreaView, Text } from 'react-native';
import { ColorScheme } from '@constants/colorScheme';
import SearchComponent from '@components/atoms/SearchComponent';
import ParagraphText from '@/components/atoms/paragraphText';
import { useCountries } from '@/hooks/useCountry';
import { useCountry } from '@/context/useCountry';
import { router } from 'expo-router';
import Fuse from 'fuse.js';
import CustomFlatList from '@/components/molecules/customFlatList';
import CountryCard from '@/components/atoms/CountryCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

// TypeScript interfaces for type safety
interface Country {
  name: string;
  code: string;
  lat: number;
  long: number;
}

// Main component
const Home: React.FC = () => {
    // Context and state hooks for managing global and local states
    const { setCountryCode, setLatLong } = useCountry();
    const { data: countries, isLoading, error } = useCountries();
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredCountries, setFilteredCountries] = useState<any[]>([]);
    const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

    // Effect to load selected countries from local storage on component mount
    useEffect(() => {
        const loadSelectedCountries = async () => {
            const savedCountries = await AsyncStorage.getItem('selectedCountries');
            if (savedCountries) {
                setSelectedCountries(JSON.parse(savedCountries));
            }
        };
        loadSelectedCountries();
    }, []);

    // Effect for filtering countries based on search query
    useEffect(() => {
        if (countries) {
            const fuse = new Fuse(countries, { keys: ['name', 'code'] });
            const results = searchQuery ? fuse.search(searchQuery).map(result => result.item) : countries;
            setFilteredCountries(results);
        }
    }, [countries, searchQuery]);

    // Effect to persist selected countries to local storage on change
    useEffect(() => {
        const saveSelectedCountries = async () => {
            await AsyncStorage.setItem('selectedCountries', JSON.stringify(selectedCountries));
        };
        saveSelectedCountries();
    }, [selectedCountries]);

    // Handler for selecting/deselecting a country
    const handleSelectCountry = useCallback((country: Country) => {
        const newSelectedCountries = selectedCountries.includes(country.code) ? 
            selectedCountries.filter(c => c !== country.code) : 
            [...selectedCountries, country.code];
        setSelectedCountries(newSelectedCountries);
        setCountryCode(country.code);
        setLatLong({ lat: country.lat, long: country.long });
        router.push("/(detail)/countryDetail");
    }, [selectedCountries, setCountryCode, setLatLong]);

    // Render loading indicator
    if (isLoading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color={ColorScheme.MagentaPrimary} />
            </View>
        );
    }

    // Render error message
    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text>An error occurred</Text>
            </View>
        );
    }

    // Main component UI
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <ParagraphText
                    header="Welcome to InfoNation!"
                    content="Dive deep into the heart of every country with unique insights and information, crafted by experts around the globe."
                    headerFontColor={ColorScheme.GraphitePrimary}
                    headerFontSize={24}
                    headerFontWeight="300"
                />
                <SearchComponent searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                <CustomFlatList
                    data={filteredCountries}
                    renderItem={({ item }) => (
                        <CountryCard
                            country={item}
                            onSelect={() => handleSelectCountry(item)}
                            isSelected={selectedCountries.includes(item.code)}
                        />
                    )}
                />
            </View>
        </SafeAreaView>
    );
};

// Styles for the component
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: ColorScheme.GreyWhite,
    },
    container: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 20,
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

export default Home;
