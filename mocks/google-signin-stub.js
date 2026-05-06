/**
 * @react-native-google-signin/google-signin stub for Expo Go.
 * All methods are no-ops so the app doesn't crash on missing native modules.
 */
const GoogleSignin = {
  configure: () => {},
  hasPlayServices: async () => true,
  signIn: async () => ({ data: { idToken: null } }),
  signOut: async () => {},
  isSignedIn: () => false,
  getCurrentUser: () => null,
  revokeAccess: async () => {},
};

const statusCodes = {
  SIGN_IN_CANCELLED: 'SIGN_IN_CANCELLED',
  IN_PROGRESS: 'IN_PROGRESS',
  PLAY_SERVICES_NOT_AVAILABLE: 'PLAY_SERVICES_NOT_AVAILABLE',
};

module.exports = {
  GoogleSignin,
  statusCodes,
};
