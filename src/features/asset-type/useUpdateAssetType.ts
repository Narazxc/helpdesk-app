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
      let assetTypeName;
      let requestBody;

      try {
        // Parse if it's a JSON string
        requestBody =
          typeof error.config?.data === "string"
            ? JSON.parse(error.config.data)
            : error.config?.data;

        // Extract the name after successful parsing/assignment
        assetTypeName = requestBody?.name;
      } catch {
        // If parsing fails, try to access directly (in case it's already an object)
        assetTypeName = error.config?.data?.name;
      }

      toast.error(`Asset Type "${assetTypeName}" already exist`);
      console.error(
        "Error creating asset type:",
        error.response?.data || error.message
      );
    },
  });

  return { isUpdating, updateAssetType };
}
