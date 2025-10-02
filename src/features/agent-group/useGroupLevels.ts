import { useQuery } from "@tanstack/react-query";
import { getAllGroupLevels } from "@/services/apiAgentGroup";
import type { GroupLevel } from "@/types/group-level";

export function useGroupLevels() {
  const {
    isLoading,
    data: groupLevels = [],
    error,
  } = useQuery<GroupLevel[], Error>({
    queryKey: ["groupLevels"],
    queryFn: getAllGroupLevels,
  });

  return { isLoading, groupLevels, error };
}
