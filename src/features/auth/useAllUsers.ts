import { useQuery } from "@tanstack/react-query";
import type { User } from "@/types/user";
import { getUsers } from "@/services/apiUser";

export default function useAllUsers() {
  const {
    isLoading,
    data: users = [],
    error,
  } = useQuery<User[], Error>({
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
