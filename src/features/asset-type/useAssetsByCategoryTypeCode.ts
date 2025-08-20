import { getAssetTypesByCategoryTypeCode } from "@/services/apiAssetType";
import type { AssetType } from "@/types/asset-type";
import { useQuery } from "@tanstack/react-query";

export default function useAssetsByCategoryTypeCode(categoryTypeCode: string) {
  const {
    isLoading,
    data: assetTypes = [],
    error,
  } = useQuery<AssetType[], Error>({
    queryKey: ["assetTypes", categoryTypeCode],
    queryFn: async () => {
      if (!categoryTypeCode) {
        return [];
      }
      const result = await getAssetTypesByCategoryTypeCode(categoryTypeCode);
      return result || []; // Convert null to empty array
    },
    enabled: !!categoryTypeCode, // Only run when requestTypeCode exists
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  return { isLoading, assetTypes, error };
}
