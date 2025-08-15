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
  });

  return { isLoading, requestTypes, error };
}
