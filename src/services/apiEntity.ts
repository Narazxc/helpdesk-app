import { API_URL } from "@/config";
import { api } from "./axios";
import type { ApiResponse } from "@/types/api";
import type { Entity } from "@/types/entity";

// Get all request types
export async function getEntities(): Promise<Entity[]> {
  try {
    const res = await api.get<ApiResponse<Entity[]>>(
      `${API_URL}/operating-units`
    );

    console.log(res.data.data);

    return res.data.data;
  } catch (err) {
    console.error("Failed to fetch request types:", err);
    throw err;
  }
}
