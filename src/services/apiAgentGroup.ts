import { api } from "./axios";
import type { ApiResponse } from "@/types/api";
import { API_URL } from "@/config";
import type {
  AgentGroup,
  // CreateAgentGroup,
  CreateAgentGroup2,
  UpdateAgentGroup,
} from "@/types/agent-group";
import type { GroupLevel } from "@/types/group-level";

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

export async function getAgentGroup(id: string): Promise<AgentGroup> {
  try {
    const res = await api.get<ApiResponse<AgentGroup>>(
      `${API_URL}/agent-groups/get-agent-detail/${id}`
    );

    console.log(`Agent groups data`, res.data.data);

    return res.data.data;
  } catch (err) {
    console.error(err);
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

// Create request type
export async function createAgentGroup(
  newAgentGroup: CreateAgentGroup2
): Promise<AgentGroup> {
  try {
    const res = await api.post<AgentGroup>(
      `${API_URL}/agent-groups/create`,
      newAgentGroup
    );

    //  {
    //   agentName: "amnsamcnmac",
    //   groupLevel: "GLC_20250828_84d34635",
    //   leaderCode: "USR_20250916_f03ff5a4", // Leader code ohd
    //   memberCodes: ["USR_20250917_70672cb1"],
    //   officeGroupCode: "OFF_20250917_316a3ffb",
    // }

    return res.data;
  } catch (err) {
    console.error("Failed to fetch posts:", err);
    throw err; // Let React Query or caller handle the error
  }
}

// // Create request type
// export async function createAgentGroup(
//   newAgentGroup: CreateAgentGroup2
// ): Promise<AgentGroup> {
//   try {
//     // const res = await api.post<AgentGroup>(`${API_URL}/agent-groups/create`, {
//     //   agentName: "amnsamcnmac",
//     //   groupLevel: "GLC_20250828_84d34635",
//     //   leaderCode: "USR_20250917_f4260e8b",
//     //   memberCodes: ["USR_20250917_70672cb1"],
//     //   officeGroupCode: "OFF_20250917_316a3ffb",
//     // });

//     console.log("in createAgentGroupAPI", newAgentGroup);

//     // agentName: "amnsamcnmac";
//     // groupLevel: "GLC_20250828_84d34635";
//     // leaderCode: "USR_20250917_0360cd94";
//     // memberCodes: (2)[("USR_20250917_70672cb1", "USR_20250917_f4260e8b")];
//     // officeGroupCode: "OFF_20250917_316a3ffb";

//     // console.log(res.data);

//     // return res.data;
//   } catch (err) {
//     console.error("Failed to fetch posts:", err);
//     throw err; // Let React Query or caller handle the error
//   }
// }

export async function deleteAgentGroup(id: string) {
  // api/v1/agent-groups/delete/{id}

  try {
    const res = await api.delete<AgentGroup>(
      `${API_URL}/agent-groups/delete/${id}`
    );
    return res.data;
  } catch (err) {
    console.error("Failed to delete: ", err);
    throw err; // Let React Query or caller handle the error
  }
}

export async function updateAgentGroup(
  newAgentGroupData: UpdateAgentGroup,
  id: string
): Promise<AgentGroup> {
  // ;
  // Promise<void>
  console.log("id", id);
  console.log("newAgentGroupData", newAgentGroupData);

  try {
    const res = await api.put<AgentGroup>(
      `${API_URL}/agent-groups/update-name/${id}`,
      newAgentGroupData
      // {
      //   agentName: "AR123",
      //   groupLevel: "GLC_20250828_bb1edf8b",
      //   officeGroupCode: "OFF_20250919_5a19dd09",
      //   // leaderCode: "USR_20250916_2215032c",
      //   leaderCode: "123123",
      //   memberCodes: ["USR_20250917_0360cd94", "USR_20250916_6b74a25b"],
      // }
    );

    console.log(res.data);
    return res.data;
  } catch (err) {
    console.error("Failed to update: ", err);
    throw err;
  }
}

// // Update request type
// export async function updateOfficeGroup(
//   newOfficeGroupData: CreateOfficeGroup,
//   id: string
// ): Promise<OfficeGroup> {
//   try {
//     const res = await api.put<OfficeGroup>(
//       `${API_URL}/office-groups/update-name/${id}`,
//       newOfficeGroupData
//     );

//     console.log(res.data);
//     return res.data;
//   } catch (err) {
//     console.error("Failed to fetch posts:", err);
//     throw err; // Let React Query or caller handle the error
//   }
// }

// GROUP LEVEL

// Get all group levels
export async function getAllGroupLevels(): Promise<GroupLevel[]> {
  try {
    const res = await api.get<ApiResponse<GroupLevel[]>>(
      `${API_URL}/group-levels/active`
    );

    // console.log(`Group levels data`, res.data.data);

    return res.data.data;
  } catch (err) {
    console.error("Failed to fetch request types:", err);
    throw err;
  }
}
