// services/apiTasks.ts
import { api } from "./axios";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// for getting request type
export interface RequestType {
  reqTypeName: number;
  reqTypeDescription: string;
}

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

// get request type
export async function getRequestTypes(): Promise<RequestType[]> {
  try {
    const res = await api.get<RequestType[]>(
      "/api/v1/{request type}?_limit=10"
    );

    return res.data;
  } catch (err) {
    console.error("Failed to fetch posts:", err);
    throw err; // Let React Query or caller handle the error
  }
}

// post request type
export async function createRequestType(): Promise<RequestType> {
  try {
    const res = await api.post<RequestType>("/api/v1/{request type}");

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
