import type { ApiResponse } from "@/types/api";
import { api } from "./axios";
import type { Permission } from "@/types/permission";
import { API_URL } from "@/config";

// Promise<void>
// Get all permissions
export async function getPermissions(): Promise<Permission[]> {
  try {
    const res = await api.get<ApiResponse<Permission[]>>(
      `${API_URL}/permissions`
    );

    // console.log(res.data);

    return res.data.data;
  } catch (err) {
    console.error("Failed to fetch request types:", err);
    throw err;
  }
}
