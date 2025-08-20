import { useQuery } from "@tanstack/react-query";
import { getRequestType } from "../../services/apiRequestType";
import type { RequestType } from "@/types/request-type";

export function useRequestTypeById(id: string) {
  const {
    data: requestType,
    isPending: isLoading,
    error,
  } = useQuery<RequestType, Error>({
    queryKey: ["requestType", id],
    queryFn: () => getRequestType(id),
  });

  return { requestType, isLoading, error };
}
