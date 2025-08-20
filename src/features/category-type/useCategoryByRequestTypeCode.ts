import { getCategoryByRequestTypeCode } from "@/services/apiCategoryType";
import type { CategoryType } from "@/types/category-type";
import { useQuery } from "@tanstack/react-query";

export function useCategoryByRequestTypeCode(requestTypeCode: string) {
  const {
    isLoading,
    data: categoryTypes = [],
    error,
  } = useQuery<CategoryType[], Error>({
    queryKey: ["categoryTypes", requestTypeCode],
    queryFn: async () => {
      const result = await getCategoryByRequestTypeCode(requestTypeCode);
      return result || []; // Convert null to empty array
    },
    enabled: !!requestTypeCode,
  });

  return { isLoading, categoryTypes, error };
}
