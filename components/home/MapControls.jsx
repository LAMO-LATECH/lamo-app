import { View, Pressable, StyleSheet } from "react-native";
import { GearSix, Crosshair, Stack } from "phosphor-react-native";
import { useRouter } from "expo-router";
import { spacing, radius, iconSize, shadow } from "../../constants/Tokens";
import { useTheme } from "../../contexts/ThemeContext";

const BUTTONS = [
  { key: "settings", Icon: GearSix },
  { key: "location", Icon: Crosshair },
  { key: "layers", Icon: Stack },
];

export default function MapControls({ onRecenter, onCycleStyle }) {
  const router = useRouter();
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const handlePress = (key) => {
    if (key === "settings") {
      router.push("/settings");
    } else if (key === "location") {
      onRecenter?.();
    } else if (key === "layers") {
      onCycleStyle?.();
    }
  };

  return (
    <View style={styles.container}>
      {BUTTONS.map(({ key, Icon }) => (
        <Pressable key={key} style={styles.button} onPress={() => handlePress(key)}>
          <Icon size={iconSize.sm} color={colors.text} weight="bold" />
        </Pressable>
      ))}
    </View>
  );
}

const createStyles = (colors) =>
  StyleSheet.create({
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
      backgroundColor: colors.surface,
      borderRadius: radius.sm,
      ...shadow.sm,
    },
  });
