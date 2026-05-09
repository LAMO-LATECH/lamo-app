import { View, Text, Pressable, StyleSheet } from "react-native";
import { MapPin, NavigationArrow } from "phosphor-react-native";
import { Colors } from "../../constants/Color";
import { spacing, radius, typography } from "../../constants/Tokens";

export default function DestinationCard({ place, onConfirm, onCancel }) {
  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <MapPin size={28} color={Colors.light.primary} weight="fill" />
        <View style={styles.textWrap}>
          <Text style={styles.name} numberOfLines={1}>
            {place.name}
          </Text>
          <Text style={styles.address} numberOfLines={2}>
            {place.fullAddress}
          </Text>
        </View>
      </View>

      <View style={styles.actions}>
        <Pressable style={styles.backBtn} onPress={onCancel}>
          <Text style={styles.backText}>Back</Text>
        </Pressable>
        <Pressable style={styles.goBtn} onPress={onConfirm}>
          <NavigationArrow size={20} color={Colors.light.background} weight="fill" />
          <Text style={styles.goText}>Go</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: spacing.xl,
    marginTop: spacing.lg,
    padding: spacing.lg,
    backgroundColor: Colors.light.surface,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: Colors.light.border,
    gap: spacing.lg,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  textWrap: {
    flex: 1,
  },
  name: {
    ...typography.body,
    fontFamily: "PoppinsSemiBold",
    color: Colors.light.text,
  },
  address: {
    ...typography.caption,
    color: Colors.light.inactive,
    marginTop: 2,
  },
  actions: {
    flexDirection: "row",
    gap: spacing.md,
  },
  backBtn: {
    flex: 1,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: Colors.light.primary,
    paddingVertical: spacing.md,
    alignItems: "center",
  },
  backText: {
    ...typography.body,
    fontFamily: "PoppinsSemiBold",
    color: Colors.light.primary,
  },
  goBtn: {
    flex: 1,
    flexDirection: "row",
    borderRadius: radius.sm,
    backgroundColor: Colors.light.primary,
    paddingVertical: spacing.md,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
  },
  goText: {
    ...typography.body,
    fontFamily: "PoppinsSemiBold",
    color: Colors.light.background,
  },
});
