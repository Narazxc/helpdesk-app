import { getCategoryTypes } from "@/services/apiCategoryType";
import type { CategoryType } from "@/types/category-type";
import { useQuery } from "@tanstack/react-query";

export function useCategoryTypes() {
  const {
    isLoading,
    data: categoryTypes = [],
    error,
  } = useQuery<CategoryType[], Error>({
    queryKey: ["categoryTypes"],
    queryFn: getCategoryTypes,
  });

  return { isLoading, categoryTypes, error };
}
