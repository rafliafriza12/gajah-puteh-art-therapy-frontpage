/**
 * useUsers Hook
 * Hook untuk mengelola data users (placeholder - belum diimplementasikan)
 */

import { useQuery } from "@tanstack/react-query";

// User type definition
export interface User {
  id: string;
  fullname: string;
  email: string;
  username: string;
  isActive: boolean;
  role: string;
  lastOnline: string;
  profilePictureUrl?: string;
  createdAt: string;
  updatedAt: string;
}

interface UsersResponse {
  users: User[];
  total: number;
}

// Placeholder hook - returns empty data
export const useUsers = () => {
  return useQuery<UsersResponse>({
    queryKey: ["users"],
    queryFn: async () => {
      // TODO: Implement when backend endpoint is ready
      return {
        users: [],
        total: 0,
      };
    },
    enabled: false, // Disabled until backend is implemented
  });
};
