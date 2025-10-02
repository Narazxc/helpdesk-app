import { getAgentGroup } from "@/services/apiAgentGroup";
import type { AgentGroup } from "@/types/agent-group";
import { useQuery } from "@tanstack/react-query";

export function useAgentGroupById(id: string) {
  const {
    data: agentGroup,
    isPending: isLoading,
    error,
  } = useQuery<AgentGroup, Error>({
    queryKey: ["agentGroup", id],
    queryFn: () => getAgentGroup(id),
  });

  return { agentGroup, isLoading, error };
}
