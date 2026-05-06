import { StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  runOnJS,
  Easing,
  interpolateColor,
} from "react-native-reanimated";
import { useEffect } from "react";
import { Colors } from "../constants/Color";

const AnimatedSplash = ({ onFinish }) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0);
  const bgProgress = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const containerStyle = useAnimatedStyle(() => ({
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: interpolateColor(
      bgProgress.value,
      [0, 1],
      [Colors.light.primary, Colors.light.background],
    ),
  }));

  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: 500,
      easing: Easing.out(Easing.ease),
    });
    scale.value = withDelay(
      1000,
      withTiming(
        15,
        { duration: 600, easing: Easing.in(Easing.ease) },
        () => {
          runOnJS(onFinish)();
        },
      ),
    );
    bgProgress.value = withDelay(
      1000,
      withTiming(1, { duration: 600, easing: Easing.in(Easing.ease) }),
    );
  }, []);

  return (
    <Animated.View style={containerStyle}>
      <Animated.Image
        source={require("../assets/splash-icon.png")}
        style={[styles.logo, animatedStyle]}
        resizeMode="contain"
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 350,
    height: 350,
  },
});

export default AnimatedSplash;
