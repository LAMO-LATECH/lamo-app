import { View, Text, FlatList, StyleSheet } from "react-native";
import { Colors } from "../../constants/Color";
import { spacing, radius, typography } from "../../constants/Tokens";

const PARTNERS = [
  { id: "1", name: "Sip & Savor", category: "Coffee Shop", color: "#c9a96e" },
  { id: "2", name: "Page Turner", category: "Bookstore", color: "#7b9e6b" },
  { id: "3", name: "Golden Crust", category: "Bakery", color: "#d4836d" },
  { id: "4", name: "Bloom & Co", category: "Flower Shop", color: "#a08bc2" },
];

function PartnerCard({ name, category, color }) {
  return (
    <View style={styles.card}>
      <View style={[styles.imagePlaceholder, { backgroundColor: color }]} />
      <Text style={styles.name} numberOfLines={1}>
        {name}
      </Text>
      <Text style={styles.category} numberOfLines={1}>
        {category}
      </Text>
    </View>
  );
}

export default function LocalVibes() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Local Vibes</Text>
      <Text style={styles.subtitle}>Support small businesses nearby</Text>
      <FlatList
        data={PARTNERS}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <PartnerCard
            name={item.name}
            category={item.category}
            color={item.color}
          />
        )}
      />
    </View>
  );
}

const CARD_WIDTH = 130;

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  title: {
    ...typography.body,
    color: Colors.light.text,
    fontWeight: "700",
  },
  subtitle: {
    ...typography.caption,
    color: Colors.light.inactive,
  },
  list: {
    gap: spacing.md,
    paddingTop: spacing.sm,
  },
  card: {
    width: CARD_WIDTH,
    gap: spacing.xs,
  },
  imagePlaceholder: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 0.75,
    borderRadius: radius.sm,
  },
  name: {
    ...typography.body,
    fontSize: 14,
    color: Colors.light.text,
  },
  category: {
    ...typography.caption,
    color: Colors.light.inactive,
  },
});
