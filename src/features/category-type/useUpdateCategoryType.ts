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
      let categoryTypeName;
      let requestBody;

      try {
        // Parse if it's a JSON string
        requestBody =
          typeof error.config?.data === "string"
            ? JSON.parse(error.config.data)
            : error.config?.data;

        // Extract the name after successful parsing/assignment
        categoryTypeName = requestBody?.name;
      } catch {
        // If parsing fails, try to access directly (in case it's already an object)
        categoryTypeName = error.config?.data?.name;
      }

      toast.error(`Category Type "${categoryTypeName}" already exist`);
      console.error(
        "Error creating category type:",
        error.response?.data || error.message
      );
    },
  });

  return { isUpdating, updateCategoryType };
}
