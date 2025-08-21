import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRequestType as updateRequestTypeApi } from "../../services/apiRequestType";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import type { UpdateRequestType } from "@/types/request-type";

export function useUpdateRequestType() {
  const queryClient = useQueryClient();

  const { mutate: updateRequestType, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, newRequestTypeData }: UpdateRequestType) =>
      updateRequestTypeApi(newRequestTypeData, id),
    onSuccess: () => {
      toast.success("Request Type update successfully");
      queryClient.invalidateQueries({ queryKey: ["requestType"] });
      queryClient.invalidateQueries({ queryKey: ["requestTypes"] });
    },
    onError: (error: AxiosError) => {
      //     console.error(
      //       "Error updating request type:",
      //       error.response?.data || error.message
      //     );
      //   },
      // });

      // Adding duplicate name toast when update Request Type
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

  return { isUpdating, updateRequestType };
}
