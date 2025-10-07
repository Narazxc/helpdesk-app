import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { deleteRole as deleteRoleApi } from "@/services/apiRole";

export function useDeleteRole() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isPending: isDeleting, mutate: deleteRole } = useMutation({
    mutationFn: deleteRoleApi,
    onSuccess: () => {
      toast.success("Role successfully deleted");

      queryClient.invalidateQueries({
        queryKey: ["roles"],
      });

      // Invalidate any individual category type queries
      queryClient.invalidateQueries({
        queryKey: ["role"],
      });

      navigate("/user-roles");
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteRole };
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
