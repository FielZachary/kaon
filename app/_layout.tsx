import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts, Sen_400Regular, Sen_700Bold } from '@expo-google-fonts/sen';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { initOCR } from '@/services/ocr/init';

export { ErrorBoundary } from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Sen_400Regular,
    Sen_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Initialize OCR service on app start
  useEffect(() => {
    initOCR();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(org)" />
        <Stack.Screen name="(restaurant)" />
      </Stack>
    </SafeAreaProvider>
  );
}
