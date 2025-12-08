import { useQuery } from "@tanstack/react-query";
import type { User4 } from "@/types/user";
import { getUsers } from "@/services/apiUser";

export function useAllActiveUsers() {
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

//////////////////////////////////////////////////////////////

// export const useItems = (status = "all") => {
//   return useQuery({
//     queryKey: ["items", status], // Important: include status in queryKey
//     queryFn: async () => {
//       const endpoint =
//         status === "inactive" ? "/api/items/inactive" : "/api/items";

//       const response = await fetch(endpoint);
//       if (!response.ok) throw new Error("Failed to fetch");
//       return response.json();
//     },
//     staleTime: 5 * 60 * 1000, // optional: cache for 5 minutes
//   });
// };
