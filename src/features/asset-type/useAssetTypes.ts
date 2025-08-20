import { useQuery } from "@tanstack/react-query";
import type { AssetType } from "@/types/asset-type";
import { getAssetTypes } from "@/services/apiAssetType";

export function useAssetTypes() {
  const {
    isLoading,
    data: assetTypes = [],
    error,
  } = useQuery<AssetType[], Error>({
    queryKey: ["assetTypes"],
    queryFn: getAssetTypes,
  });

  return { isLoading, assetTypes, error };
}
