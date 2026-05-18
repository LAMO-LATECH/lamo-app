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

export function getGamification() {
  return apiRequest(ENDPOINTS.gamification, { method: "GET" });
}

export function updateGamification(updates) {
  return apiRequest(ENDPOINTS.gamification, {
    method: "PATCH",
    body: updates,
  });
}

export function deleteAccount() {
  return apiRequest(ENDPOINTS.me, {
    method: "DELETE",
  });
}
