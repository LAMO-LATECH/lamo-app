import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import * as authService from "../services/authService";
import { getMe } from "../services/userService";
import { getAccessToken } from "../services/core/tokenStorage";
import { setSessionExpiredHandler } from "../services/core/apiClient";

const AuthContext = createContext(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  const handleSessionExpired = useCallback(() => {
    setUser(null);
  }, []);

  useEffect(() => {
    setSessionExpiredHandler(handleSessionExpired);
    return () => setSessionExpiredHandler(null);
  }, [handleSessionExpired]);

  useEffect(() => {
    let cancelled = false;
    const timeout = setTimeout(() => {
      if (!cancelled) setIsLoading(false);
    }, 5000);
    (async () => {
      try {
        const token = await getAccessToken();
        if (token) {
          const me = await getMe();
          if (!cancelled) setUser(me);
        }
      } catch {
      } finally {
        if (!cancelled) setIsLoading(false);
        clearTimeout(timeout);
      }
    })();
    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, []);

  const login = useCallback(async (email, password) => {
    await authService.login(email, password);
    const me = await getMe();
    setUser(me);
  }, []);

  const signup = useCallback(async (email, password) => {
    await authService.register(email, password);
    const me = await getMe();
    setUser(me);
  }, []);

  const googleLogin = useCallback(async (idToken) => {
    await authService.googleAuth(idToken);
    const me = await getMe();
    setUser(me);
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isLoading, login, signup, googleLogin, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
