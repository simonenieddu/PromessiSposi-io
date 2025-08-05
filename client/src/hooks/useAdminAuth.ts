import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export function useAdminAuth() {
  const { data: adminUser, isLoading, error } = useQuery({
    queryKey: ["/api/admin/me"],
    retry: false,
    refetchOnWindowFocus: false,
  });

  return {
    adminUser,
    isLoading,
    isAuthenticated: !!adminUser && !error,
    error,
  };
}