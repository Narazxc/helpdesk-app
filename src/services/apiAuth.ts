import type {
  AdminResetPassword,
  CurrentUser,
  LoginCredential,
  LoginResponse,
} from "@/types/auth";
import type { ApiResponse } from "@/types/api";
import { api } from "./axios";
import { API_URL } from "@/config";
import axios from "axios";

const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

export async function login({ userId, password }: LoginCredential) {
  //   const { data, error } = await supabase.auth.signInWithPassword({
  //     email,
  //     password,
  //   });

  //   if (error) throw new Error(error.message);

  //   return data;

  try {
    const res = await axiosInstance.post<ApiResponse<LoginResponse>>(
      `${API_URL}/auth/login`,
      {
        userId,
        password,
      },
      { withCredentials: true }
      // {
      //   userId: "vanny.phoung",
      //   password: "Fmis@2024",
      // }
    );

    console.log("in apiAuth | login method", res.data.data);

    // Get object from array
    return res.data.data;
  } catch (err) {
    console.error("Something when wrong:", err);
    throw err;
  }
}

// Example
// export async function getCategoryType(id: string): Promise<CategoryType> {
//   try {
//     const res = await api.get<ApiResponse<CategoryType>>(
//       `${API_URL}/category-types/get-category-by-id/${id}`
//     );

//     // Get object from array
//     return res.data.data;
//   } catch (err) {
//     console.error("Failed to fetch category types:", err);
//     throw err;
//   }
// }

// Example
// // Create category type
// export async function createCategoryType(
//   newCategoryType: CreateCategoryType
// ): Promise<CategoryType> {
//   try {
//     const res = await api.post<CategoryType>(
//       `${API_URL}/category-types/create`,
//       newCategoryType
//     );

//     // console.log(res.data);

//     return res.data;
//   } catch (err) {
//     console.error("Failed to fetch posts:", err);
//     throw err; // Let React Query or caller handle the error
//   }
// }

export async function logout() {
  try {
    const res = await axiosInstance.post<ApiResponse<LoginResponse>>(
      `${API_URL}/auth/logout`,
      {},
      { withCredentials: true }
    );

    console.log("in apiAuth | logout method", res.data.data);

    // Get object from array
    return res.data.data;
  } catch (err) {
    console.error("Something when wrong:", err);
    throw err;
  }
}

export async function me() {
  try {
    const res = await api.get<ApiResponse<CurrentUser>>(`${API_URL}/auth/me`);

    console.log("in apiAuth | me method", res.data.data);

    // Get object from array
    return res.data.data;
  } catch (err) {
    console.error("Something when wrong:", err);
    throw err;
  }
}

// Not working properly yet in public api (dev)
export async function refreshToken() {
  try {
    const res = await axiosInstance.post<ApiResponse<LoginResponse>>(
      `${API_URL}/auth/refresh-token`,
      // {
      //   refreshToken:
      //     "eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJGTUlTIEhlbHBkZXNrIFN5c3RlbSIsImF1ZCI6IkhlbHBkZXNrIFVzZXJzIiwic3ViIjoic3VwZXIuYWRtaW4iLCJ0b2tlbl92ZXJzaW9uIjowLCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNzYyOTIxODc0LCJleHAiOjE3NjM1MjY2NzR9.VvMlOZGiOkjl1GMWzDpXu_7NTbedj7JnzDulr-eFBJj0K4RxC4pM8TOolZECfPXBcS0mNS6BiowZDvMc9nVeAQ",
      // }
      {},
      { withCredentials: true }
    );

    console.log("in apiAuth | refreshToken method", res.data.data);

    // Get object from array
    return res.data.data;
  } catch (err) {
    console.error("Something when wrong:", err);
    throw err;
  }
}

export async function unlockUser(userId: string) {
  try {
    const res = await api.put<ApiResponse<void>>(
      `${API_URL}/users/unlock/${userId}`,
      {},
      { withCredentials: true }
    );

    console.log("in apiAuth | unlockUser method", res.data.data);

    // Get object from array
    return res.data.data;
  } catch (err) {
    console.error("Something when wrong:", err);
    throw err;
  }
}

export async function adminResetPassword(
  userId: string,
  { newPassword, confirmPassword }: AdminResetPassword
) {
  console.log("in apiAuth | adminResetPassword reached");

  try {
    const res = await api.put<ApiResponse<AdminResetPassword>>(
      `${API_URL}/users/change-password/${userId}`,
      {
        newPassword,
        confirmPassword,
      },
      { withCredentials: true }
    );

    console.log("in apiAuth | adminResetPassword method", res.data.data);

    // Get object from array
    return res.data.data;
  } catch (err) {
    console.error("Something when wrong:", err);
    throw err;
  }
}
