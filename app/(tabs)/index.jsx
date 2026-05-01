import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MapboxGL from "@rnmapbox/maps";
import BottomSheet from "@gorhom/bottom-sheet";
import { useMemo, useRef } from "react";
import MapControls from "../../components/home/MapControls";
import StreakBadge from "../../components/home/StreakBadge";
import BottomSheetContent from "../../components/home/BottomSheetContent";
import { Colors } from "../../constants/Color";

MapboxGL.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_TOKEN);

export default function Home() {
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["45%", "80%"], []);

  return (
    <GestureHandlerRootView style={styles.fill}>
      <MapboxGL.MapView
        style={styles.fill}
        styleURL="mapbox://styles/mapbox/light-v11"
        logoEnabled={false}
        attributionEnabled={false}
        scaleBarEnabled={false}
      >
        <MapboxGL.Camera
          followUserLocation
          followZoomLevel={14}
          animationMode="flyTo"
          animationDuration={1000}
        />
        <MapboxGL.LocationPuck
          puckBearing="heading"
          pulsing={{
            isEnabled: true,
            color: Colors.light.primary,
          }}
        />
      </MapboxGL.MapView>

      <MapControls />
      <StreakBadge />

      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={styles.sheetBackground}
        handleIndicatorStyle={styles.handleIndicator}
      >
        <BottomSheetContent />
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  sheetBackground: {
    backgroundColor: Colors.light.background,
  },
  handleIndicator: {
    backgroundColor: Colors.light.border,
    width: 40,
  },
});
