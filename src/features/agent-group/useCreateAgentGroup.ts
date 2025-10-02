import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createAgentGroup as createAgentGroupApi } from "@/services/apiAgentGroup";
// import type { AxiosError } from "axios";

// Old error toast
// interface ApiErrorResponse {
//   error?: string;
//   message?: string;
// }

export function useCreateAgentGroup() {
  const queryClient = useQueryClient();

  const {
    mutate: createAgentGroup,
    isPending: isCreating,
    error,
  } = useMutation({
    mutationFn: createAgentGroupApi,
    onSuccess: () => {
      toast.success("Agent Group created successfully");
      queryClient.invalidateQueries({ queryKey: ["agentGroups"] });
    },

    // Old error toast
    // onError: (error: AxiosError<ApiErrorResponse>) => {
    //   // Check if server error message exists
    //   if (error.response?.data?.error || error.response?.data?.message) {
    //     const serverMessage =
    //       error.response.data.error ||
    //       error.response.data.message ||
    //       error.message;

    //     toast.error(serverMessage, {
    //       position: "top-right",
    //     });
    //   } else {
    //     // Fallback to generic error message
    //     toast.error(error.message, {
    //       position: "top-right",
    //     });
    //   }
    // },

    onError: () => {
      toast.error("This user already chief office with another office group");
    },
  });

  return { isCreating, createAgentGroup, error };
}
