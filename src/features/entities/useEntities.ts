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
  });

  return { isLoading, entities, error };
}
