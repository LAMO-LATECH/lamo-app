import { View, Text, StyleSheet } from "react-native";
import { Fire } from "phosphor-react-native";
import { Colors } from "../../constants/Color";
import { spacing, radius, typography, iconSize } from "../../constants/Tokens";

export default function StreakBadge({ count = 5 }) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Fire size={iconSize.sm} weight="fill" color={"#FF746C"} />
        <Text style={styles.text}>{count} day</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 60,
    right: spacing.lg,
    backgroundColor: Colors.light.surfaceDark,
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  text: {
    ...typography.caption,
    color: Colors.light.surface,
  },
});
