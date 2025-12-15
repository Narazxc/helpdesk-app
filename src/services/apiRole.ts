import type { CreateRole, Role } from "@/types/role";
import { api } from "./axios";
import { API_URL } from "@/config";
import type { ApiResponse } from "@/types/api";

export async function getRoles(): Promise<Role[]> {
  try {
    const res = await api.get<ApiResponse<Role[]>>(`${API_URL}/roles/active`);

    console.log("roles", res.data.data);
    return res.data.data;
  } catch (err) {
    console.error("Failed to fetch posts:", err);
    throw err;
  }
}

export async function getRole(id: string): Promise<Role> {
  try {
    const res = await api.get<ApiResponse<Role>>(
      `${API_URL}/roles/detail/${id}`
    );

    console.log(`Role detail ${id}`, res.data.data);

    return res.data.data;
  } catch (err) {
    console.error("Failed to fetch posts:", err);
    throw err;
  }
}

// Create request type
export async function createRole(newRole: CreateRole): Promise<Role> {
  try {
    const res = await api.post<Role>(`${API_URL}/roles/create`, newRole);

    return res.data;
  } catch (err) {
    console.error("Failed to fetch posts:", err);
    throw err; // Let React Query or caller handle the error
  }
}

// Create request type
export async function deleteRole(roleId: string) {
  try {
    const res = await api.delete<Role>(`${API_URL}/roles/delete/${roleId}`);

    return res.data;
  } catch (err) {
    console.error("Failed to fetch posts:", err);
    throw err; // Let React Query or caller handle the error
  }
}

// Update category type
export async function updateRole(
  newRoleData: CreateRole,
  id: string
): Promise<Role> {
  try {
    // console.log(updateData, id);
    const res = await api.put<Role>(
      `${API_URL}/roles/update/${id}`,
      newRoleData
    );

    console.log(res.data);
    return res.data;
  } catch (err) {
    console.error("Failed to update: ", err);
    throw err; // Let React Query or caller handle the error
  }
}

// export async function deleteCategoryType(categoryTypeCode: string) {
//   try {
//     const res = await api.delete<CategoryType>(
//       `${API_URL}/category-types/delete-by-code/${categoryTypeCode}`
//     );

//     return res.data;
//   } catch (err) {
//     console.error("Failed to delete: ", err);
//     throw err; // Let React Query or caller handle the error
//   }
// }
