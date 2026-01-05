import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosError,
} from "axios";
import Cookies from "js-cookie";

// ============ CONFIGURATION ============
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Cookie keys
const ACCESS_TOKEN_KEY = "access_token";

// Cookie options
const COOKIE_OPTIONS: Cookies.CookieAttributes = {
  secure: process.env.NODE_ENV === "production", // HTTPS only in production
  sameSite: "strict", // CSRF protection
  path: "/",
};

// Access token options (sesuaikan expires dengan kebutuhan Anda)
const ACCESS_TOKEN_OPTIONS: Cookies.CookieAttributes = {
  ...COOKIE_OPTIONS,
  expires: 7, // 7 days (sesuaikan dengan backend Anda)
};

// ============ TOKEN STORAGE (COOKIES) ============
export const tokenStorage = {
  // Access Token
  getAccessToken: (): string | undefined => {
    if (typeof window !== "undefined") {
      return Cookies.get(ACCESS_TOKEN_KEY);
    }
    return undefined;
  },

  setAccessToken: (token: string): void => {
    if (typeof window !== "undefined") {
      Cookies.set(ACCESS_TOKEN_KEY, token, ACCESS_TOKEN_OPTIONS);
    }
  },

  removeAccessToken: (): void => {
    if (typeof window !== "undefined") {
      Cookies.remove(ACCESS_TOKEN_KEY, { path: "/" });
    }
  },

  // Clear token (logout)
  clearToken: (): void => {
    tokenStorage.removeAccessToken();
  },

  // Check if user has access token
  isAuthenticated: (): boolean => {
    return !!tokenStorage.getAccessToken();
  },
};

// ============ AXIOS INSTANCES ============

/**
 * Client WITH authentication
 * - Otomatis attach Bearer token di header
 * - Redirect ke /login jika unauthorized (401)
 * - Gunakan untuk semua protected endpoints
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Client WITHOUT authentication
 * - Tidak ada token di header
 * - Gunakan untuk public endpoints: login, register
 */
const apiPublicClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ============ HELPER FUNCTIONS ============

// Redirect ke login page
const redirectToLogin = () => {
  tokenStorage.clearToken();
  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
};

// ============ INTERCEPTORS ============

// Request Interceptor - Attach access token ke setiap request
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = tokenStorage.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor - Handle 401 Unauthorized
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // Jika 401 (Unauthorized), redirect ke login
    if (error.response?.status === 401) {
      redirectToLogin();
    }

    return Promise.reject(error);
  }
);

// ============ TYPES ============

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success?: boolean;
}

export interface ApiError {
  message: string;
  statusCode?: number;
  errors?: Record<string, string[]>;
}

// Custom error class untuk API errors
export class ApiRequestError extends Error {
  statusCode?: number;
  errors?: Record<string, string[]>;
  isAuthError: boolean;

  constructor(
    message: string,
    statusCode?: number,
    errors?: Record<string, string[]>
  ) {
    super(message);
    this.name = "ApiRequestError";
    this.statusCode = statusCode;
    this.errors = errors;
    this.isAuthError = statusCode === 401;
  }
}

// ============ REQUEST FUNCTIONS ============

/**
 * Execute API request WITH authentication (Protected)
 *
 * Alur:
 * 1. Request dikirim dengan Bearer token di header
 * 2. Jika 401 error, redirect ke /login
 *
 * Gunakan untuk: CRUD users, get profile, dll
 */
export async function apiRequest<T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> {
  try {
    const response = await apiClient<ApiResponse<T>>(url, config);
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const apiError = error.response?.data as ApiError | undefined;
      throw new ApiRequestError(
        apiError?.message || error.message,
        error.response?.status,
        apiError?.errors
      );
    }
    throw error;
  }
}

/**
 * Execute API request WITHOUT authentication (Public)
 *
 * Tidak ada token di header.
 *
 * Gunakan untuk: login, register, forgot password, public data
 */
export async function apiPublicRequest<T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> {
  try {
    const response = await apiPublicClient<ApiResponse<T>>(url, config);
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const apiError = error.response?.data as ApiError | undefined;
      throw new ApiRequestError(
        apiError?.message || error.message,
        error.response?.status,
        apiError?.errors
      );
    }
    throw error;
  }
}

// ============ CONVENIENCE METHODS ============

/**
 * GET request WITH auth
 */
export const get = <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
  apiRequest<T>(url, { ...config, method: "GET" });

/**
 * POST request WITH auth
 */
export const post = <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<T> => apiRequest<T>(url, { ...config, method: "POST", data });

/**
 * PUT request WITH auth
 */
export const put = <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<T> => apiRequest<T>(url, { ...config, method: "PUT", data });

/**
 * PATCH request WITH auth
 */
export const patch = <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<T> => apiRequest<T>(url, { ...config, method: "PATCH", data });

/**
 * DELETE request WITH auth
 */
export const del = <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
  apiRequest<T>(url, { ...config, method: "DELETE" });

/**
 * GET request WITHOUT auth
 */
export const publicGet = <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => apiPublicRequest<T>(url, { ...config, method: "GET" });

/**
 * POST request WITHOUT auth
 */
export const publicPost = <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<T> => apiPublicRequest<T>(url, { ...config, method: "POST", data });

export { apiClient, apiPublicClient };
