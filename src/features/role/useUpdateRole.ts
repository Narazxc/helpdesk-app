import { updateRole as updateRoleApi } from "@/services/apiRole";
import type { UpdateRole } from "@/types/role";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";

export function useUpdateRole() {
  const queryClient = useQueryClient();

  //   updateCategoryTypeApi(newRoleData, id),
  //   updateCategoryTypeApi(newRoleData, id),

  const { mutate: updateRole, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, newRoleData }: UpdateRole) =>
      updateRoleApi(newRoleData, id),
    onSuccess: () => {
      toast.success("Category Type update successfully");
      queryClient.invalidateQueries({ queryKey: ["role"] });
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
    onError: (error: AxiosError) => {
      console.log(error);
    },
  });

  return { isUpdating, updateRole };
}
