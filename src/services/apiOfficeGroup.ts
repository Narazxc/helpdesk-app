import { api } from "./axios";
import type { ApiResponse } from "@/types/api";
import { API_URL } from "@/config";
import type { CreateOfficeGroup, OfficeGroup } from "@/types/office-group";

// Get all office groups
export async function getOfficeGroups(): Promise<OfficeGroup[]> {
  try {
    const res = await api.get<ApiResponse<OfficeGroup[]>>(
      `${API_URL}/office-groups/active`
    );

    return res.data.data;
  } catch (err) {
    console.error("Failed to fetch office groups:", err);
    throw err;
  }
}

// Get office group by id
export async function getOfficeGroup(id: string): Promise<OfficeGroup> {
  try {
    const res = await api.get<ApiResponse<OfficeGroup>>(
      `${API_URL}/office-groups/get-office-detail-by-id/${id}`
    );

    console.log("Office group by id", res.data.data);

    return res.data.data;
  } catch (err) {
    console.error("Failed to fetch office group: ", err);
    throw err;
  }
}

// Create office group
export async function createOfficeGroup(
  newOfficeGroup: CreateOfficeGroup
): Promise<OfficeGroup> {
  try {
    const res = await api.post<OfficeGroup>(
      `${API_URL}/office-groups/create`,
      newOfficeGroup
    );

    console.log(res.data);

    return res.data;
  } catch (err) {
    console.error("Failed to fetch posts:", err);
    throw err; // Let React Query or caller handle the error
  }
}

// Update request type
export async function updateOfficeGroup(
  newOfficeGroupData: CreateOfficeGroup,
  id: string
): Promise<OfficeGroup> {
  try {
    const res = await api.put<OfficeGroup>(
      `${API_URL}/office-groups/update-name/${id}`,
      newOfficeGroupData
    );

    console.log(res.data);
    return res.data;
  } catch (err) {
    console.error("Failed to fetch posts:", err);
    throw err; // Let React Query or caller handle the error
  }
}

// Create office group
export async function deleteOfficeGroup(officeId: string) {
  try {
    const res = await api.delete<OfficeGroup>(
      `${API_URL}/office-groups/delete/${officeId}`
    );

    console.log(res.data);

    return res.data;
  } catch (err) {
    console.error("Failed to fetch posts:", err);
    throw err; // Let React Query or caller handle the error
  }
}

// // NEW: Delete request type
// export async function deleteRequestType(requestTypeCode: string) {
//   try {
//     const res = await api.delete<RequestType>(
//       `${API_URL}/request-types/delete-by-code/${requestTypeCode}`
//     );

//     console.log(`${API_URL}/request-types/delete-by-code/${requestTypeCode}`);

//     console.log(res.data);

//     return res.data;
//   } catch (err) {
//     console.error("Failed to fetch posts:", err);
//     throw err; // Let React Query or caller handle the error
//   }
// }
