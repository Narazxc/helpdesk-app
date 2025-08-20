import { useQuery } from "@tanstack/react-query";
import type { AssetType } from "@/types/asset-type";
import { getAssetType } from "@/services/apiAssetType";

export function useAssetType(id: string) {
  const {
    data: assetType,
    isPending: isLoading,
    error,
  } = useQuery<AssetType, Error>({
    queryKey: ["assetType", id],
    queryFn: () => getAssetType(id),
  });

  return { assetType, isLoading, error };
}
