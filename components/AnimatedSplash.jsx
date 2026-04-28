import { View, Image, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  runOnJS,
  Easing,
} from "react-native-reanimated";
import { useEffect } from "react";
import { Colors } from "../constants/Color";

const AnimatedSplash = ({ onFinish }) => {
  const scale = useSharedValue(0.3);
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  useEffect(() => {
    opacity.value = withSequence(
      withTiming(1, { duration: 600, easing: Easing.out(Easing.ease) }),
      withTiming(1, { duration: 600 }), // hold
      withTiming(0, { duration: 400 }, (finished) => {
        if (finished) runOnJS(onFinish)();
      }),
    );
    scale.value = withSequence(
      withTiming(1, { duration: 600, easing: Easing.out(Easing.back(1.5)) }),
      withTiming(1, { duration: 600 }),
      withTiming(1.1, { duration: 400 }),
    );
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../assets/splash-icon.png")}
        style={[styles.logo, animatedStyle]}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 350,
    height: 350,
  },
});

export default AnimatedSplash;
