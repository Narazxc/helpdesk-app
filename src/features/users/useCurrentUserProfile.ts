import { useQuery } from "@tanstack/react-query";
import type { UserProfile } from "@/types/user";
import { getCurrentUserProfile } from "@/services/apiUser";

export function useCurrentUserProfile() {
  const {
    isLoading,
    data: currentUserProfile,
    error,
  } = useQuery<UserProfile, Error>({
    queryKey: ["currentUserProfile"],
    queryFn: getCurrentUserProfile,
  });

  return { isLoading, currentUserProfile, error };
}
