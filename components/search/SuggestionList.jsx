import { FlatList, View, Text, Pressable, ActivityIndicator, StyleSheet } from "react-native";
import { MapPin } from "phosphor-react-native";
import { Colors } from "../../constants/Color";
import { spacing, typography } from "../../constants/Tokens";

function SuggestionItem({ item, onSelect }) {
  return (
    <Pressable style={styles.item} onPress={() => onSelect(item)}>
      <MapPin size={20} color={Colors.light.primary} weight="fill" />
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
        <ActivityIndicator color={Colors.light.primary} />
      </View>
    );
  }

  return (
    <FlatList
      data={suggestions}
      keyExtractor={(item) => item.mapboxId}
      renderItem={({ item }) => <SuggestionItem item={item} onSelect={onSelect} />}
      keyboardShouldPersistTaps="handled"
      style={styles.list}
    />
  );
}

const styles = StyleSheet.create({
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
    color: Colors.light.text,
  },
  address: {
    ...typography.caption,
    color: Colors.light.inactive,
    marginTop: 2,
  },
  centered: {
    paddingVertical: spacing.xxxl,
    alignItems: "center",
  },
  errorText: {
    ...typography.body,
    color: Colors.light.primary,
  },
});
