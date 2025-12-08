import { useQuery } from "@tanstack/react-query";
import type { User4 } from "@/types/user";
import { getAllUsers } from "@/services/apiUser";

export function useAllUsers() {
  const {
    isLoading,
    data: users = [],
    error,
  } = useQuery<User4[], Error>({
    queryKey: ["allUsers"],
    queryFn: getAllUsers,
  });

  return { isLoading, users, error };
}
