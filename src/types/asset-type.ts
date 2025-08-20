export interface AssetType {
  id: number;
  name: string;
  description: string;
  categoryTypeCode: string;
  requestName: string;
  categoryName: string;
  createdAt: string;
  updatedAt: string;
  status: boolean;
  createdBy: string | null;
  updatedBy: string | null;
}

export interface UpdateAssetType {
  id: string;
  newAssetTypeData: CreateAssetType;
}

export interface CreateAssetType {
  name: string;
  description: string;
  code: string;
}
