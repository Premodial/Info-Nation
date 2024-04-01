export const firebaseConfigs = {
    dev: {
      apiKey: process.env.EXPO_PUBLIC_API_URL_DEV,
      authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN_DEV,
      projectId: process.env.EXPO_PUBLIC_PROJECT_ID_DEV,
      storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET_DEV,
      messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID_DEV,
      appId: process.env.EXPO_PUBLIC_APP_ID_DEV,
      measurementId: process.env.EXPO_PUBLIC_MEASUREMENT_ID_DEV,
      appVerificationDisabledForTesting: true,
    },
    staging: {
      apiKey: process.env.EXPO_PUBLIC_API_URL_STAGING,
      authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN_STAGING,
      projectId: process.env.EXPO_PUBLIC_PROJECT_ID_STAGING,
      storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET_STAGING,
      messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID_STAGING,
      appId: process.env.EXPO_PUBLIC_APP_ID_STAGING,
      measurementId: process.env.EXPO_PUBLIC_MEASUREMENT_ID_STAGING,
      appVerificationDisabledForTesting: true,
    },
    prod: {
      apiKey: process.env.EXPO_PUBLIC_API_URL_PROD,
      authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN_PROD,
      projectId: process.env.EXPO_PUBLIC_PROJECT_ID_PROD,
      storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET_PROD,
      messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID_PROD,
      appId: process.env.EXPO_PUBLIC_APP_ID_PROD,
      measurementId: process.env.EXPO_PUBLIC_MEASUREMENT_ID_PROD,
      appVerificationDisabledForTesting: true,
    },
  };
  