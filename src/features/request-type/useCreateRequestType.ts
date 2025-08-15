import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRequestType as createRequestTypeApi } from "../../services/apiRequestType";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";

export function useCreateRequestType() {
  const queryClient = useQueryClient();

  const { mutate: createRequestType, isPending: isCreating } = useMutation({
    mutationFn: createRequestTypeApi,
    onSuccess: () => {
      toast.success("Request Type created successfully");
      queryClient.invalidateQueries({ queryKey: ["requestTypes"] });
    },
    onError: (error: AxiosError) => {
      let requestTypeName;
      let requestBody;

      try {
        // Parse if it's a JSON string
        requestBody =
          typeof error.config?.data === "string"
            ? JSON.parse(error.config.data)
            : error.config?.data;

        // Extract the name after successful parsing/assignment
        requestTypeName = requestBody?.name;
      } catch {
        // If parsing fails, try to access directly (in case it's already an object)
        requestTypeName = error.config?.data?.name;
      }

      toast.error(`Request Type "${requestTypeName}" already exist`);
      console.error(
        "Error creating request type:",
        error.response?.data || error.message
      );
    },
  });

  return { isCreating, createRequestType };
}
