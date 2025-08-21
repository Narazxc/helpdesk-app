import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAssetType as createAssetTypeApi } from "@/services/apiAssetType";

import type { AxiosError } from "axios";
import toast from "react-hot-toast";

export function useCreateAssetType() {
  const queryClient = useQueryClient();

  const { mutate: createAssetType, isPending: isCreating } = useMutation({
    mutationFn: createAssetTypeApi,
    onSuccess: () => {
      toast.success("Asset Type created successfully");
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

  return { isCreating, createAssetType };
}
