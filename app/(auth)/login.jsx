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
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Colors } from "../../constants/Color";
import { useAuth } from "../../contexts/AuthContext";

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};
GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
});

export default function Login() {
  const { login, googleLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      const idToken = response.data?.idToken;
      if (!idToken) throw new Error("No ID token received from Google.");
      await googleLogin(idToken);
      router.replace("/(tabs)");
    } catch (err) {
      if (err.code !== "SIGN_IN_CANCELLED") {
        Alert.alert(
          "Google Login Failed",
          err?.message || "Something went wrong.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    // empty check
    if (!cleanEmail || !cleanPassword) {
      Alert.alert("Error", "Please enter your email and password.");
      return;
    }

    // email format check
    if (!validateEmail(cleanEmail)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      await login(cleanEmail, cleanPassword);
      router.replace("/(tabs)");
    } catch (err) {
      Alert.alert("Login Failed", err?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>
        Sign in to keep earning <Text style={styles.accent}>rewards</Text> while
        helping LA move smarter.
      </Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email address"
          placeholderTextColor={Colors.light.inactive}
          keyboardType="email-address"
          autoCapitalize="none"
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
      </View>

      <TouchableOpacity
        style={[styles.primaryButton, loading && styles.disabledButton]}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color={Colors.light.background} />
        ) : (
          <Text style={styles.primaryButtonText}>Log In</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.googleButton}
        onPress={handleGoogleLogin}
        disabled={loading}
      >
        <Text style={styles.googleButtonText}>Log In with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/signup")}>
        <Text style={styles.linkText}>
          Don't have an account? <Text style={styles.linkAccent}>Sign Up</Text>
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
