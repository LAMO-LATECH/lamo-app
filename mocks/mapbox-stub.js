/**
 * Mapbox stub for Expo Go.
 * Renders placeholder Views instead of crashing on missing native modules.
 */
const React = require('react');
const { View, Text, StyleSheet } = require('react-native');

const Placeholder = ({ style, children }) => (
  <View style={[styles.placeholder, style]}>
    <Text style={styles.text}>Map unavailable in Expo Go</Text>
    {children}
  </View>
);

const Noop = () => null;

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#666',
    fontSize: 14,
  },
});

const MapboxGL = {
  setAccessToken: () => {},
  MapView: Placeholder,
  Camera: Noop,
  LocationPuck: Noop,
  PointAnnotation: Noop,
  MarkerView: Noop,
  ShapeSource: Noop,
  LineLayer: Noop,
  FillLayer: Noop,
  SymbolLayer: Noop,
  CircleLayer: Noop,
  Images: Noop,
  UserLocation: Noop,
  offlineManager: { createPack: () => {}, getPacks: () => [] },
  StyleURL: {
    Street: 'mapbox://styles/mapbox/streets-v11',
    Light: 'mapbox://styles/mapbox/light-v11',
    Dark: 'mapbox://styles/mapbox/dark-v11',
    Satellite: 'mapbox://styles/mapbox/satellite-v9',
    SatelliteStreet: 'mapbox://styles/mapbox/satellite-streets-v11',
    TrafficDay: 'mapbox://styles/mapbox/traffic-day-v2',
    TrafficNight: 'mapbox://styles/mapbox/traffic-night-v2',
  },
};

module.exports = MapboxGL;
module.exports.default = MapboxGL;
