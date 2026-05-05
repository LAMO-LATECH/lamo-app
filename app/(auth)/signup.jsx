import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import { Colors } from "../../constants/Color";
import { useAuth } from "../../contexts/AuthContext";

export default function SignUp() {
  const { signup } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      await signup(email, password);
      router.replace("/(tabs)");
    } catch (err) {
      Alert.alert("Sign Up Failed", err?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create your account</Text>

      <Text style={styles.subtitle}>
        Join Angelenos in tackling <Text style={styles.accent}>congestion</Text>
      </Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email address"
          placeholderTextColor={Colors.light.inactive}
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={Colors.light.inactive}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor={Colors.light.inactive}
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      <TouchableOpacity
        style={[styles.primaryButton, loading && styles.disabledButton]}
        onPress={handleSignUp}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color={Colors.light.background} />
        ) : (
          <Text style={styles.primaryButtonText}>Sign Up</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.googleButton}>
        <Text style={styles.googleButtonText}>Continue with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/login")}>
        <Text style={styles.linkText}>
          Already have an account? <Text style={styles.linkAccent}>Log in</Text>
        </Text>
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
    maxWidth: 260,
  },

  accent: {
    color: Colors.light.accent,
    fontFamily: "PoppinsSemiBold",
  },

  form: {
    width: "100%",
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
    marginTop: 8,
    marginBottom: 14,
  },

  disabledButton: {
    opacity: 0.6,
  },

  primaryButtonText: {
    fontSize: 17,
    fontFamily: "PoppinsSemiBold",
    color: Colors.light.background,
  },

  googleButton: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8E1DA",
    paddingVertical: 16,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 22,
  },

  googleButtonText: {
    fontSize: 15,
    fontFamily: "PoppinsSemiBold",
    color: Colors.light.text,
  },

  linkText: {
    textAlign: "center",
    fontSize: 15,
    fontFamily: "PoppinsRegular",
    color: Colors.light.text,
  },

  linkAccent: {
    fontFamily: "PoppinsSemiBold",
    color: Colors.light.primary,
  },
});
