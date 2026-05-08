# lamo-app

A React Native app built with Expo.

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm (comes with Node.js)
- [Expo CLI](https://docs.expo.dev/get-started/installation/): `npm install -g expo-cli`
- [Expo Go](https://expo.dev/client) app installed on your iOS or Android device (for physical device testing)

---

## Getting Started

```bash
# 1. Clone the repository
git clone <repo-url>
cd lamo-app

# 2. Install dependencies
npm install
```

You will also need the backend server running. See [LAMO Backend](https://github.com/LAMO-LATECH/backend) for setup instructions.

---

## Environment Setup

Create a `.env.local` file in the project root with the following variables:

```env
EXPO_PUBLIC_API_URL=http://localhost:4000
EXPO_PUBLIC_MAPBOX_TOKEN=<your-mapbox-public-token>
RNMAPBOX_MAPS_DOWNLOAD_TOKEN=<your-mapbox-sdk-download-token>
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=<your-google-web-client-id>
EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID=<your-google-ios-client-id>
```

| Variable | Description |
| -------- | ----------- |
| `EXPO_PUBLIC_API_URL` | Backend API URL |
| `EXPO_PUBLIC_MAPBOX_TOKEN` | Mapbox public token (for map rendering) |
| `RNMAPBOX_MAPS_DOWNLOAD_TOKEN` | Mapbox SDK download token (required for installing the native Mapbox SDK) |
| `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID` | Google Sign-In web client ID |
| `EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID` | Google Sign-In iOS client ID |

---

## Running the App

| Platform | Command | Requirement |
| -------- | ------- | ----------- |
| Expo Go (physical device) | `npm run start:go` → scan QR code | Expo Go app on device |
| iOS Simulator | `npm run ios` | macOS + Xcode installed |
| Android Emulator | `npm run android` | Android Studio + emulator running |
| Web Browser | `npm run web` | None |
| Dev Client | `npm start` | Custom dev client build on device |

### `start:go`

`npm run start:go` sets `EXPO_PUBLIC_USE_STUBS=true`, which swaps native modules (e.g. Mapbox, Google Sign-In) for stub implementations in `/mocks`. This lets you run the app in Expo Go without building a custom dev client.

---

## Available Scripts

| Script | Description |
| ------ | ----------- |
| `npm start` | Start the Expo dev server |
| `npm run start:go` | Start with stubs enabled (for Expo Go) |
| `npm run ios` | Build and run on iOS Simulator |
| `npm run android` | Build and run on Android Emulator |
| `npm run web` | Open in web browser |

---

## Project Structure

| Folder | Description |
| ------ | ----------- |
| `/app` | Expo Router file-based routing |
| `/components` | Reusable UI components |
| `/services` | API clients and business logic |
| `/contexts` | React Context providers |
| `/constants` | App constants |
| `/assets` | Images, fonts, icons |
| `/mocks` | Stub implementations for Expo Go compatibility |

---

## Tech Stack

- **Expo** ~54.0.33
- **React Native** 0.81.5
- **React** 19.1.0
- React Native New Architecture enabled
