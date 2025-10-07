import { API_URL } from "@/config";
import { api } from "./axios";
import type { ApiResponse } from "@/types/api";
import type { Entity2 } from "@/types/entity";

// Get all request types
export async function getEntities(): Promise<Entity2[]> {
  try {
    const res = await api.get<ApiResponse<Entity2[]>>(
      // `${API_URL}/operating-units/active` // old
      `${API_URL}/master-data/ordered`
    );

    //

    console.log(res.data.data);

    return res.data.data;
  } catch (err) {
    console.error("Failed to fetch request types:", err);
    throw err;
  }
}
