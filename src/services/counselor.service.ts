/**
 * Counselor Service
 *
 * Service untuk operasi CRUD Counselor
 */

import { get, put, del } from "@/libs/api";
import { ICounselor } from "@/types/auth";

// ============ COUNSELOR SERVICE ============

/**
 * Get all counselors (Counselor only)
 */
async function getAllCounselors(): Promise<ICounselor[]> {
  return await get<ICounselor[]>("/counselor");
}

/**
 * Get counselor by ID
 */
async function getCounselorById(id: string): Promise<ICounselor> {
  return await get<ICounselor>(`/counselor/${id}`);
}

/**
 * Update counselor profile (Counselor only - own profile)
 */
async function updateCounselor(data: Partial<ICounselor>): Promise<ICounselor> {
  return await put<ICounselor>("/counselor", data);
}

/**
 * Delete counselor (Counselor only)
 */
async function deleteCounselor(id: string): Promise<void> {
  return await del<void>(`/counselor/${id}`);
}

// Export counselor service
export const counselorService = {
  getAllCounselors,
  getCounselorById,
  updateCounselor,
  deleteCounselor,
};
