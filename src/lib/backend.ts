type JsonRecord = Record<string, unknown>;

function getProcessEnvValue(name: string): string | undefined {
  if (typeof process !== "undefined" && process.env) {
    return process.env[name];
  }
  return undefined;
}

export function getApiBaseUrl(): string {
  const base =
    (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_BASE_URL) ||
    getProcessEnvValue("VITE_API_BASE_URL") ||
    getProcessEnvValue("API_BASE_URL") ||
    "http://localhost:8080";

  return String(base).replace(/\/$/, "");
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return !!window.localStorage.getItem("mimbari_auth_token");
}

export function saveAuthToken(token: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem("mimbari_auth_token", token);
}

export function clearAuthToken(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem("mimbari_auth_token");
}

export async function backendRequest<T = unknown>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const base = getApiBaseUrl();
  const headers = new Headers(init.headers ?? {});

  if (!headers.has("Content-Type") && init.body && !(init.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem("mimbari_auth_token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  }

  const response = await fetch(`${base}${path}`, {
    ...init,
    headers,
  });

  if (response.status === 204) {
    return undefined as T;
  }

  const text = await response.text();
  const payload = text ? (JSON.parse(text) as JsonRecord | unknown[]) : null;

  if (!response.ok) {
    const message =
      (payload && typeof payload === "object" && "message" in payload && typeof payload.message === "string"
        ? payload.message
        : payload && typeof payload === "object" && "error" in payload && typeof payload.error === "string"
          ? payload.error
          : null) || `HTTP ${response.status}`;
    throw new Error(message);
  }

  return (payload as T) ?? (null as T);
}
