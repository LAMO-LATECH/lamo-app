const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// When EXPO_PUBLIC_USE_STUBS=true (i.e. running in Expo Go),
// replace @rnmapbox/maps with a no-op stub so native modules aren't required.
// resolveRequest takes priority over node_modules, unlike extraNodeModules.
if (process.env.EXPO_PUBLIC_USE_STUBS === 'true') {
  config.resolver.resolveRequest = (context, moduleName, platform) => {
    if (moduleName === '@rnmapbox/maps') {
      return {
        filePath: path.resolve(__dirname, 'mocks/mapbox-stub.js'),
        type: 'sourceFile',
      };
    }
    if (moduleName === 'expo-speech-recognition') {
      return {
        filePath: path.resolve(__dirname, 'mocks/speech-recognition-stub.js'),
        type: 'sourceFile',
      };
    }
    return context.resolveRequest(context, moduleName, platform);
  };
}

module.exports = config;
