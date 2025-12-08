import {
  useMutation,
  // useQueryClient
} from "@tanstack/react-query";
import type { AxiosError } from "axios";
// import toast from "react-hot-toast";
import { forgotPassword as forgotPasswordApi } from "@/services/apiAuth";
import toast from "react-hot-toast";

export function useForgotPassword() {
  //   const queryClient = useQueryClient();

  const { mutate: forgotPassword, isPending: isLoading } = useMutation({
    mutationFn: forgotPasswordApi,
    onSuccess: () => {
      // toast.success("sent successfully");
      //   queryClient.invalidateQueries({ queryKey: ["categoryTypes"] });
    },

    onError: (error: AxiosError) => {
      if (error.response && error.response.data) {
        const errorData = error.response.data as { message: string };
        toast.error(errorData.message);
      }

      console.error(
        "Error forgot password:",
        error.response?.data || error.message
      );
    },
  });

  return { forgotPassword, isLoading };
}
