/**
 * Counselor Hooks
 * Custom React Query hooks untuk Counselor operations
 */

"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { counselorService } from "../counselor.service";
import { queryKeys } from "@/libs/api";
import { ICounselor } from "@/types/auth";

// ============ QUERIES ============

/**
 * Hook untuk get all counselors
 */
export function useCounselors() {
  return useQuery({
    queryKey: queryKeys.counselors.lists(),
    queryFn: counselorService.getAllCounselors,
  });
}

/**
 * Hook untuk get counselor by ID
 */
export function useCounselor(id: string) {
  return useQuery({
    queryKey: queryKeys.counselors.detail(id),
    queryFn: () => counselorService.getCounselorById(id),
    enabled: !!id,
  });
}

// ============ MUTATIONS ============

/**
 * Hook untuk update counselor
 */
export function useUpdateCounselor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<ICounselor>) =>
      counselorService.updateCounselor(data),
    onSuccess: (updatedCounselor) => {
      // Invalidate counselors list
      queryClient.invalidateQueries({ queryKey: queryKeys.counselors.all });
      // Update specific counselor cache
      queryClient.setQueryData(
        queryKeys.counselors.detail(updatedCounselor._id),
        updatedCounselor
      );
      // Invalidate current user if it's the same counselor
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.currentUser() });
    },
  });
}

/**
 * Hook untuk delete counselor
 */
export function useDeleteCounselor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => counselorService.deleteCounselor(id),
    onSuccess: () => {
      // Invalidate counselors list
      queryClient.invalidateQueries({ queryKey: queryKeys.counselors.all });
    },
  });
}
