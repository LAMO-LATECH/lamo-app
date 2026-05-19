import { useState, useCallback, useEffect } from "react";
import { Stack } from "expo-router";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import AnimatedSplash from "../components/AnimatedSplash";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { DestinationProvider } from "../contexts/DestinationContext";
import { ThemeProvider, useTheme } from "../contexts/ThemeContext";

SplashScreen.preventAutoHideAsync();

function RootNavigator() {
  const { isAuthenticated, isLoading } = useAuth();
  const { colors, isDark } = useTheme();
  const [splashAnimDone, setSplashAnimDone] = useState(false);

  const [fontsLoaded] = useFonts({
    PoppinsRegular: require("../assets/fonts/Poppins-Regular.ttf"),
    PoppinsSemiBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
    PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
  });

  // Hide native splash as soon as fonts are ready
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const handleSplashFinish = useCallback(() => {
    setSplashAnimDone(true);
  }, []);

  // Don't render anything until fonts are loaded (native splash still visible)
  if (!fontsLoaded) {
    return null;
  }

  // Show animated splash until it finishes and auth is resolved
  if (!splashAnimDone || isLoading) {
    return <AnimatedSplash onFinish={handleSplashFinish} />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={isDark ? "light" : "dark"} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="/rideHistory" />
        <Stack.Screen name="(tabs)" redirect={!isAuthenticated} />
        <Stack.Screen name="(auth)" redirect={isAuthenticated} />
        <Stack.Screen name="username" />
        <Stack.Screen name="routeComplete" />
        <Stack.Screen
          name="settings"
          options={{ headerShown: false, title: "Settings" }}
        />
        <Stack.Screen
          name="search"
          options={{
            presentation: "fullScreenModal",
            animation: "slide_from_bottom",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="saveDestinations"
          options={{
            presentation: "fullScreenModal",
            animation: "slide_from_bottom",
            headerShown: false,
          }}
        />
      </Stack>
    </View>
  );
}

const RootLayout = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DestinationProvider>
          <RootNavigator />
        </DestinationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default RootLayout;
