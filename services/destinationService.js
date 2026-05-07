import { apiRequest } from "./core/apiClient";
import { ENDPOINTS } from "./core/config";

export function getDestinations() {
  return apiRequest(ENDPOINTS.destinations, { method: "GET" });
}

export function upsertDestination(type, data) {
  return apiRequest(`${ENDPOINTS.destinations}/${type}`, {
    method: "PUT",
    body: data,
  });
}

export function createDestination(data) {
  return apiRequest(ENDPOINTS.destinations, {
    method: "POST",
    body: data,
  });
}

export function updateDestination(id, data) {
  return apiRequest(`${ENDPOINTS.destinations}/${id}`, {
    method: "PATCH",
    body: data,
  });
}

export function deleteDestination(id) {
  return apiRequest(`${ENDPOINTS.destinations}/${id}`, {
    method: "DELETE",
  });
}
