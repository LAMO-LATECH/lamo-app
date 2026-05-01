import { View, Text, StyleSheet } from "react-native";
import { House, Briefcase, Plus } from "phosphor-react-native";
import { Colors } from "../../constants/Color";
import { spacing, radius, iconSize, typography } from "../../constants/Tokens";

const ITEMS = [
  {
    key: "home",
    label: "Home",
    Icon: House,
    bg: Colors.light.surfaceDark,
    iconColor: Colors.light.accent,
    weight: "fill",
  },
  {
    key: "work",
    label: "Work",
    Icon: Briefcase,
    bg: Colors.light.surfaceDark,
    iconColor: Colors.light.accent,
    weight: "fill",
  },
  {
    key: "new",
    label: "New",
    Icon: Plus,
    bg: Colors.light.border,
    iconColor: Colors.light.text,
    weight: "bold",
  },
];

export default function SavedDestinations() {
  return (
    <View style={styles.container}>
      {ITEMS.map(({ key, label, Icon, bg, iconColor, weight }) => (
        <View key={key} style={styles.item}>
          <View style={[styles.circle, { backgroundColor: bg }]}>
            <Icon size={iconSize.sm} color={iconColor} weight={weight} />
          </View>
          <Text style={styles.label}>{label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: spacing.xl,
  },
  item: {
    alignItems: "center",
    gap: spacing.xs,
  },
  circle: {
    width: 48,
    height: 48,
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    ...typography.caption,
    color: Colors.light.text,
  },
});
