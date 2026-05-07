import { useState, useCallback } from "react";
import { View, Text, Pressable, ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useFocusEffect } from "expo-router";
import { House, Briefcase, Plus, MapPin } from "phosphor-react-native";
import { Colors } from "../../constants/Color";
import { spacing, radius, iconSize, typography } from "../../constants/Tokens";
import { getDestinations } from "../../services/destinationService";

export default function SavedDestinations() {
  const router = useRouter();
  const [destinations, setDestinations] = useState([]);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      getDestinations()
        .then((data) => {
          if (active) setDestinations(Array.isArray(data) ? data : data?.destinations ?? []);
        })
        .catch(() => {});
      return () => {
        active = false;
      };
    }, [])
  );

  const home = destinations?.find((d) => d.type === "home");
  const work = destinations?.find((d) => d.type === "work");
  const custom =
    destinations?.filter((d) => d.type !== "home" && d.type !== "work") ?? [];

  const items = [
    {
      key: "home",
      label: "Home",
      subtitle: home?.address,
      Icon: House,
      bg: Colors.light.surfaceDark,
      iconColor: Colors.light.accent,
      weight: "fill",
      onPress: () =>
        router.push({
          pathname: "/saveDestinations",
          params: { type: "home", currentAddress: home?.address ?? "" },
        }),
    },
    {
      key: "work",
      label: "Work",
      subtitle: work?.address,
      Icon: Briefcase,
      bg: Colors.light.surfaceDark,
      iconColor: Colors.light.accent,
      weight: "fill",
      onPress: () =>
        router.push({
          pathname: "/saveDestinations",
          params: { type: "work", currentAddress: work?.address ?? "" },
        }),
    },
    ...custom.map((d) => ({
      key: d._id,
      label: d.label,
      subtitle: d.address,
      Icon: MapPin,
      bg: Colors.light.surfaceDark,
      iconColor: Colors.light.accent,
      weight: "fill",
      onPress: () =>
        router.push({
          pathname: "/saveDestinations",
          params: {
            type: "new",
            id: d._id,
            currentLabel: d.label,
            currentAddress: d.address,
          },
        }),
    })),
    {
      key: "new",
      label: "New",
      Icon: Plus,
      bg: Colors.light.surfaceAlt,
      iconColor: Colors.light.primary,
      weight: "bold",
      onPress: () =>
        router.push({
          pathname: "/saveDestinations",
          params: { type: "new" },
        }),
    },
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {items.map(({ key, label, subtitle, Icon, bg, iconColor, weight, onPress }) => (
        <Pressable key={key} style={styles.item} onPress={onPress}>
          <View style={[styles.circle, { backgroundColor: bg }]}>
            <Icon size={iconSize.sm} color={iconColor} weight={weight} />
          </View>
          <Text style={styles.label} numberOfLines={1}>
            {label}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: spacing.xl,
  },
  item: {
    alignItems: "center",
    gap: spacing.xs,
  },
  circle: {
    width: 48,
    height: 48,
    borderRadius: radius.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    ...typography.caption,
    color: Colors.light.text,
  },
});
