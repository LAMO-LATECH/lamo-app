import { View, Text, Pressable, StyleSheet } from "react-native";
import { MapPin, Coins, UserCircle } from "phosphor-react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolateColor,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useEffect } from "react";
import {
  spacing,
  radius,
  iconSize,
  typography,
  shadow,
} from "../constants/Tokens";
import { useTheme } from "../contexts/ThemeContext";

const TAB_CONFIG = {
  index: { label: "Map", Icon: MapPin },
  rewards: { label: "Rewards", Icon: Coins },
  profile: { label: "Profile", Icon: UserCircle },
};

function TabItem({ route, isFocused, onPress, onLongPress, colors }) {
  const config = TAB_CONFIG[route.name];
  if (!config) return null;

  const { label, Icon } = config;
  const scale = useSharedValue(1);
  const colorProgress = useSharedValue(isFocused ? 1 : 0);

  const activeColor = colors.primary;
  const inactiveColor = colors.inactive;

  useEffect(() => {
    colorProgress.value = withTiming(isFocused ? 1 : 0, { duration: 250 });
  }, [isFocused]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const animatedTextStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      colorProgress.value,
      [0, 1],
      [inactiveColor, activeColor],
    ),
  }));

  const handlePress = () => {
    scale.value = withSpring(1.1, { damping: 15, stiffness: 400 }, () => {
      scale.value = withSpring(1, { damping: 15, stiffness: 400 });
    });
    onPress();
  };

  return (
    <Pressable
      onPress={handlePress}
      onLongPress={onLongPress}
      style={styles.tabItem}
    >
      <Animated.View style={animatedStyle}>
        <Icon
          size={iconSize.md}
          weight={isFocused ? "fill" : "duotone"}
          color={isFocused ? activeColor : inactiveColor}
        />
      </Animated.View>
      <Animated.Text style={[styles.label, animatedTextStyle]}>
        {label}
      </Animated.Text>
    </Pressable>
  );
}

export default function TabBar({ state, descriptors, navigation }) {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { paddingBottom: insets.bottom || spacing.md, backgroundColor: colors.surfaceAlt },
      ]}
    >
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({ type: "tabLongPress", target: route.key });
        };

        return (
          <TabItem
            key={route.key}
            route={route}
            isFocused={isFocused}
            onPress={onPress}
            onLongPress={onLongPress}
            colors={colors}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingTop: spacing.md,
    ...shadow.sm,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
  label: {
    ...typography.caption,
  },
});
