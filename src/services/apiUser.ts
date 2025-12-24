import { API_URL } from "@/config";
import type { ApiResponse } from "@/types/api";
import type { CreateUser2, User, User4 } from "@/types/user";
import { api } from "./axios";

// Get all users
export async function getAllUsers(): Promise<User4[]> {
  try {
    const res = await api.get<ApiResponse<User4[]>>(`${API_URL}/users`);

    console.log("Users data: ", res.data.data);
    return res.data.data;
  } catch (err) {
    console.error("Failed to fetch all users:", err);
    throw err;
  }
}

// Get all active users
export async function getUsers(): Promise<User4[]> {
  try {
    const res = await api.get<ApiResponse<User4[]>>(`${API_URL}/users/active`);

    console.log("Users data: ", res.data.data);
    return res.data.data;
  } catch (err) {
    console.error("Failed to active users:", err);
    throw err;
  }
}

export async function deleteUser(id: string) {
  try {
    const res = await api.delete<User>(`${API_URL}/users/delete/${id}`);

    return res.data;
  } catch (err) {
    console.error("Failed to delete ", err);
    throw err;
  }
}

// Create user

// const testCreatingUser = {
//   username: "HARD CODE USER",
//   userId: "john.son",
//   telegramId: "1234067",
//   password: "Admin@789",
//   phoneNumber: "010999888",
//   email: "john.son@fmis.gov.kh",
//   businessCode: "BUI20251002_56322774", // assign business or operating unit
//   roleCode: [
//     "ROL_20251008_e72b17cb", // assign Role
//   ],
//   requestTypeCode: [
//     "REQ_20250826_36fcb14c" /* assign request type */,
//     "REQ_20250826_23d2f632",
//     "REQ_20250910_49f57178",
//     "REQ_20250827_b481233e",
//   ],
// };

// const testCreatingUser = {
//   userName: "HARD CODE USER",
//   userId: "john.son1",
//   telegramId: "12340671",
//   password: "Admin@789",
//   phoneNumber: "010999888",
//   email: "john1.son@fmis.gov.kh",
//   businessCode: "BUI20251002_56322774", // assign business or operating unit
//   roleCode: [
//     // "ROL_20251008_e72b17cb", // assign Role
//     "ROL_20251010_ea52faed",
//   ],
//   requestTypeCode: [
//     // "REQ_20250826_36fcb14c" /* assign request type */,
//     // "REQ_20250826_23d2f632",
//     // "REQ_20250910_49f57178",
//     // "REQ_20250827_b481233e",
//     "REQ_20251016_4a639aee",
//   ],
// };

export async function createUser(newUser: CreateUser2): Promise<User> {
  console.log("in createUser method", newUser);

  try {
    const res = await api.post<User>(`${API_URL}/users/create`, newUser);
    // console.log(res.data);
    return res.data;
  } catch (err) {
    console.error("Failed to fetch posts:", err);
    throw err; // Let React Query or caller handle the error
  }
}

export async function updateUser(
  // newUserData: CreateUser,
  newUserData: CreateUser2,
  id: string
): Promise<User> {
  console.log("newUserData", newUserData);
  console.log("id", id);

  try {
    const res = await api.put<User>(
      `${API_URL}/users/update-user/${id}`,
      newUserData
    );
    // console.log(res.data);
    return res.data;
  } catch (err) {
    console.error("Failed to fetch posts:", err);
    throw err; // Let React Query or caller handle the error
  }
}

// get user by id
export async function getUserById(id: string): Promise<User4> {
  try {
    const res = await api.get<ApiResponse<User4>>(
      `${API_URL}/users/get-user-by-id/${id}`
    );

    return res.data.data;
  } catch (error) {
    console.error("Failed to fetch category types:", error);
    throw error;
  }
}

// 20251203
export async function exportUsersCsv(filterStatus: string): Promise<Blob> {
  try {
    const res = await api.get(
      `${API_URL}/users/csv/export?status=${filterStatus}`,
      {
        responseType: "blob",
      }
    );

    console.log("CSV blob:", res.data); // this will log
    return res.data; // return the blob
  } catch (error) {
    console.error("Failed to export user csv:", error);
    throw error;
  }
}

// 20251203
// updated on 20251212
export async function importUsersCsv(file: File) {
  console.log("file in api: ", file);
  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await api.post(`${API_URL}/users/csv/import`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data.data;
  } catch (error) {
    console.error("Failed to import user: ", error);
    throw error;
  }
}

// REFERENCE
// // Update request type
// export async function updateRequestType(
//   newRequestTypeData: CreateRequestType,
//   id: string
// ): Promise<RequestType> {
//   try {
//     // console.log(updateData, id);
//     const res = await api.put<RequestType>(
//       `${API_URL}/request-types/update-name/${id}`,
//       newRequestTypeData
//     );

//     console.log(res.data);
//     return res.data;
//   } catch (err) {
//     console.error("Failed to fetch posts:", err);
//     throw err; // Let React Query or caller handle the error
//   }
// }
