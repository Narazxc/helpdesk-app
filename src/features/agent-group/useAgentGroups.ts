import { useQuery } from "@tanstack/react-query";
import { getRequestTypes } from "../../services/apiRequestType";
// import type { RequestType } from "@/types/request-type";
import type { AgentGroup } from "@/types/agent-group";
import { getAgentGroups } from "@/services/apiAgentGroup";

export function useAgentGroups() {
  const {
    isLoading,
    data: agentGroups = [],
    error,
  } = useQuery<AgentGroup[], Error>({
    queryKey: ["agentGroups"],
    queryFn: getAgentGroups,
  });

  return { isLoading, agentGroups, error };
}
