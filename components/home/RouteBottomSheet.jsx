import { View, Text, StyleSheet, Pressable } from "react-native";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { ArrowLeft, Lightning } from "phosphor-react-native";
import { Colors } from "../../constants/Color";
import { spacing, radius, typography } from "../../constants/Tokens";
import RouteCard from "./RouteCard";

export default function RouteBottomSheet({ routeData, selectedRouteId, onSelectRoute, onClose }) {
  const { routeOptions, nudgeMessage, recommendedRouteId } = routeData;

  const sorted = [...routeOptions].sort((a, b) => {
    if (a.routeId === recommendedRouteId) return -1;
    if (b.routeId === recommendedRouteId) return 1;
    if (a.blocked && !b.blocked) return 1;
    if (!a.blocked && b.blocked) return -1;
    return 0;
  });

  return (
    <BottomSheetScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onClose} hitSlop={12}>
          <ArrowLeft size={24} color={Colors.light.text} />
        </Pressable>
        <Text style={styles.title}>Routes</Text>
      </View>

      {nudgeMessage && (
        <View style={styles.nudge}>
          <Lightning size={18} color={Colors.light.accent} weight="fill" />
          <Text style={styles.nudgeText}>{nudgeMessage}</Text>
        </View>
      )}

      <View style={styles.cards}>
        {sorted.map((route) => (
          <RouteCard
            key={route.routeId}
            route={route}
            isSelected={route.routeId === selectedRouteId}
            isRecommended={route.routeId === recommendedRouteId}
            onPress={() => onSelectRoute(route.routeId)}
          />
        ))}
      </View>

      <Pressable style={styles.startButton} onPress={() => console.log("Start")}>
        <Text style={styles.startText}>Start</Text>
      </Pressable>
    </BottomSheetScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxxl,
    gap: spacing.lg,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.light.text,
  },
  nudge: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: Colors.light.surfaceAlt,
    padding: spacing.md,
    borderRadius: radius.sm,
  },
  nudgeText: {
    ...typography.caption,
    color: Colors.light.text,
    flex: 1,
  },
  cards: {
    gap: spacing.md,
  },
  startButton: {
    backgroundColor: Colors.light.primary,
    paddingVertical: spacing.lg,
    borderRadius: radius.md,
    alignItems: "center",
  },
  startText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
});
