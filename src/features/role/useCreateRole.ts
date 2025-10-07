import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createRole as createRoleApi } from "@/services/apiRole";

type UseCreateRoleOptions = {
  onSuccess?: () => void;
};

export function useCreateRole(options?: UseCreateRoleOptions) {
  const queryClient = useQueryClient();

  const {
    mutate: createRole,
    isPending: isCreating,
    error,
  } = useMutation({
    mutationFn: createRoleApi,
    onSuccess: () => {
      // Call the passed callback if provided
      options?.onSuccess?.();

      toast.success("Role created successfully");
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isCreating, createRole, error };
}
