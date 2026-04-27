import { Stack } from "expo-router";
import { View } from "react-native";

const RootLayout = () => {
  return (
    <View style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen
          name="settings"
          options={{ headerShown: true, title: "Settings" }}
        />
      </Stack>
    </View>
  );
};

export default RootLayout;
