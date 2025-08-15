import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { deleteCategoryType as deleteCategoryTypeApi } from "@/services/apiCategoryType";

export function useDeleteCategoryType() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isPending: isDeleting, mutate: deleteCategoryType } = useMutation({
    mutationFn: deleteCategoryTypeApi,
    onSuccess: () => {
      toast.success("Category Type successfully deleted");

      queryClient.invalidateQueries({
        queryKey: ["categoryTypes"],
      });

      // Invalidate any individual category type queries
      queryClient.invalidateQueries({
        queryKey: ["categoryType"],
      });

      navigate("/category-type");
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteCategoryType };
}
