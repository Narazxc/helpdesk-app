import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { verifyResetToken } from "@/services/apiAuth";

export function useVerifyToken() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  console.log(token);

  const {
    isLoading,
    data: tokenStatus,
    error,
  } = useQuery({
    queryKey: ["verifyToken", token], // Include token in key
    queryFn: () => verifyResetToken, // Pass token to API
    enabled: !!token, // Only run if token exists
    retry: false, // Don't retry failed token verifications
    staleTime: Infinity, // Token verification result won't change
  });

  return { isLoading, tokenStatus, error };
}
