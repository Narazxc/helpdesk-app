import { useQuery } from "@tanstack/react-query";
import type { Permission } from "@/types/permission";
import { getPermissions } from "@/services/apiPermission";

export function usePermissions() {
  const {
    isLoading,
    data: permissions = [],
    error,
  } = useQuery<Permission[], Error>({
    queryKey: ["permissions"],
    queryFn: getPermissions,
  });

  return { isLoading, permissions, error };
}
