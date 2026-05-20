import { View, Text, StyleSheet } from "react-native";
import {
  ArrowUp,
  ArrowLeft,
  ArrowRight,
  ArrowDownLeft,
  ArrowDownRight,
  ArrowUpLeft,
  ArrowUpRight,
  ArrowsLeftRight,
  MapPin,
} from "phosphor-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../../contexts/ThemeContext";
import { spacing, radius } from "../../constants/Tokens";

function getManeuverIcon(type, modifier) {
  const size = 24;
  const color = "#fff";
  const weight = "bold";

  if (type === "arrive")
    return <MapPin size={size} color={color} weight={weight} />;
  if (type === "depart")
    return <ArrowUp size={size} color={color} weight={weight} />;

  switch (modifier) {
    case "left":
    case "sharp left":
      return <ArrowLeft size={size} color={color} weight={weight} />;
    case "right":
    case "sharp right":
      return <ArrowRight size={size} color={color} weight={weight} />;
    case "slight left":
      return <ArrowUpLeft size={size} color={color} weight={weight} />;
    case "slight right":
      return <ArrowUpRight size={size} color={color} weight={weight} />;
    case "uturn":
      return <ArrowDownLeft size={size} color={color} weight={weight} />;
    case "straight":
    default:
      return <ArrowUp size={size} color={color} weight={weight} />;
  }
}

function formatDistance(meters) {
  const miles = meters / 1609.34;
  if (miles < 0.1) {
    const feet = Math.round(meters * 3.281);
    return `${feet} ft`;
  }
  return `${miles.toFixed(1)} mi`;
}

export default function NavigationTopBanner({
  currentStep,
  distanceToNextStep,
}) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  if (!currentStep) return null;

  return (
    <View
      style={[
        styles.container,
        { top: insets.top + 8, backgroundColor: colors.surfaceDark },
      ]}
    >
      <View style={styles.iconCircle}>
        {getManeuverIcon(
          currentStep.maneuverType,
          currentStep.maneuverModifier,
        )}
      </View>
      <View style={styles.textContainer}>
        {distanceToNextStep != null && (
          <Text style={styles.distance}>
            {formatDistance(distanceToNextStep)}
          </Text>
        )}
        <Text style={styles.instruction} numberOfLines={2}>
          {currentStep.instruction}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: spacing.lg,
    right: spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    gap: spacing.md,
    zIndex: 10,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: radius.sm,
    backgroundColor: "#d9653b",
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    flex: 1,
  },
  distance: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  instruction: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 13,
    fontWeight: "500",
  },
});
