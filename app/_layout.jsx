import { useState, useCallback, useEffect } from "react";
import { Stack, Redirect } from "expo-router";
import { View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import AnimatedSplash from "../components/AnimatedSplash";
import { AuthProvider, useAuth } from "../contexts/AuthContext";

SplashScreen.preventAutoHideAsync();

function RootNavigator() {
  const { isAuthenticated, isLoading } = useAuth();
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
    <View style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" redirect={!isAuthenticated} />
        <Stack.Screen name="(auth)" redirect={isAuthenticated} />
        <Stack.Screen
          name="settings"
          options={{ headerShown: true, title: "Settings" }}
        />
        <Stack.Screen
          name="search"
          options={{
            presentation: "fullScreenModal",
            animation: "slide_from_bottom",
            headerShown: false,
          }}
        />
      </Stack>
      {isAuthenticated ? (
        <Redirect href="/(tabs)" />
      ) : (
        <Redirect href="/(auth)" />
      )}
    </View>
  );
}

const RootLayout = () => {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
};

export default RootLayout;
