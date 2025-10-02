import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { deleteAgentGroup as deleteAgentGroupApi } from "@/services/apiAgentGroup";

export function useDeleteAgentGroup() {
  const queryClient = useQueryClient();
  // const navigate = useNavigate();

  const {
    isPending: isDeleting,
    mutate: deleteAgentGroup,
    error,
  } = useMutation({
    mutationFn: deleteAgentGroupApi,
    onSuccess: () => {
      // toast.success("Agent Group successfully deleted");

      queryClient.invalidateQueries({
        queryKey: ["agentGroups"],
      });

      // // Invalidate any individual category type queries
      // queryClient.invalidateQueries({
      //   queryKey: ["agentGroup"],
      // });

      // navigate("/agent-groups");
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteAgentGroup, error };
}

// export function useDeleteCategoryType() {
//   const queryClient = useQueryClient();
//   const navigate = useNavigate();

//   const { isPending: isDeleting, mutate: deleteCategoryType } = useMutation({
//     mutationFn: deleteCategoryTypeApi,
//     onSuccess: () => {
//       toast.success("Category Type successfully deleted");

//       queryClient.invalidateQueries({
//         queryKey: ["categoryTypes"],
//       });

//       // Invalidate any individual category type queries
//       queryClient.invalidateQueries({
//         queryKey: ["categoryType"],
//       });

//       navigate("/category-types");
//     },
//     onError: (err) => toast.error(err.message),
//   });

//   return { isDeleting, deleteCategoryType };
// }
