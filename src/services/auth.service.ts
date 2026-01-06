/**
 * Authentication Service
 *
 * Service untuk handle semua operasi authentication:
 * - Login (Counselor & Parent)
 * - Register (Counselor & Parent)
 * - Logout
 * - Get current user
 * - Change password
 */

import { publicPost, post, get, put, tokenStorage } from "@/libs/api";
import {
  ICounselorLoginInput,
  ICounselorLoginResponse,
  ICounselorRegisterInput,
  IParentLoginInput,
  IParentLoginResponse,
  IParentRegisterInput,
  IChangePasswordInput,
  ICurrentUser,
  ICounselor,
  IParent,
  IUpdateCounselorInput,
  IUpdateParentInput,
  IForgotPasswordInput,
  IForgotPasswordResponse,
  IResetPasswordInput,
} from "@/types/auth";

// ============ AUTH SERVICE ============

/**
 * Login sebagai Counselor
 */
async function loginCounselor(
  input: ICounselorLoginInput
): Promise<ICounselorLoginResponse> {
  const response = await publicPost<ICounselorLoginResponse>(
    "/auth/login/counselor",
    input
  );

  // Simpan token ke cookies
  tokenStorage.setAccessToken(response.token);

  return response;
}

/**
 * Register Counselor baru
 */
async function registerCounselor(
  input: ICounselorRegisterInput
): Promise<ICounselorLoginResponse> {
  const response = await publicPost<ICounselorLoginResponse>(
    "/auth/register/counselor",
    input
  );

  // Simpan token ke cookies setelah register
  tokenStorage.setAccessToken(response.token);

  return response;
}

/**
 * Login sebagai Parent
 */
async function loginParent(
  input: IParentLoginInput
): Promise<IParentLoginResponse> {
  const response = await publicPost<IParentLoginResponse>(
    "/auth/login/parent",
    input
  );

  // Simpan token ke cookies
  tokenStorage.setAccessToken(response.token);

  return response;
}

/**
 * Register Parent baru
 */
async function registerParent(
  input: IParentRegisterInput
): Promise<IParentLoginResponse> {
  const response = await publicPost<IParentLoginResponse>(
    "/auth/register/parent",
    input
  );

  // Simpan token ke cookies setelah register
  tokenStorage.setAccessToken(response.token);

  return response;
}

/**
 * Get current user info
 */
async function getCurrentUser(): Promise<ICurrentUser> {
  return await get<ICurrentUser>("/auth/current-user");
}

/**
 * Change password
 */
async function changePassword(input: IChangePasswordInput): Promise<void> {
  return await post<void>("/auth/change-password", input);
}

/**
 * Update counselor profile
 */
async function updateCounselorProfile(
  input: IUpdateCounselorInput
): Promise<ICounselor> {
  return await put<ICounselor>("/counselor", input);
}

/**
 * Update parent profile
 */
async function updateParentProfile(
  input: IUpdateParentInput
): Promise<IParent> {
  return await put<IParent>("/parent", input);
}

/**
 * Logout user
 */
async function logout(): Promise<void> {
  try {
    await post<void>("/auth/logout");
  } finally {
    // Clear token dari cookies
    tokenStorage.clearToken();
  }
}

/**
 * Request forgot password
 */
async function forgotPassword(
  input: IForgotPasswordInput
): Promise<IForgotPasswordResponse> {
  return await publicPost<IForgotPasswordResponse>(
    "/auth/forgot-password",
    input
  );
}

/**
 * Reset password with token
 */
async function resetPassword(input: IResetPasswordInput): Promise<void> {
  return await publicPost<void>("/auth/reset-password", input);
}

/**
 * Check if user is authenticated
 */
function isAuthenticated(): boolean {
  return tokenStorage.isAuthenticated();
}

// Export auth service
export const authService = {
  loginCounselor,
  registerCounselor,
  loginParent,
  registerParent,
  getCurrentUser,
  changePassword,
  updateCounselorProfile,
  updateParentProfile,
  logout,
  forgotPassword,
  resetPassword,
  isAuthenticated,
};
