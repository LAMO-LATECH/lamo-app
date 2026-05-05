import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import { Colors } from "../../constants/Color";
import {useState} from "react";
import LegalModal from "../../components/LegalModal";

export default function GetStarted() {
  const [legalVisible, setLegalVisible]=useState(false);
  const [legalType, setLegalType]=useState("terms");
  const openLegal = (type) =>{
    setLegalType(type);
    setLegalVisible(true);
  }
  return (
    <View style={styles.container}>
      <View style={styles.animationContainer}>
        <Image
          source={require("../../assets/palm_tree1.png")}
          style={styles.palmLeft}
        />
        <Image
          source={require("../../assets/palm_tree2.png")}
          style={styles.palmRight}
        />
        <LottieView
          source={require("../../assets/car.json")}
          autoPlay
          loop
          style={styles.animation}
        />
      </View>

      <Text style={styles.subtitle}>
        LAMO finds routes that earn you rewards, while easing traffic for
        everyone.
      </Text>

      <Text style={styles.title}>
        Drive<Text style={styles.accent}> smarter</Text>,{"\n"}
        Reduce<Text style={styles.accent}> congestion</Text>,{"\n"}
        Reward<Text style={styles.accent}> yourself</Text>.
      </Text>

      <Text style={styles.terms}>
        By continuing, you agree to our {" "}
        <Text style={styles.legalLink} onPress={() => openLegal("terms")}>
        Terms
        </Text>
        
        {" "}and{" "}

        <Text style={styles.legalLink} onPress={() => openLegal("privacy")}>
        Privacy Policy
        </Text>
      </Text>
      <LegalModal visible={legalVisible} type={legalType} onClose={() => setLegalVisible(false)} />

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => router.push("/signup")}
      >
        <Text style={styles.primaryButtonText}>Get Started</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/login")}>
        <Text style={styles.secondaryLink}>I already have an account</Text>
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
    paddingHorizontal: 20,
  },
  animationContainer: {
    width: 320,
    height: 240,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    marginTop: 20,
    position: "relative",
  },

  palmLeft: {
    position: "absolute",
    top: 2,
    left: 20,
    width: 110,
    transform: [{ rotate: "-25deg" }],
    zIndex: 0,
  },
  palmRight: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 125,
    transform: [{ rotate: "20deg" }],
    zIndex: 0,
  },

  lottieWrapper: {
    width: 220,
    height: 220,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },

  animation: {
    width: "100%",
    height: "100%",
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "PoppinsRegular",
    color: Colors.light.text,
    opacity: 0.7,
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 20,
    maxWidth: 290,
  },
  title: {
    fontSize: 34,
    fontFamily: "PoppinsBold",
    color: Colors.light.text,
    textAlign: "center",
    marginBottom: 28,
    lineHeight: 42,
  },
  accent: {
    color: Colors.light.accent,
    fontFamily: "PoppinsBold",
  },
  terms: {
    fontSize: 12,
    fontFamily: "PoppinsRegular",
    color: Colors.light.text,
    opacity: 0.6,
    textAlign: "center",
    marginBottom: 28,
    lineHeight: 18,
    maxWidth: 290,
  },
  primaryButton: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 18,
    width: "100%",
  },
  primaryButtonText: {
    fontFamily: "PoppinsSemiBold",
    color: Colors.light.background,
    fontSize: 17,
  },
  secondaryLink: {
    fontFamily: "PoppinsSemiBold",
    color: Colors.light.text,
    fontSize: 17,
  },
  legalLink:{
    color:Colors.light.primary,
    fontFamily:"PoppinsSemiBold",
  },
});
