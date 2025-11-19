import type { CreateRequestType, RequestType } from "@/types/request-type";
import { api } from "./axios";
import type { ApiResponse } from "@/types/api";
import { API_URL } from "@/config";

// Examples
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// Examples
export async function getPosts(): Promise<Post[]> {
  try {
    const res = await api.get<Post[]>("/posts?_limit=10");

    // console.log(res.data);
    return res.data;
  } catch (err) {
    console.error("Failed to fetch posts:", err);
    throw err; // Let React Query or caller handle the error
  }
}

// // Fetch all posts
// export const getAllPosts = async (): Promise<Post[]> => {
//   const response = await api.get("/posts");
//   return response.data;
// };

// Get all request types
export async function getRequestTypes(): Promise<RequestType[]> {
  try {
    const res = await api.get<ApiResponse<RequestType[]>>(
      `${API_URL}/request-types/active`
    );

    console.log("getRequestTypes: ", res.data.data);

    return res.data.data;
  } catch (err) {
    console.error("Failed to fetch request types:", err);
    throw err;
  }
}

// Get request type by id
export async function getRequestType(id: string): Promise<RequestType> {
  try {
    const res = await api.get<ApiResponse<RequestType>>(
      `${API_URL}/request-types/get-by-id/${id}`
    );

    // console.log(res.data);

    return res.data.data;
  } catch (err) {
    console.error("Failed to fetch request types:", err);
    throw err;
  }
}

// Create request type
export async function createRequestType(
  newRequestType: CreateRequestType
): Promise<RequestType> {
  try {
    const res = await api.post<RequestType>(
      `${API_URL}/request-types/create`,
      newRequestType
    );

    console.log(res.data);

    return res.data;
  } catch (err) {
    console.error("Failed to fetch posts:", err);
    throw err; // Let React Query or caller handle the error
  }
}

// Update request type
export async function updateRequestType(
  newRequestTypeData: CreateRequestType,
  id: string
): Promise<RequestType> {
  try {
    // console.log(updateData, id);
    const res = await api.put<RequestType>(
      `${API_URL}/request-types/update-name/${id}`,
      newRequestTypeData
    );

    console.log(res.data);
    return res.data;
  } catch (err) {
    console.error("Failed to fetch posts:", err);
    throw err; // Let React Query or caller handle the error
  }
}

// OLD: Delete request type
// export async function deleteRequestType(id: string) {
//   try {
//     const res = await api.delete<RequestType>(
//       `${API_URL}/request-types/delete/${id}`
//     );

//     console.log(res.data);

//     return res.data;
//   } catch (err) {
//     console.error("Failed to fetch posts:", err);
//     throw err; // Let React Query or caller handle the error
//   }
// }

// NEW: Delete request type
export async function deleteRequestType(requestTypeCode: string) {
  try {
    const res = await api.delete<RequestType>(
      `${API_URL}/request-types/delete-by-code/${requestTypeCode}`
    );

    console.log(`${API_URL}/request-types/delete-by-code/${requestTypeCode}`);

    console.log(res.data);

    return res.data;
  } catch (err) {
    console.error("Failed to fetch posts:", err);
    throw err; // Let React Query or caller handle the error
  }
}

// Examples
// // Create a task
// export const createTask = async (data: Partial<Task>): Promise<Task> => {
//   const response = await api.post("/tasks", data);
//   return response.data;
// };

// // Delete a task
// export const deleteTask = async (id: number): Promise<void> => {
//   await api.delete(`/tasks/${id}`);
// };
