import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MapboxGL from "@rnmapbox/maps";
import BottomSheet from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigation } from "expo-router";
import MapControls from "../../components/home/MapControls";
import StreakBadge from "../../components/home/StreakBadge";
import BottomSheetContent from "../../components/home/BottomSheetContent";
import { Colors } from "../../constants/Color";
import { shadow } from "../../constants/Tokens";

MapboxGL.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_TOKEN);

const MAP_STYLES = [
  "mapbox://styles/mapbox/light-v11",
  "mapbox://styles/mapbox/dark-v11",
  "mapbox://styles/mapbox/satellite-streets-v11",
];

export default function Home() {
  const bottomSheetRef = useRef(null);
  const cameraRef = useRef(null);
  const snapPoints = useMemo(() => ["45%", "80%"], []);
  const navigation = useNavigation();
  const [styleURL, setStyleURL] = useState(MAP_STYLES[0]);
  const [followUser, setFollowUser] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", () => {
      bottomSheetRef.current?.snapToIndex(0);
    });
    return unsubscribe;
  }, [navigation]);

  const handleRecenter = useCallback(() => {
    setFollowUser(true);
  }, []);

  const handleCycleStyle = useCallback(() => {
    setStyleURL((current) => {
      const index = MAP_STYLES.indexOf(current);
      return MAP_STYLES[(index + 1) % MAP_STYLES.length];
    });
  }, []);

  return (
    <GestureHandlerRootView style={styles.fill}>
      <MapboxGL.MapView
        style={styles.fill}
        styleURL={styleURL}
        logoEnabled={false}
        attributionEnabled={false}
        scaleBarEnabled={false}
        onTouchStart={() => setFollowUser(false)}
      >
        <MapboxGL.Camera
          ref={cameraRef}
          followUserLocation={followUser}
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

      <MapControls onRecenter={handleRecenter} onCycleStyle={handleCycleStyle} />
      <StreakBadge />

      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
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
    backgroundColor: Colors.light.surface,
    ...shadow.sm,
  },
  handleIndicator: {
    backgroundColor: Colors.light.border,
    width: 40,
  },
});
