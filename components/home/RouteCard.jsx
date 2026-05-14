import { View, Text, StyleSheet, Pressable } from "react-native";
import { Clock, MapTrifold, Star, Warning } from "phosphor-react-native";
import { Colors } from "../../constants/Color";
import { spacing, radius, typography } from "../../constants/Tokens";

const TAG_COLORS = {
  FASTEST: { bg: "#E8F5E9", text: "#2E7D32" },
  RECOMMENDED: { bg: "#FFF3E0", text: "#E65100" },
  ECO_FRIENDLY: { bg: "#E0F2F1", text: "#00695C" },
  ALTERNATIVE: { bg: "#E3F2FD", text: "#1565C0" },
};

const CONGESTION_COLORS = {
  LOW: "#2E7D32",
  MEDIUM: "#F57F17",
  HIGH: "#C62828",
};

function formatDuration(minutes) {
  const hrs = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);
  if (hrs === 0) return `${mins} min`;
  return mins > 0 ? `${hrs}h ${mins}m` : `${hrs}h`;
}

export default function RouteCard({ route, isSelected, isRecommended, onPress }) {
  const tagStyle = TAG_COLORS[route.tag] || TAG_COLORS.ALTERNATIVE;
  const congestionColor = CONGESTION_COLORS[route.congestionStatus] || CONGESTION_COLORS.LOW;
  const blocked = route.blocked;

  return (
    <Pressable
      onPress={blocked ? undefined : onPress}
      style={[
        styles.card,
        isSelected && styles.cardSelected,
        blocked && styles.cardBlocked,
      ]}
    >
      <View style={styles.topRow}>
        <Text style={[styles.routeName, blocked && styles.textBlocked]} numberOfLines={1}>
          {route.routeName}
        </Text>
        <View style={[styles.tag, { backgroundColor: blocked ? Colors.light.border : tagStyle.bg }]}>
          <Text style={[styles.tagText, { color: blocked ? Colors.light.inactive : tagStyle.text }]}>
            {route.tag.replace("_", " ")}
          </Text>
        </View>
      </View>

      <View style={styles.detailRow}>
        <View style={styles.detail}>
          <Clock size={16} color={blocked ? Colors.light.inactive : Colors.light.text} />
          <Text style={[styles.detailText, blocked && styles.textBlocked]}>
            {formatDuration(route.estimatedDuration)}
          </Text>
        </View>
        <View style={styles.detail}>
          <MapTrifold size={16} color={blocked ? Colors.light.inactive : Colors.light.text} />
          <Text style={[styles.detailText, blocked && styles.textBlocked]}>
            {route.distanceMiles.toFixed(1)} mi
          </Text>
        </View>
        <View style={styles.detail}>
          <View style={[styles.congestionDot, { backgroundColor: blocked ? Colors.light.inactive : congestionColor }]} />
          <Text style={[styles.detailText, blocked && styles.textBlocked]}>
            {route.congestionStatus}
          </Text>
        </View>
        <View style={styles.detail}>
          <Star size={16} color={blocked ? Colors.light.inactive : Colors.light.accent} weight="fill" />
          <Text style={[styles.detailText, blocked && styles.textBlocked]}>
            {route.pointsEarned}
          </Text>
        </View>
      </View>

      {blocked && route.blockReason && (
        <View style={styles.blockRow}>
          <Warning size={14} color={Colors.light.inactive} />
          <Text style={styles.blockText}>{route.blockReason}</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1.5,
    borderColor: Colors.light.border,
    borderRadius: radius.sm,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  cardSelected: {
    borderColor: Colors.light.primary,
    backgroundColor: "#FDF3EF",
  },
  cardBlocked: {
    opacity: 0.5,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm,
  },
  routeName: {
    ...typography.body,
    color: Colors.light.text,
    flex: 1,
  },
  tag: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
  },
  tagText: {
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.lg,
    flexWrap: "wrap",
  },
  detail: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  detailText: {
    ...typography.caption,
    color: Colors.light.text,
  },
  congestionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  textBlocked: {
    color: Colors.light.inactive,
  },
  blockRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  blockText: {
    ...typography.caption,
    color: Colors.light.inactive,
  },
});
