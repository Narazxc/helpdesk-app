import { api } from "./axios";
import type { ApiResponse } from "@/types/api";
import { API_URL } from "@/config";
import type { AgentGroup } from "@/types/agent-group";

// Get all agent groups
export async function getAgentGroups(): Promise<AgentGroup[]> {
  try {
    const res = await api.get<ApiResponse<AgentGroup[]>>(
      `${API_URL}/agent-groups/active`
    );

    console.log(`Agent groups data`, res.data.data);

    return res.data.data;
  } catch (err) {
    console.error("Failed to fetch request types:", err);
    throw err;
  }
}
