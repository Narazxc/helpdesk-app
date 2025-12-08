import { useMutation } from "@tanstack/react-query";
import { resetPassword as resetPasswordApi } from "@/services/apiAuth";
import type { ResetPassword } from "@/types/auth";

export default function useResetPassword() {
  const { mutate: resetPassword, isPending: isLoading } = useMutation({
    // mutationFn: resetPasswordApi,
    mutationFn: (data: ResetPassword) => resetPasswordApi(data), // Type it explicitly
    onSuccess: () => {},
    onError: (err) => {
      console.log(err);
    },
  });

  return {
    resetPassword,
    isLoading,
  };
}
