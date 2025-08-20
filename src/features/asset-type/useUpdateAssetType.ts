import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { updateAssetType as updateAssetTypeApi } from "@/services/apiAssetType";
import toast from "react-hot-toast";
import type { UpdateAssetType } from "@/types/asset-type";

export function useUpdateAssetType() {
  const queryClient = useQueryClient();

  const { mutate: updateAssetType, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, newAssetTypeData }: UpdateAssetType) =>
      updateAssetTypeApi(newAssetTypeData, id),
    onSuccess: () => {
      toast.success("Asset Type update successfully");
      queryClient.invalidateQueries({ queryKey: ["assetType"] });
      queryClient.invalidateQueries({ queryKey: ["assetTypes"] });
    },
    onError: (error: AxiosError) => {
      console.error(
        "Error updating asset type:",
        error.response?.data || error.message
      );
    },
  });

  return { isUpdating, updateAssetType };
}
