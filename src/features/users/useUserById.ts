import { getUserById } from "@/services/apiUser";
import type { User4 } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

export function useGetUserById(id: string) {
  const {
    isPending: isLoading,
    data: user,
    error,
  } = useQuery<User4, Error>({
    queryKey: ["user", id],
    queryFn: () => getUserById(id),
  });

  return { isLoading, user, error };
}
