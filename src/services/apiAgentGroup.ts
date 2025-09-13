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

export async function getAgentGroupsByOfficeGroupCode(officeGroupCode: string) {
  try {
    if (officeGroupCode) {
      const res = await api.get<ApiResponse<AgentGroup[]>>(
        `${API_URL}/agent-groups/active?officeGroupCode=${officeGroupCode}`
      );

      console.log("office group code: ", res.data.data);

      return res.data.data;
    } else {
      return null;
    }
  } catch (err) {
    console.error("Failed to fetch agent groups by office group code: ", err);
    throw err;
  }
}

// // Get category by request type code
// export async function getCategoryByRequestTypeCode(requestTypeCode: string) {
//   try {
//     if (requestTypeCode) {
//       const res = await api.get<ApiResponse<CategoryType[]>>(
//         `${API_URL}/category-types/active?requestTypeCode=${requestTypeCode}`
//       );

//       return res.data.data;
//     } else {
//       return null;
//     }
//   } catch (err) {
//     console.error("Failed to delete: ", err);
//     throw err; // Let React Query or caller handle the error
//   }
// }
