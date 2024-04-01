import React, { createContext, useState, useEffect, useMemo } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../dbConnect/firebaseService';
import useEmailAuth from './providers/useEmailAuth';
import { AuthContextState, ApiResponse, User } from './models';

export const AuthContext = createContext<AuthContextState | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);

  const { signInWithEmail } = useEmailAuth();

  useEffect(() => {
    if (!auth) {
      console.log("Firebase Auth is not initialized");
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        console.log("Signed in successfully ");
      } else {
        console.log("Signed in not successfully ", currentUser);
      }
    });
    return () => unsubscribe();
  }, [auth]);

  const contextValue = useMemo(() => ({
    user,
    signInWithEmail,
    // Add other methods as needed
  }), [user,
    signInWithEmail,
  ]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
