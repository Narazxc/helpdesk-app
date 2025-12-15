import { useMutation } from "@tanstack/react-query";
import { resetPassword as resetPasswordApi } from "@/services/apiAuth";
import type { ResetPassword } from "@/types/auth";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { tokenManager } from "./tokenManager";

export interface ApiErrorResponse {
  data: null;
  error: null;
  message: string;
  status: number;
  success: boolean;
  timestamp: string;
}

export default function useResetPassword() {
  const { mutate: resetPassword, isPending: isLoading } = useMutation({
    // mutationFn: resetPasswordApi,
    mutationFn: (data: ResetPassword) => resetPasswordApi(data), // Type it explicitly
    onSuccess: (data) => {
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
    resetPassword,
    isLoading,
  };
}
