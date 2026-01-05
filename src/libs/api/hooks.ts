import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
  QueryKey,
} from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { apiRequest, apiPublicRequest } from "./client";

/**
 * Generic hook for API queries with TanStack Query (WITH auth)
 * @param queryKey - Unique key for the query (use queryKeys from queryKeys.ts)
 * @param url - API endpoint URL
 * @param config - Optional axios config
 * @param options - Additional TanStack Query options
 */
export function useApiQuery<TData>(
  queryKey: QueryKey,
  url: string,
  config?: AxiosRequestConfig,
  options?: Omit<UseQueryOptions<TData, Error>, "queryKey" | "queryFn">
) {
  return useQuery<TData, Error>({
    queryKey,
    queryFn: () => apiRequest<TData>(url, { ...config, method: "GET" }),
    ...options,
  });
}

/**
 * Generic hook for API queries WITHOUT auth (Public)
 * @param queryKey - Unique key for the query
 * @param url - API endpoint URL
 * @param config - Optional axios config
 * @param options - Additional TanStack Query options
 */
export function useApiPublicQuery<TData>(
  queryKey: QueryKey,
  url: string,
  config?: AxiosRequestConfig,
  options?: Omit<UseQueryOptions<TData, Error>, "queryKey" | "queryFn">
) {
  return useQuery<TData, Error>({
    queryKey,
    queryFn: () => apiPublicRequest<TData>(url, { ...config, method: "GET" }),
    ...options,
  });
}

/**
 * Generic hook for API mutations WITH auth (Protected)
 * Gunakan untuk protected mutations (CRUD yang butuh login)
 * @param options - TanStack Mutation options
 */
export function useApiMutation<TData, TVariables = unknown>(
  options?: Omit<
    UseMutationOptions<
      TData,
      Error,
      { url: string; data?: TVariables; config?: AxiosRequestConfig }
    >,
    "mutationFn"
  >
) {
  return useMutation<
    TData,
    Error,
    { url: string; data?: TVariables; config?: AxiosRequestConfig }
  >({
    mutationFn: ({ url, data, config }) =>
      apiRequest<TData>(url, { ...config, method: "POST", data }),
    ...options,
  });
}

/**
 * Generic hook untuk POST request WITH auth
 */
export function usePost<TData, TVariables = unknown>(
  url: string,
  options?: Omit<UseMutationOptions<TData, Error, TVariables>, "mutationFn">
) {
  return useMutation<TData, Error, TVariables>({
    mutationFn: (data) => apiRequest<TData>(url, { method: "POST", data }),
    ...options,
  });
}

/**
 * Generic hook untuk PUT request WITH auth
 */
export function usePut<TData, TVariables = unknown>(
  url: string,
  options?: Omit<UseMutationOptions<TData, Error, TVariables>, "mutationFn">
) {
  return useMutation<TData, Error, TVariables>({
    mutationFn: (data) => apiRequest<TData>(url, { method: "PUT", data }),
    ...options,
  });
}

/**
 * Generic hook untuk PATCH request WITH auth
 */
export function usePatch<TData, TVariables = unknown>(
  url: string,
  options?: Omit<UseMutationOptions<TData, Error, TVariables>, "mutationFn">
) {
  return useMutation<TData, Error, TVariables>({
    mutationFn: (data) => apiRequest<TData>(url, { method: "PATCH", data }),
    ...options,
  });
}

/**
 * Generic hook untuk DELETE request WITH auth
 */
export function useDelete<TData>(
  url: string,
  options?: Omit<UseMutationOptions<TData, Error, void>, "mutationFn">
) {
  return useMutation<TData, Error, void>({
    mutationFn: () => apiRequest<TData>(url, { method: "DELETE" }),
    ...options,
  });
}

/**
 * Generic hook untuk API mutations WITHOUT auth (Public)
 * Gunakan untuk public endpoints: login, register, dll
 */
export function useApiPublicMutation<TData, TVariables = unknown>(
  options?: Omit<
    UseMutationOptions<
      TData,
      Error,
      { url: string; data?: TVariables; config?: AxiosRequestConfig }
    >,
    "mutationFn"
  >
) {
  return useMutation<
    TData,
    Error,
    { url: string; data?: TVariables; config?: AxiosRequestConfig }
  >({
    mutationFn: ({ url, data, config }) =>
      apiPublicRequest<TData>(url, { ...config, method: "POST", data }),
    ...options,
  });
}

/**
 * Generic hook untuk POST request WITHOUT auth (Public)
 */
export function usePublicPost<TData, TVariables = unknown>(
  url: string,
  options?: Omit<UseMutationOptions<TData, Error, TVariables>, "mutationFn">
) {
  return useMutation<TData, Error, TVariables>({
    mutationFn: (data) =>
      apiPublicRequest<TData>(url, { method: "POST", data }),
    ...options,
  });
}
