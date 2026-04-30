import { apiRequest } from "./core/apiClient";
import { ENDPOINTS } from "./core/config";
import { setTokens, clearTokens } from "./core/tokenStorage";

export async function register(email, password) {
  const data = await apiRequest(ENDPOINTS.register, {
    method: "POST",
    body: { email, password },
    auth: false,
  });

  if (data?.accessToken) {
    await setTokens({
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    });
  }

  return data;
}

export async function login(email, password) {
  const data = await apiRequest(ENDPOINTS.login, {
    method: "POST",
    body: { email, password },
    auth: false,
  });

  if (data?.accessToken) {
    await setTokens({
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    });
  }

  return data;
}

export async function logout() {
  try {
    await apiRequest(ENDPOINTS.logout, { method: "POST" });
  } catch (err) {
    console.warn("[authService] logout request failed:", err?.message);
  } finally {
    await clearTokens();
  }
}
