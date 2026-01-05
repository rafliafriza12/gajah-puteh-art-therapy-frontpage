/**
 * Parent Hooks
 * Custom React Query hooks untuk Parent operations
 */

"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { parentService } from "../parent.service";
import { queryKeys } from "@/libs/api";
import { IParent } from "@/types/auth";

// ============ QUERIES ============

/**
 * Hook untuk get all parents
 */
export function useParents() {
  return useQuery({
    queryKey: queryKeys.parents.lists(),
    queryFn: parentService.getAllParents,
  });
}

/**
 * Hook untuk get parent by ID
 */
export function useParent(id: string) {
  return useQuery({
    queryKey: queryKeys.parents.detail(id),
    queryFn: () => parentService.getParentById(id),
    enabled: !!id,
  });
}

// ============ MUTATIONS ============

/**
 * Hook untuk update parent
 */
export function useUpdateParent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<IParent>) => parentService.updateParent(data),
    onSuccess: (updatedParent) => {
      // Invalidate parents list
      queryClient.invalidateQueries({ queryKey: queryKeys.parents.all });
      // Update specific parent cache
      queryClient.setQueryData(
        queryKeys.parents.detail(updatedParent._id),
        updatedParent
      );
      // Invalidate current user if it's the same parent
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.currentUser() });
    },
  });
}

/**
 * Hook untuk delete parent
 */
export function useDeleteParent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => parentService.deleteParent(id),
    onSuccess: () => {
      // Invalidate parents list
      queryClient.invalidateQueries({ queryKey: queryKeys.parents.all });
    },
  });
}
