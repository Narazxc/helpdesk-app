import { API_URL } from "@/config";
import { api } from "./axios";
import type { CreateTicket } from "@/types/ticket";

export async function getTickets() {
  try {
    const res = await api.get(`${API_URL}/tickets`);

    console.log("fetch success & ticket hook works");
    console.log("ticket", res.data);

    return res.data.data;
  } catch (err) {
    console.error("Failed to fetch category types:", err);
    throw err;
  }
}

export async function createTicket(newTicket: FormData) {
  try {
    const res = await api.post<CreateTicket>(`${API_URL}/tickets`, newTicket, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.error("Failed to fetch posts:", err);
    throw err; // Let React Query or caller handle the error
  }
}
