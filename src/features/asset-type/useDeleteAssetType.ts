import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAssetType as deleteAssetTypeApi } from "../../services/apiAssetType";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useDeleteAssetType() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isPending: isDeleting, mutate: deleteAssetType } = useMutation({
    mutationFn: deleteAssetTypeApi,
    onSuccess: () => {
      // toast.success("Asset Type successfully deleted");

      queryClient.invalidateQueries({
        queryKey: ["assetTypes"],
      });

      // Invalidate any individual asset type queries
      queryClient.invalidateQueries({
        queryKey: ["assetType"],
      });

      navigate("/asset-types");
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteAssetType };
}
