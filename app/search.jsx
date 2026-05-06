import { View, Pressable, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ArrowLeft } from "phosphor-react-native";
import { Colors } from "../constants/Color";
import { spacing, iconSize } from "../constants/Tokens";
import SearchBar from "../components/home/SearchBar";

export default function SearchScreen() {
  const router = useRouter();
  const { q } = useLocalSearchParams();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + spacing.md }]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <ArrowLeft
            size={iconSize.md}
            color={Colors.light.text}
            weight="bold"
          />
        </Pressable>
        <View style={styles.barWrapper}>
          <SearchBar editable defaultValue={q ?? ""} autoFocus />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    gap: spacing.md,
  },
  barWrapper: {
    flex: 1,
  },
});
