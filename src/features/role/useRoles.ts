import { getRoles } from "@/services/apiRole";
import type { Role } from "@/types/role";
import { useQuery } from "@tanstack/react-query";

export function useRoles() {
  const {
    isLoading,
    data: roles = [],
    error,
  } = useQuery<Role[], Error>({
    queryKey: ["roles"],
    queryFn: getRoles,
  });

  return { isLoading, roles, error };
}
