/**
 * Parent Service
 *
 * Service untuk operasi CRUD Parent
 */

import { get, put, del } from "@/libs/api";
import { IParent } from "@/types/auth";

// ============ PARENT SERVICE ============

/**
 * Get all parents (Counselor only)
 */
async function getAllParents(): Promise<IParent[]> {
  return await get<IParent[]>("/parent");
}

/**
 * Get parent by ID
 */
async function getParentById(id: string): Promise<IParent> {
  return await get<IParent>(`/parent/${id}`);
}

/**
 * Update parent profile (Parent only - own profile)
 */
async function updateParent(data: Partial<IParent>): Promise<IParent> {
  return await put<IParent>("/parent", data);
}

/**
 * Delete parent (Parent only)
 */
async function deleteParent(id: string): Promise<void> {
  return await del<void>(`/parent/${id}`);
}

// Export parent service
export const parentService = {
  getAllParents,
  getParentById,
  updateParent,
  deleteParent,
};
