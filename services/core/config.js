export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || "http://localhost:4000";

export const ENDPOINTS = {
  // auth
  register: "/api/v1/auth/register",
  login: "/api/v1/auth/login",
  googleAuth: "/api/v1/auth/google",
  refresh: "/api/v1/auth/refresh",
  logout: "/api/v1/auth/logout",

  // user
  me: "/api/v1/users/me",
  preferences: "/api/v1/users/me/preferences",

  // gamification
  gamification: "/api/v1/users/me/gamification",

  // destinations
  destinations: "/api/v1/users/me/destinations",
};
