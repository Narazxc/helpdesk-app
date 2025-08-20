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
      console.error(
        "Error creating asset type:",
        error.response?.data || error.message
      );
    },
  });

  return { isCreating, createAssetType };
}
