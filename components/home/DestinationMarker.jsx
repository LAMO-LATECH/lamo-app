import { View, Image, StyleSheet } from "react-native";
import MapboxGL from "@rnmapbox/maps";
import { useTheme } from "../../contexts/ThemeContext";

export default function DestinationMarker({ destination }) {
  const { colors } = useTheme();

  return (
    <MapboxGL.MarkerView
      id="destination-marker"
      coordinate={[destination.longitude, destination.latitude]}
      anchor={{ x: 0.5, y: 1 }}
      allowOverlap={true}
    >
      <View style={styles.container}>
        <Image
          source={require("../../assets/map-pin-fill.png")}
          style={[styles.icon, { tintColor: colors.primary }]}
        />
      </View>
    </MapboxGL.MarkerView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  icon: {
    width: 36,
    height: 36,
    resizeMode: "contain",
  },
});
