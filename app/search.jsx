import { View, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ArrowLeftIcon } from "phosphor-react-native";
import { Colors } from "../constants/Color";
import { spacing, iconSize } from "../constants/Tokens";

export default function SearchScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <ArrowLeftIcon
            size={iconSize.md}
            color={Colors.light.text}
            weight="bold"
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },
});
