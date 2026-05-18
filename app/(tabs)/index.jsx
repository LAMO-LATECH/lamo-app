import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MapboxGL from "@rnmapbox/maps";
import BottomSheet from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigation } from "expo-router";
import { useDestination } from "../../contexts/DestinationContext";
import { useAuth } from "../../contexts/AuthContext";
import { getMe } from "../../services/userService";
import { optimizeRoute } from "../../services/optimizeService";
import MapControls from "../../components/home/MapControls";
import StreakBadge from "../../components/home/StreakBadge";
import BottomSheetContent from "../../components/home/BottomSheetContent";
import RouteBottomSheet from "../../components/home/RouteBottomSheet";
import PlaceDetailsSheet from "../../components/home/PlaceDetailsSheet";
import DestinationMarker from "../../components/home/DestinationMarker";
import { shadow } from "../../constants/Tokens";
import { useTheme } from "../../contexts/ThemeContext";

MapboxGL.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_TOKEN);

const MAP_STYLE_LIGHT = "mapbox://styles/mapbox/light-v11";
const MAP_STYLE_DARK = "mapbox://styles/mapbox/dark-v11";
const MAP_STYLE_SATELLITE = "mapbox://styles/mapbox/satellite-streets-v11";

export default function Home() {
  const bottomSheetRef = useRef(null);
  const cameraRef = useRef(null);
  const snapPoints = useMemo(() => ["45%", "80%"], []);
  const navigation = useNavigation();
  const { destination: selectedDestination, clearDestination } =
    useDestination();
  const { user } = useAuth();
  const { colors, isDark } = useTheme();
  const styles = createStyles(colors);

  const mapStyles = useMemo(
    () => [isDark ? MAP_STYLE_DARK : MAP_STYLE_LIGHT, MAP_STYLE_SATELLITE],
    [isDark],
  );

  const [styleURL, setStyleURL] = useState(
    isDark ? MAP_STYLE_DARK : MAP_STYLE_LIGHT,
  );
  const [followUser, setFollowUser] = useState(true);
  const [destination, setDestination] = useState(null);
  const [routeData, setRouteData] = useState(null);
  const [selectedRouteId, setSelectedRouteId] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [streak, setStreak] = useState(0);
  const [routeLoading, setRouteLoading] = useState(false);
  const [showRoutes, setShowRoutes] = useState(false);

  useEffect(() => {
    getMe()
      .then((data) => setStreak((data.user || data)?.streak ?? 0))
      .catch((err) => console.error("Failed to load streak:", err));
  }, []);

  // Auto-switch map style when theme changes (unless on satellite)
  useEffect(() => {
    setStyleURL((current) => {
      if (current === MAP_STYLE_SATELLITE) return current;
      return isDark ? MAP_STYLE_DARK : MAP_STYLE_LIGHT;
    });
  }, [isDark]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", () => {
      bottomSheetRef.current?.snapToIndex(0);
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (selectedDestination) {
      setShowRoutes(false);
      setFollowUser(false);
      setDestination(selectedDestination);
      clearDestination();

      // Fire route optimization in background
      setRouteLoading(true);
      optimizeRoute({
        from: userLocation
          ? `${userLocation.longitude},${userLocation.latitude}`
          : "Current Location",
        to: selectedDestination.name,
        userId: user?._id,
      })
        .then((res) => {
          setRouteData(res.result);
          setSelectedRouteId(res.result.recommendedRouteId);
        })
        .catch((err) => console.error("Optimize error:", err))
        .finally(() => setRouteLoading(false));
    }
  }, [selectedDestination]);

  useEffect(() => {
    if (destination && !showRoutes) {
      setTimeout(() => {
        cameraRef.current?.setCamera({
          centerCoordinate: [destination.longitude, destination.latitude],
          zoomLevel: 15,
          animationDuration: 1500,
          animationMode: "flyTo",
        });
      }, 500);
    }
  }, [destination, showRoutes]);

  // Fit camera to route bounds when showing routes
  useEffect(() => {
    if (!showRoutes || !routeData?.routeGeometries?.length) return;

    let minLng = Infinity,
      maxLng = -Infinity;
    let minLat = Infinity,
      maxLat = -Infinity;

    for (const geo of routeData.routeGeometries) {
      if (!geo.geometry?.coordinates) continue;
      for (const [lng, lat] of geo.geometry.coordinates) {
        if (lng < minLng) minLng = lng;
        if (lng > maxLng) maxLng = lng;
        if (lat < minLat) minLat = lat;
        if (lat > maxLat) maxLat = lat;
      }
    }

    if (minLng === Infinity) return;

    cameraRef.current?.fitBounds(
      [maxLng, maxLat],
      [minLng, minLat],
      [60, 60, 300, 60],
      1500,
    );
  }, [showRoutes, routeData]);

  const handleRecenter = useCallback(() => {
    setFollowUser(true);
  }, []);

  const handleCycleStyle = useCallback(() => {
    setStyleURL((current) => {
      const index = mapStyles.indexOf(current);
      return mapStyles[(index + 1) % mapStyles.length];
    });
  }, [mapStyles]);

  const handleDismiss = useCallback(() => {
    setRouteData(null);
    setSelectedRouteId(null);
    setDestination(null);
    setShowRoutes(false);
    setFollowUser(true);
  }, []);

  const handleShowDirections = useCallback(() => {
    setShowRoutes(true);
  }, []);

  const handleBackToDetails = useCallback(() => {
    setShowRoutes(false);
  }, []);

  // Sort route geometries so selected route renders last (on top)
  const sortedGeometries = useMemo(() => {
    if (!routeData?.routeGeometries) return [];
    const blocked = new Set(routeData.blockedRoutes || []);
    return [...routeData.routeGeometries]
      .filter((g) => !blocked.has(g.routeId) && g.geometry?.coordinates)
      .sort((a, b) => {
        if (a.routeId === selectedRouteId) return 1;
        if (b.routeId === selectedRouteId) return -1;
        return 0;
      });
  }, [routeData, selectedRouteId]);

  // Determine bottom sheet content
  const renderSheetContent = () => {
    if (destination && showRoutes && routeData) {
      return (
        <RouteBottomSheet
          routeData={routeData}
          selectedRouteId={selectedRouteId}
          onSelectRoute={setSelectedRouteId}
          onClose={handleDismiss}
          onBack={handleBackToDetails}
        />
      );
    }
    if (destination && !showRoutes) {
      return (
        <PlaceDetailsSheet
          destination={destination}
          onDirections={handleShowDirections}
          onDismiss={handleDismiss}
          routeLoading={routeLoading}
        />
      );
    }
    return <BottomSheetContent />;
  };

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
          followUserLocation={followUser && !destination}
          followZoomLevel={14}
          animationMode="flyTo"
          animationDuration={1000}
        />
        <MapboxGL.UserLocation
          visible={false}
          onUpdate={(loc) =>
            setUserLocation({
              latitude: loc.coords.latitude,
              longitude: loc.coords.longitude,
            })
          }
        />
        <MapboxGL.LocationPuck
          puckBearing="heading"
          pulsing={{
            isEnabled: true,
            color: colors.primary,
          }}
        />
        {destination && <DestinationMarker destination={destination} />}
        {showRoutes &&
          sortedGeometries.map((geo) => {
            const isSelected = geo.routeId === selectedRouteId;
            return (
              <MapboxGL.ShapeSource
                key={`${geo.routeId}-${isSelected}`}
                id={`route-${geo.routeId}-${isSelected}`}
                shape={geo.geometry}
              >
                <MapboxGL.LineLayer
                  id={`line-${geo.routeId}-${isSelected}`}
                  style={{
                    lineColor: isSelected ? colors.primary : colors.inactive,
                    lineWidth: isSelected ? 6 : 3,
                    lineOpacity: isSelected ? 1 : 0.5,
                    lineCap: "round",
                    lineJoin: "round",
                  }}
                />
              </MapboxGL.ShapeSource>
            );
          })}
      </MapboxGL.MapView>

      <MapControls
        onRecenter={handleRecenter}
        onCycleStyle={handleCycleStyle}
      />
      <StreakBadge count={streak} />

      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={!destination}
        backgroundStyle={styles.sheetBackground}
        handleIndicatorStyle={styles.handleIndicator}
      >
        {renderSheetContent()}
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

const createStyles = (colors) =>
  StyleSheet.create({
    fill: {
      flex: 1,
    },
    sheetBackground: {
      backgroundColor: colors.surface,
      ...shadow.sm,
    },
    handleIndicator: {
      backgroundColor: colors.border,
      width: 40,
    },
  });
