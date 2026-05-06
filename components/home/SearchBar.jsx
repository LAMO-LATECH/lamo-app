import { View, Text, Pressable, StyleSheet } from "react-native";
import { MagnifyingGlass, Microphone } from "phosphor-react-native";
import { Colors } from "../../constants/Color";
import { spacing, radius, iconSize, typography } from "../../constants/Tokens";

export default function SearchBar() {
  return (
    <Pressable style={styles.container}>
      <MagnifyingGlass
        size={iconSize.sm}
        color={Colors.light.primary}
        weight="bold"
      />
      <Text style={styles.placeholder}>Where to?</Text>
      <View style={styles.micButton}>
        <Microphone
          size={iconSize.sm}
          color={Colors.light.surface}
          weight="fill"
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.surfaceAlt,
    borderRadius: radius.sm,
    paddingLeft: spacing.lg,
    paddingRight: spacing.sm,
    paddingVertical: spacing.sm,
    gap: spacing.md,
  },
  placeholder: {
    ...typography.body,
    color: Colors.light.inactive,
    flex: 1,
  },
  micButton: {
    width: 40,
    height: 40,
    borderRadius: radius.sm,
    backgroundColor: Colors.light.primary,
    alignItems: "center",
    justifyContent: "center",
  },
});
