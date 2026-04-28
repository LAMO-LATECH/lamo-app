import { useState, useCallback } from "react";
import { Stack } from "expo-router";
import { View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import AnimatedSplash from "../components/AnimatedSplash";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [splashDone, setSplashDone] = useState(false);
  const [appReady, setAppReady] = useState(false);

  const onLayoutRootView = useCallback(async () => {
    await SplashScreen.hideAsync();
    setAppReady(true);
  }, []);

  const handleSplashFinish = useCallback(() => {
    setSplashDone(true);
  }, []);

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      {!splashDone ? (
        <AnimatedSplash onFinish={handleSplashFinish} />
      ) : splashDone ? (
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen
            name="settings"
            options={{ headerShown: true, title: "Settings" }}
          />
        </Stack>
      ) : null}
    </View>
  );
};

export default RootLayout;
