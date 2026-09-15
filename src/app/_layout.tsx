import { useFonts } from "expo-font";
import { NavigationBar } from "expo-navigation-bar";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StatusBar, useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../../global.css";

// Prevent native splash screen from auto-hiding before fonts are loaded
SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  // Preload all 3 Thmanyah typography subfamilies across primary weights
  const [loaded, error] = useFonts({
    // 1. Digital UI Family (خط ثمانية الرقمي)
    "ThmanyahSans-Regular": require("../../assets/fonts/thmanyahsans-Regular.otf"),
    "ThmanyahSans-Medium": require("../../assets/fonts/thmanyahsans-Medium.otf"),
    "ThmanyahSans-Bold": require("../../assets/fonts/thmanyahsans-Bold.otf"),

    // 2. Text Content Family (خط ثمانية للنصوص)
    "ThmanyahSerifText-Regular": require("../../assets/fonts/thmanyahseriftext-Regular.otf"),
    "ThmanyahSerifText-Medium": require("../../assets/fonts/thmanyahseriftext-Medium.otf"),
    "ThmanyahSerifText-Bold": require("../../assets/fonts/thmanyahseriftext-Bold.otf"),

    // 3. Display Title Family (خط ثمانية للعناوين)
    "ThmanyahSerifDisplay-Regular": require("../../assets/fonts/thmanyahserifdisplay-Regular.otf"),
    "ThmanyahSerifDisplay-Bold": require("../../assets/fonts/thmanyahserifdisplay-Bold.otf"),
    "ThmanyahSerifDisplay-Black": require("../../assets/fonts/thmanyahserifdisplay-Black.otf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <NavigationBar style={isDark ? "light" : "dark"} />
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tabs)" />
      </Stack>
    </SafeAreaProvider>
  );
}
