import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { useColorScheme } from "react-native";
import * as SecureStore from "expo-secure-store";
import { Colors } from "../constants/Color";

const ThemeContext = createContext(null);

const THEME_KEY = "theme_preference";

export function ThemeProvider({ children }) {
  const systemScheme = useColorScheme();
  const [preference, setPreference] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    SecureStore.getItemAsync(THEME_KEY).then((value) => {
      setPreference(value || "system");
      setLoaded(true);
    });
  }, []);

  const setThemePreference = async (value) => {
    setPreference(value);
    await SecureStore.setItemAsync(THEME_KEY, value);
  };

  const isDark = useMemo(() => {
    if (preference === "dark") return true;
    if (preference === "light") return false;
    return systemScheme === "dark";
  }, [preference, systemScheme]);

  const colors = isDark ? Colors.dark : Colors.light;

  if (!loaded) return null;

  return (
    <ThemeContext.Provider value={{ colors, isDark, preference, setThemePreference }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
