import { getOfficeGroup } from "@/services/apiOfficeGroup";
import type { OfficeGroup } from "@/types/office-group";
import { useQuery } from "@tanstack/react-query";

export function useOfficeGroupById(id: string) {
  const {
    data: officeGroup,
    isPending: isLoading,
    error,
  } = useQuery<OfficeGroup, Error>({
    queryKey: ["officeGroup", id],
    queryFn: () => getOfficeGroup(id),
  });

  return { officeGroup, isLoading, error };
}
