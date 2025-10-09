import { useQuery } from "@tanstack/react-query";
import type { Role } from "@/types/role";
import { getRole } from "@/services/apiRole";

export function useRoleById(id: string) {
  const {
    data: role,
    isPending: isLoading,
    error,
  } = useQuery<Role, Error>({
    queryKey: ["role", id],
    queryFn: () => getRole(id),
    enabled: !!id,
  });

  return { role, isLoading, error };
}
