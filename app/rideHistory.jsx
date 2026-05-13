import { View, Text, StyleSheet, Pressable } from "react-native";
import { Colors } from "../constants/Color";
import { ArrowLeft } from "phosphor-react-native";
import { router } from "expo-router";

export default function RideHistory() {
  return (
    <View style={styles.container}>
        <Pressable onPress={() => router.back()}
            style={styles.backButton}>
            <ArrowLeft size={24} color={Colors.light.text} weight="bold"/>
        </Pressable>
      <Text style={styles.title}>Ride History</Text>
      <Text style={styles.subtitle}>
        Your completed smart routes will appear here.
        </Text>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    fontFamily: "PoppinsBold",
    color: Colors.light.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "PoppinsRegular",
    color: Colors.light.text,
    opacity: 0.7,
    textAlign: "center",
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 20,
  },
  backText: {
    fontSize: 22,
    fontFamily: "PoppinsBold",
    color: Colors.light.text,
  },
});