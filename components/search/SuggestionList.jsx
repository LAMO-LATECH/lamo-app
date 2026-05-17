import { FlatList, View, Text, Pressable, ActivityIndicator, StyleSheet } from "react-native";
import { MapPin } from "phosphor-react-native";
import { spacing, typography } from "../../constants/Tokens";
import { useTheme } from "../../contexts/ThemeContext";

function SuggestionItem({ item, onSelect, colors }) {
  const styles = createStyles(colors);
  return (
    <Pressable style={styles.item} onPress={() => onSelect(item)}>
      <MapPin size={20} color={colors.primary} weight="fill" />
      <View style={styles.textWrap}>
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>
        {item.fullAddress ? (
          <Text style={styles.address} numberOfLines={1}>
            {item.fullAddress}
          </Text>
        ) : null}
      </View>
    </Pressable>
  );
}

export default function SuggestionList({ suggestions, loading, error, onSelect }) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (loading && suggestions.length === 0) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  return (
    <FlatList
      data={suggestions}
      keyExtractor={(item) => item.mapboxId}
      renderItem={({ item }) => <SuggestionItem item={item} onSelect={onSelect} colors={colors} />}
      keyboardShouldPersistTaps="handled"
      style={styles.list}
    />
  );
}

const createStyles = (colors) =>
  StyleSheet.create({
    list: {
      flex: 1,
    },
    item: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: spacing.xl,
      paddingVertical: spacing.md,
      gap: spacing.md,
    },
    textWrap: {
      flex: 1,
    },
    name: {
      ...typography.body,
      color: colors.text,
    },
    address: {
      ...typography.caption,
      color: colors.inactive,
      marginTop: 2,
    },
    centered: {
      paddingVertical: spacing.xxxl,
      alignItems: "center",
    },
    errorText: {
      ...typography.body,
      color: colors.primary,
    },
  });
