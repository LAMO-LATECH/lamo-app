import { View, Text, StyleSheet, Pressable } from "react-native";
import { fonts } from "../constants/Tokens";
import { ArrowLeft } from "phosphor-react-native";
import { router } from "expo-router";
import { useTheme } from "../contexts/ThemeContext";

export default function RideHistory() {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <ArrowLeft size={24} color={colors.text} weight="bold" />
      </Pressable>
      <Text style={styles.title}>Ride History</Text>
      <Text style={styles.subtitle}>
        Your completed smart routes will appear here.
      </Text>
    </View>
  );
}

const createStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 24,
    },
    title: {
      fontSize: 32,
      fontFamily: fonts.bold,
      color: colors.text,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 14,
      fontFamily: fonts.regular,
      color: colors.text,
      opacity: 0.7,
      textAlign: "center",
    },
    backButton: {
      position: "absolute",
      top: 60,
      left: 20,
    },
  });
