import CountryProvider from '@/context/countryContext';
import AuthProvider from '@/modules/auth/AuthContext';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'HelveticaNeue-Light': require('../assets/fonts/helvetica/HelveticaNeue-Light.otf'),
    'HelveticaNeue-UltraLigCond': require('../assets/fonts/helvetica/HelveticaNeue-UltraLigCond.otf'),
    'HelveticaNeue-UltraLigCondObl': require('../assets/fonts/helvetica/HelveticaNeue-UltraLigCondObl.otf'),
    'HelveticaNeue-UltraLigExt': require('../assets/fonts/helvetica/HelveticaNeue-UltraLigExt.otf'),

    SpaceMono: require('@assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CountryProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="countries" options={{ title:"Countries" }} />
            <Stack.Screen name="(detail)" options={{ headerShown: true, title:"Details" }} />
          </Stack>
        </CountryProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
