import { useEffect } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ArrowLeft } from "phosphor-react-native";
import { spacing, iconSize } from "../constants/Tokens";
import SearchBar from "../components/home/SearchBar";
import SuggestionList from "../components/search/SuggestionList";
import useMapboxSearch from "../hooks/useMapboxSearch";
import { useDestination } from "../contexts/DestinationContext";
import { useTheme } from "../contexts/ThemeContext";

export default function SearchScreen() {
  const router = useRouter();
  const { q } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const search = useMapboxSearch();
  const { selectDestination } = useDestination();
  const { colors } = useTheme();
  const styles = createStyles(colors);

  useEffect(() => {
    if (q) search.updateQuery(q);
  }, [q]);

  async function handleSelect(suggestion) {
    const place = await search.selectSuggestion(suggestion);
    if (place) {
      selectDestination({
        name: place.name,
        address: place.fullAddress,
        latitude: place.coordinates.latitude,
        longitude: place.coordinates.longitude,
      });
      router.back();
    }
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top + spacing.md }]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <ArrowLeft
            size={iconSize.md}
            color={colors.text}
            weight="bold"
          />
        </Pressable>
        <View style={styles.barWrapper}>
          <SearchBar
            editable
            value={search.query}
            onChangeText={search.updateQuery}
            autoFocus
          />
        </View>
      </View>

      <SuggestionList
        suggestions={search.suggestions}
        loading={search.loading}
        error={search.error}
        onSelect={handleSelect}
      />
    </View>
  );
}

const createStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: spacing.xl,
      paddingVertical: spacing.md,
      gap: spacing.md,
    },
    barWrapper: {
      flex: 1,
    },
  });
