import { useState, useCallback } from "react";
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

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const handleSplashFinish = useCallback(() => {
    setSplashAnimDone(true);
  }, []);

  // Wait for both splash animation AND auth check before showing the app
  const ready = splashAnimDone && !isLoading;

  if (!ready) {
    return (
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <AnimatedSplash onFinish={handleSplashFinish} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" redirect={!isAuthenticated} />
        <Stack.Screen name="(auth)" redirect={isAuthenticated} />
        <Stack.Screen
          name="settings"
          options={{ headerShown: true, title: "Settings" }}
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
