import { useQuery } from "@tanstack/react-query";
import type { CategoryType } from "@/types/category-type";
import { getCategoryType } from "@/services/apiCategoryType";

export function useCategoryTypeById(id: string) {
  const {
    data: categoryType,
    isPending: isLoading,
    error,
  } = useQuery<CategoryType, Error>({
    queryKey: ["categoryType", id],
    queryFn: () => getCategoryType(id),
  });

  return { categoryType, isLoading, error };
}
