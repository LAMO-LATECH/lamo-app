import { View, Pressable, StyleSheet } from "react-native";
import { GearSix, Crosshair, Stack } from "phosphor-react-native";
import { useRouter } from "expo-router";
import { Colors } from "../../constants/Color";
import { spacing, radius, iconSize, shadow } from "../../constants/Tokens";

const BUTTONS = [
  { key: "settings", Icon: GearSix },
  { key: "location", Icon: Crosshair },
  { key: "layers", Icon: Stack },
];

export default function MapControls() {
  const router = useRouter();

  const handlePress = (key) => {
    if (key === "settings") {
      router.push("/settings");
    }
  };

  return (
    <View style={styles.container}>
      {BUTTONS.map(({ key, Icon }) => (
        <Pressable key={key} style={styles.button} onPress={() => handlePress(key)}>
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
    gap: spacing.sm,
  },
  button: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light.surface,
    borderRadius: radius.sm,
    ...shadow.sm,
  },
});
