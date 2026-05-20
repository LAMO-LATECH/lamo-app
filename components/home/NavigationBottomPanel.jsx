import { View, Text, StyleSheet, Pressable } from "react-native";
import { Fire, Stop } from "phosphor-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../../contexts/ThemeContext";
import { spacing, radius, shadow, typography } from "../../constants/Tokens";

function formatDuration(seconds) {
  const mins = Math.round(seconds / 60);
  if (mins < 60) return `${mins} min`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m > 0 ? `${h} hr ${m} min` : `${h} hr`;
}

function formatETA(date) {
  if (!date) return "";
  return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

function formatDistance(meters) {
  const miles = meters / 1609.34;
  return `${miles.toFixed(1)} mi`;
}

export default function NavigationBottomPanel({
  totalDurationRemaining,
  totalDistanceRemaining,
  eta,
  streak,
  pointsEarned,
  onEnd,
}) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = createStyles(colors);

  return (
    <View
      style={[styles.container, { paddingBottom: insets.bottom + spacing.md }]}
    >
      <View style={styles.topRow}>
        <View style={styles.estimates}>
          <Text style={styles.duration}>
            {formatDuration(totalDurationRemaining)}
          </Text>
          <Text style={styles.meta}>
            {formatETA(eta)} · {formatDistance(totalDistanceRemaining)}
          </Text>
        </View>
        <Text style={[styles.pointsText, { color: colors.primary }]}>
          +{pointsEarned} pts incoming
        </Text>
      </View>

      <View style={styles.pillRow}>
        <View
          style={[styles.pill, { backgroundColor: colors.primary }]}
        >
          <Fire size={18} color="#fff" weight="fill" />
          <Text style={[styles.pillText, { color: "#fff" }]}>
            Day {streak} streak
          </Text>
        </View>

        <Pressable
          style={[styles.pill, { backgroundColor: colors.danger }]}
          onPress={onEnd}
        >
          <Stop size={18} color="#fff" weight="fill" />
          <Text style={[styles.pillText, { color: "#fff" }]}>End</Text>
        </Pressable>
      </View>
    </View>
  );
}

const createStyles = (colors) =>
  StyleSheet.create({
    container: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: colors.surface,
      borderTopLeftRadius: radius.lg,
      borderTopRightRadius: radius.lg,
      paddingHorizontal: spacing.xl,
      paddingTop: spacing.xl,
      ...shadow.md,
    },
    topRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: spacing.lg,
    },
    estimates: {},
    duration: {
      ...typography.h3,
      color: colors.text,
    },
    meta: {
      ...typography.bodySmall,
      color: colors.inactive,
      marginTop: 2,
    },
    pointsText: {
      ...typography.body,
      fontWeight: "700",
    },
    pillRow: {
      flexDirection: "row",
      gap: spacing.sm,
    },
    pill: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.xs,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      borderRadius: radius.sm,
    },
    pillText: {
      ...typography.bodySmall,
      fontWeight: "600",
    },
  });
