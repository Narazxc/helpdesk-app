import { API_URL } from "@/config";
import { api } from "./axios";
import type { ApiResponse } from "@/types/api";
import type { AssetType, CreateAssetType } from "@/types/asset-type";

// Get all asset types
export async function getAssetTypes(): Promise<AssetType[]> {
  try {
    const res = await api.get<ApiResponse<AssetType[]>>(
      `${API_URL}/asset-types/active`
    );

    // console.log(res.data);

    return res.data.data;
  } catch (err) {
    console.error("Failed to fetch asset types:", err);
    throw err;
  }
}

// // Get asset type by id (old)
// export async function getAssetType(id: string): Promise<AssetType> {
//   try {
//     const res = await api.get<ApiResponse<AssetType>>(
//       `${API_URL}/asset-types/get-by-id/${id}`
//     );

//     // console.log(res.data);

//     return res.data.data;
//   } catch (err) {
//     console.error("Failed to fetch asset types:", err);
//     throw err;
//   }
// }

// /category-types/get-category-by-id/
// Get category type by id (new)
export async function getAssetType(id: string): Promise<AssetType> {
  try {
    const res = await api.get<ApiResponse<AssetType>>(
      `${API_URL}/asset-types/get-asset-type-by-id/${id}`
    );

    console.log("In get detail asset type", res.data.data);

    // Extract object from array
    return res.data.data;
  } catch (err) {
    console.error("Failed to fetch category types:", err);
    throw err;
  }
}

// Create asset type
export async function createAssetType(
  newAssetTypeData: CreateAssetType
): Promise<AssetType> {
  try {
    const res = await api.post<AssetType>(
      `${API_URL}/asset-types/create`,
      newAssetTypeData
    );

    console.log(res.data);

    return res.data;
  } catch (err) {
    console.error("Failed to fetch posts:", err);
    throw err; // Let React Query or caller handle the error
  }
}

// Update asset type
export async function updateAssetType(
  newAssetTypeData: CreateAssetType,
  id: string
): Promise<AssetType> {
  try {
    // console.log(updateData, id);
    const res = await api.put<AssetType>(
      `${API_URL}/asset-types/update-name/${id}`,
      newAssetTypeData
    );

    console.log(res.data);
    return res.data;
  } catch (err) {
    console.error("Failed to update: ", err);
    throw err; // Let React Query or caller handle the error
  }
}

// Delete asset type
export async function deleteAssetType(id: string) {
  try {
    const res = await api.delete<AssetType>(
      `${API_URL}/asset-types/delete/${id}`
    );

    console.log(res.data);

    return res.data;
  } catch (err) {
    console.error("Failed to delete: ", err);
    throw err; // Let React Query or caller handle the error
  }
}

// Get category by request type code
export async function getAssetTypesByCategoryTypeCode(
  categoryTypeCode: string
) {
  try {
    // if (categoryTypeCode) {
    //helpdesk-dev.fmis.gov.kh:448/api/v1/asset-types/active?categoryTypeCode=CAT_20250818_d0237d56

    const res = await api.get<ApiResponse<AssetType[]>>(
      `${API_URL}/asset-types/active?categoryTypeCode=${categoryTypeCode}`
    );

    return res.data.data;
    // } else {
    //   return null;
    // }
  } catch (err) {
    console.error("Failed to delete: ", err);
    throw err; // Let React Query or caller handle the error
  }
}
