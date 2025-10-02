import { getEntities } from "@/services/apiEntity";
import type { Entity } from "@/types/entity";
import { useQuery } from "@tanstack/react-query";

export function useEntities() {
  const {
    isLoading,
    data: entities = [],
    error,
  } = useQuery<Entity[], Error>({
    queryKey: ["entities"],
    queryFn: getEntities,
    staleTime: 30 * 60 * 1000, // 30 minutes fresh
    gcTime: 60 * 60 * 1000, // 1 hour in cache
    refetchOnWindowFocus: false, // Don't refetch on window focus
    refetchOnMount: false, // Don't refetch on component mount if data exists
  });

  return { isLoading, entities, error };
}
