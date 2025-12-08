import { useMutation } from "@tanstack/react-query";
import { changePassword as changePasswordApi } from "@/services/apiAuth";

export default function useChangePassword() {
  const { mutate: changePassword, isPending: isLoading } = useMutation({
    mutationFn: changePasswordApi,
    onSuccess: () => {},
    onError: (err) => {
      console.log(err);
    },
  });

  return {
    changePassword,
    isLoading,
  };
}
