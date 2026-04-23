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

# 3. Start the development server
npm start
```

After running `npm start`, a QR code will appear in your terminal. Scan it with the Expo Go app on your phone to open the app instantly.

---

## Running on Platforms

| Platform         | Command                    | Requirement                       |
| ---------------- | -------------------------- | --------------------------------- |
| iOS Simulator    | `npm run ios`              | macOS + Xcode installed           |
| Android Emulator | `npm run android`          | Android Studio + emulator running |
| Physical Device  | `npm start` → scan QR code | Expo Go app on device             |
| Web Browser      | `npm run web`              | None                              |

---

## Available Scripts

| Script            | Description                               |
| ----------------- | ----------------------------------------- |
| `npm start`       | Start the Expo dev server (shows QR code) |
| `npm run ios`     | Open in iOS Simulator                     |
| `npm run android` | Open in Android Emulator                  |
| `npm run web`     | Open in web browser                       |

---

## Tech Stack

- **Expo** ~54.0.33
- **React Native** 0.81.5
- **React** 19.1.0
- React Native New Architecture enabled
