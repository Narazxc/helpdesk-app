import { useQuery } from "@tanstack/react-query";
import type { User4 } from "@/types/user";
import { getUsers } from "@/services/apiUser";

export function useAllUsers() {
  const {
    isLoading,
    data: users = [],
    error,
  } = useQuery<User4[], Error>({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  return { isLoading, users, error };
}

// export function useRequestTypes() {
//   const {
//     isLoading,
//     data: requestTypes = [],
//     error,
//   } = useQuery<RequestType[], Error>({
//     queryKey: ["requestTypes"],
//     queryFn: getRequestTypes,
//   });

//   return { isLoading, requestTypes, error };
// }
