import { useQuery } from "@tanstack/react-query";
import type { OfficeGroup } from "@/types/office-group";
import { getOfficeGroups } from "@/services/apiOfficeGroup";

export function useOfficeGroups() {
  const {
    isLoading,
    data: officeGroups = [],
    error,
  } = useQuery<OfficeGroup[], Error>({
    queryKey: ["officeGroups"],
    queryFn: getOfficeGroups,
  });

  return { isLoading, officeGroups, error };
}
