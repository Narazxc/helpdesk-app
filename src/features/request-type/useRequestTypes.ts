import { useQuery } from "@tanstack/react-query";
import { getRequestTypes } from "../../services/apiRequestType";
import type { RequestType } from "@/types/request-type";

export function useRequestTypes() {
  const {
    isLoading,
    data: requestTypes = [],
    error,
  } = useQuery<RequestType[], Error>({
    queryKey: ["requestTypes"],
    queryFn: getRequestTypes,
    // staleTime: 30 * 60 * 1000, // 30 minutes fresh
    // gcTime: 60 * 60 * 1000, // 1 hour in cache
    // refetchOnWindowFocus: false, // Don't refetch on window focus
    // refetchOnMount: false, // Don't refetch on component mount if data exists
  });

  return { isLoading, requestTypes, error };
}
