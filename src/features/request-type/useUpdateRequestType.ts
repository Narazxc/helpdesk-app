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
      console.error(
        "Error updating request type:",
        error.response?.data || error.message
      );
    },
  });

  return { isUpdating, updateRequestType };
}
