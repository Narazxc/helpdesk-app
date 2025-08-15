import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import { createCategoryType as createCategoryTypeApi } from "@/services/apiCategoryType";

export function useCreateCategoryType() {
  const queryClient = useQueryClient();

  const { mutate: createCategoryType, isPending: isCreating } = useMutation({
    mutationFn: createCategoryTypeApi,
    onSuccess: () => {
      toast.success("Category Type created successfully");
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

  return { isCreating, createCategoryType };
}
