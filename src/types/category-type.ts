export interface CategoryType {
  id: number;
  categoryTypeCode: string;
  name: string;
  requestTypeCode: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  status: boolean;
  createdBy: string | null;
  updatedBy: string | null;
}

export interface UpdateCategoryType {
  id: string;
  newCategoryTypeData: CreateCategoryType;
}

export interface CreateCategoryType {
  name: string;
  description: string;
  code: string;
}
