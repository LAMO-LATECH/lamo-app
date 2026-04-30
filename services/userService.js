import { apiRequest } from "./core/apiClient";
import { ENDPOINTS } from "./core/config";

export function getMe() {
  return apiRequest(ENDPOINTS.me, { method: "GET" });
}

export function updateMe(updates) {
  return apiRequest(ENDPOINTS.me, {
    method: "PATCH",
    body: updates,
  });
}

export function getPreferences() {
  return apiRequest(ENDPOINTS.preferences, { method: "GET" });
}

export function updatePreferences(updates) {
  return apiRequest(ENDPOINTS.preferences, {
    method: "PATCH",
    body: updates,
  });
}
