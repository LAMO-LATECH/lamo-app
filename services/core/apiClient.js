import { API_BASE_URL, ENDPOINTS } from "./config";
import {
  getAccessToken,
  getRefreshToken,
  setTokens,
  clearTokens,
} from "./tokenStorage";

let sessionExpireHandler = null;

export function setSessionExpiredHandler(callback) {
  sessionExpireHandler = callback;
}

function fireSessionExpired() {
  if (typeof sessionExpireHandler === "function") {
    try {
      sessionExpireHandler();
    } catch (err) {
      console.warn("[apiClient] sessionExpiredHandler threw:", err);
    }
  }
}

let refreshPromise = null;

async function refreshTokens() {
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    const refreshToken = await getRefreshToken();
    if (!refreshToken) {
      throw new ApiError("No refresh token available", 401);
    }

    const res = await fetch(`${API_BASE_URL}${ENDPOINTS.refresh}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (!res.ok) {
      throw new ApiError("Token refresh failed", res.status);
    }

    const data = await res.json();
    if (!data?.accessToken) {
      throw new ApiError("Refresh response missing accessToken", 500);
    }

    await setTokens({
      accessToken: data.accessToken,
      refreshToken: data.refreshToken ?? refreshToken,
    });

    return data.accessToken;
  })();

  try {
    return await refreshPromise;
  } finally {
    refreshPromise = null;
  }
}

export class ApiError extends Error {
  constructor(message, status, body) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

async function buildHeaders({ auth, extraHeaders, hasBody }) {
  const headers = { Accept: "application/json", ...extraHeaders };
  if (hasBody && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }
  if (auth) {
    const token = await getAccessToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

async function parseBody(res) {
  if (res.status === 204) return null;

  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    try {
      return await res.json();
    } catch {
      return null;
    }
  }
  try {
    return await res.text();
  } catch {
    return null;
  }
}

export async function apiRequest(endpoint, options = {}) {
  const {
    method = "GET",
    body,
    auth = true,
    headers: extraHeaders,
    ...rest
  } = options;

  const url = endpoint.startsWith("http")
    ? endpoint
    : `${API_BASE_URL}${endpoint}`;
  const hasBody = body !== undefined && body !== null;

  const doFetch = async () => {
    const headers = await buildHeaders({ auth, extraHeaders, hasBody });
    return fetch(url, {
      method,
      headers,
      body: hasBody ? JSON.stringify(body) : undefined,
      ...rest,
    });
  };

  let res = await doFetch();

  if (res.status === 401 && auth) {
    try {
      await refreshTokens();
    } catch (err) {
      await clearTokens();
      fireSessionExpired();
      throw err instanceof ApiError
        ? err
        : new ApiError("Session expired", 401);
    }
    res = await doFetch();
  }

  const parsed = await parseBody(res);

  if (!res.ok) {
    const message =
      (parsed &&
        typeof parsed === "object" &&
        (parsed.message || parsed.error)) ||
      `Request failed with status ${res.status}`;
    throw new ApiError(message, res.status, parsed);
  }

  return parsed;
}
