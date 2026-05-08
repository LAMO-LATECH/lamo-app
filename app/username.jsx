import {View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator} from "react-native";
import {router} from "expo-router";
import {Colors} from "../constants/Color";
import { useState } from "react";
import { updateMe } from "../services/userService";

export default function Username(){
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);

    const handleContinue = async () => {
        if (!username.trim()) {
            Alert.alert("Error", "Please enter a valid username.");
            return;
        }

        setLoading(true);
        try {
            await updateMe({ username: username.trim() });
            router.replace("/(tabs)");
        } catch (error) {
            Alert.alert("Error", "Failed to update username. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Choose your username</Text>

            <Text style={styles.subtitle}>
                Pick a name for your LAMO profiles before you start {" "}
                <Text style={styles.accent}>moving smarter.</Text>
            </Text>

            <TextInput
                style={styles.input}
                placeholder="angeleno_26"
                placeholderTextColor={Colors.light.inactive}
                autoCapitalize="none"
                value={username}
                onChangeText={setUsername}
            />

            <TouchableOpacity
                style={[styles.primaryButton, loading && styles.disabledButton]}
                onPress={handleContinue}
                disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color={Colors.light.background} />
                  ) : (
                    <Text style={styles.primaryButtonText}>Continue</Text>
                  )}
                </TouchableOpacity>
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
    textAlign: "center",
    lineHeight: 40,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "PoppinsRegular",
    color: Colors.light.text,
    opacity: 0.7,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 36,
    maxWidth: 280,
  },
  input: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8E1DA",
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 18,
    fontSize: 15,
    fontFamily: "PoppinsRegular",
    color: Colors.light.text,
    marginBottom: 14,
  },
  primaryButton: {
    width: "100%",
    backgroundColor: Colors.light.primary,
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: "center",
  },
  primaryButtonText:{
    fontSize:17,
    fontFamily: "PoppinsSemiBold",
    color:Colors.light.background,
  },

  accent:{
    color: Colors.light.accent,
    fontFamily: "PoppinsSemiBold",
  },

  disabledButton: {
    opacity: 0.6,
  },
});