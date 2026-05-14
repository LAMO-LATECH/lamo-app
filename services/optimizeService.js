import { apiRequest } from "./core/apiClient";

const OPTIMIZE_API = "http://localhost:3001";

export function optimizeRoute({ from, to, userId }) {
  return apiRequest(`${OPTIMIZE_API}/optimize`, {
    method: "POST",
    body: { from, to, userId },
    auth: false,
  });
}
