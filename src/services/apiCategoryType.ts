import { API_URL } from "@/config";
import type { CategoryType, CreateCategoryType } from "@/types/category-type";
import { api } from "./axios";
import type { ApiResponse } from "@/types/api";

// Get all category types
export async function getCategoryTypes(): Promise<CategoryType[]> {
  try {
    const res = await api.get<ApiResponse<CategoryType[]>>(
      `${API_URL}/category-types/active`
    );

    console.log(res.data);

    return res.data.data;
  } catch (err) {
    console.error("Failed to fetch category types:", err);
    throw err;
  }
}

// Get category type by id
export async function getCategoryType(id: string): Promise<CategoryType> {
  try {
    const res = await api.get<ApiResponse<CategoryType>>(
      `${API_URL}/category-types/get-by-id/${id}`
    );

    // console.log(res.data);

    return res.data.data;
  } catch (err) {
    console.error("Failed to fetch category types:", err);
    throw err;
  }
}

// Create category type
export async function createCategoryType(
  newCategoryType: CreateCategoryType
): Promise<CategoryType> {
  try {
    const res = await api.post<CategoryType>(
      `${API_URL}/category-types/create`,
      newCategoryType
    );

    console.log(res.data);

    return res.data;
  } catch (err) {
    console.error("Failed to fetch posts:", err);
    throw err; // Let React Query or caller handle the error
  }
}

// Update category type
export async function updateCategoryType(
  newCategoryTypeData: CreateCategoryType,
  id: string
): Promise<CategoryType> {
  try {
    // console.log(updateData, id);
    const res = await api.put<CategoryType>(
      `${API_URL}/category-types/update-name/${id}`,
      newCategoryTypeData
    );

    console.log(res.data);
    return res.data;
  } catch (err) {
    console.error("Failed to update: ", err);
    throw err; // Let React Query or caller handle the error
  }
}

// Delete category type
export async function deleteCategoryType(id: string) {
  try {
    const res = await api.delete<CategoryType>(
      `${API_URL}/category-types/delete/${id}`
    );

    console.log(res.data);

    return res.data;
  } catch (err) {
    console.error("Failed to delete: ", err);
    throw err; // Let React Query or caller handle the error
  }
}
