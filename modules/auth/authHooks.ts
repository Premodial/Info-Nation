import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { AuthContextState } from './models';

export const useAuth = (): AuthContextState => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
