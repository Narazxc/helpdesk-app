import { API_URL } from "@/config";
import type { ApiResponse } from "@/types/api";
import type { User } from "@/types/user";
import { api } from "./axios";

// Get all request types
export async function getUsers(): Promise<User[]> {
  try {
    const res = await api.get<ApiResponse<User[]>>(`${API_URL}/users/active`);

    console.log("Users data: ", res.data.data);
    return res.data.data;
  } catch (err) {
    console.error("Failed to fetch request types:", err);
    throw err;
  }
}

// // Get all request types
// export async function getRequestTypes(): Promise<RequestType[]> {
//   try {
//     const res = await api.get<ApiResponse<RequestType[]>>(
//       `${API_URL}/request-types/active`
//     );

//     // console.log(res.data);

//     return res.data.data;
//   } catch (err) {
//     console.error("Failed to fetch request types:", err);
//     throw err;
//   }
// }
