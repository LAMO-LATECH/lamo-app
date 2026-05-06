/**
 * expo-speech-recognition stub for Expo Go.
 * All methods are no-ops so the app doesn't crash on missing native modules.
 */
const ExpoSpeechRecognitionModule = {
  start: () => {},
  stop: () => {},
  abort: () => {},
  requestPermissionsAsync: async () => ({ granted: false }),
  getPermissionsAsync: async () => ({ granted: false }),
  getSupportedLocales: async () => ({ locales: [] }),
  isRecognitionAvailable: () => false,
};

const useSpeechRecognitionEvent = () => {};

module.exports = {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
};
