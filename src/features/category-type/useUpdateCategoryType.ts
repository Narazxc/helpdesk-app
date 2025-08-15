import type { UpdateCategoryType } from "@/types/category-type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import { updateCategoryType as updateCategoryTypeApi } from "../../services/apiCategoryType";

export function useUpdateCategoryType() {
  const queryClient = useQueryClient();

  const { mutate: updateCategoryType, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, newCategoryTypeData }: UpdateCategoryType) =>
      updateCategoryTypeApi(newCategoryTypeData, id),
    onSuccess: () => {
      toast.success("Category Type update successfully");
      queryClient.invalidateQueries({ queryKey: ["categoryType"] });
      queryClient.invalidateQueries({ queryKey: ["categoryTypes"] });
    },
    onError: (error: AxiosError) => {
      console.error(
        "Error updating category type:",
        error.response?.data || error.message
      );
    },
  });

  return { isUpdating, updateCategoryType };
}
