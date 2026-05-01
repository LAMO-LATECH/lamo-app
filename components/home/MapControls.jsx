import { View, Pressable, StyleSheet } from "react-native";
import { GearSix, Crosshair, Stack } from "phosphor-react-native";
import { Colors } from "../../constants/Color";
import { spacing, radius, iconSize, shadow } from "../../constants/Tokens";

const BUTTONS = [
  { key: "settings", Icon: GearSix },
  { key: "location", Icon: Crosshair },
  { key: "layers", Icon: Stack },
];

export default function MapControls() {
  return (
    <View style={styles.container}>
      {BUTTONS.map(({ key, Icon }) => (
        <Pressable key={key} style={styles.button}>
          <Icon size={iconSize.sm} color={Colors.light.text} weight="bold" />
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 60,
    left: spacing.lg,
    backgroundColor: Colors.light.surface,
    borderRadius: radius.sm,
    padding: spacing.xs,
    gap: spacing.xs,
    ...shadow.sm,
  },
  button: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
});
