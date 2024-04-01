import { initializeApp, getApps } from 'firebase/app';
import { initializeAuth, getAuth } from 'firebase/auth';
import * as firebaseAuth from 'firebase/auth';
import { getFirestore, updateDoc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { firebaseConfigs } from './firebaseConfig';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const reactNativePersistence = (firebaseAuth as any).getReactNativePersistence;


type Environment = keyof typeof firebaseConfigs;

const environment: Environment = (process.env.EXPO_PUBLIC_ENV as Environment) || 'dev';
const firebaseConfig = firebaseConfigs[environment];

if (!firebaseConfig) {
  throw new Error(`Firebase configuration for environment ${environment} is not defined.`);
}

// Initialize Firebase App
const firebaseApp = (() => {
  if (!getApps().length) {
    return initializeApp(firebaseConfig);
  } else {
    console.log("Using existing Firebase app", getApps()[0]);
    return getApps()[0];
  }
})();

// Initialize Firebase Auth
const auth = (() => {
    // If it throws, initialize it.
    return initializeAuth(firebaseApp, {
      persistence: reactNativePersistence(ReactNativeAsyncStorage)
    });
  
})();

const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { auth, firestore, storage };
