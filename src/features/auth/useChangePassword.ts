import { useMutation } from "@tanstack/react-query";
import { changePassword as changePasswordApi } from "@/services/apiAuth";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import { tokenManager } from "./tokenManager";

export interface ApiErrorResponse {
  data: null;
  error: null;
  message: string;
  status: number;
  success: boolean;
  timestamp: string;
}

export default function useChangePassword() {
  const { mutate: changePassword, isPending: isLoading } = useMutation({
    mutationFn: changePasswordApi,
    onSuccess: (data) => {
      console.log("useChangePassword", data);
      tokenManager.setAccessToken(data.accessToken);
    },
    onError: (err: AxiosError<ApiErrorResponse>) => {
      // Extract the error message from the response
      const errorMessage = err?.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
      console.log(err);
    },
  });

  return {
    changePassword,
    isLoading,
  };
}
