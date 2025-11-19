import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import { createUser as createUserApi } from "@/services/apiUser";

export function useCreateUser() {
  const queryClient = useQueryClient();

  const { mutate: createUser, isPending: isCreating } = useMutation({
    mutationFn: createUserApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },

    onError: (error: AxiosError) => {
      // Option 1: Type the error data
      const errorMessage =
        (error.response?.data as { error?: string })?.error ||
        "An error occurred";
      toast.error(errorMessage);
    },
  });

  return { isCreating, createUser };
}
