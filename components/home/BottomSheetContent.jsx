import { View, StyleSheet } from "react-native";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import SearchBar from "./SearchBar";
import SavedDestinations from "./SavedDestinations";
import LocalVibes from "./LocalVibes";
import { spacing } from "../../constants/Tokens";

export default function BottomSheetContent() {
  return (
    <BottomSheetView style={styles.container}>
      <SearchBar />
      <SavedDestinations />
      <LocalVibes />
    </BottomSheetView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.xl,
    gap: spacing.xl,
  },
});
