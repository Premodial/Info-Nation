import { useContext } from 'react';
import { CountryContext } from './countryContext';

export const useCountry = (): any => {
  const context = useContext(CountryContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
