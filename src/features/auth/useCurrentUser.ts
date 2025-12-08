import { useQuery } from "@tanstack/react-query";

// import { tokenManager } from "./tokenManager";
import type { CurrentUser } from "@/types/auth";
// import { me, refreshToken } from "@/services/apiAuth";
// import { tokenManager } from "./tokenManager";
import {
  me,
  // me,
  // me as meApi,
  refreshToken,
  // refreshToken
} from "@/services/apiAuth";
import { tokenManager } from "./tokenManager";
// import { tokenManager } from "./tokenManager";
// ,

export const useCurrentUser = () => {
  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useQuery<CurrentUser | null>({
    queryKey: ["currentUser"], // ← Unique cache key
    // queryFn: meApi,

    // queryFn: async () => {
    //   // Step 1: Check if we have an access token in memory
    //   if (!tokenManager.hasAccessToken()) {
    //     // No access token - try to get a new one using refresh token
    //     try {
    //       const { accessToken } = await apiAuth.refresh();
    //       tokenManager.setAccessToken(accessToken);
    //     } catch (error) {
    //       // Refresh token invalid/expired - user not logged in
    //       return null;
    //     }
    //   }

    //   // Step 2: We have access token - fetch user data
    //   try {
    //     return await apiAuth.me(); // GET /auth/me
    //   } catch (error) {
    //     // Access token invalid - clear it
    //     tokenManager.clearAccessToken();
    //     return null;
    //   }
    // },

    // retry: false, // Don't retry on failure
    // staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes

    ////////////////////////////////////////////////////////////////////////////////

    queryFn: async () => {
      // Step 1: Check if we have an access token in memory
      if (!tokenManager.hasAccessToken()) {
        // No access token - try to get a new one using refresh token
        try {
          const { accessToken } = await refreshToken();
          tokenManager.setAccessToken(accessToken);
        } catch (error) {
          // Refresh token invalid/expired - user not logged in
          console.log("inside current user hook", error);
          return null;
        }
      }

      // Step 2: We have access token - fetch user data
      try {
        return await me(); // GET /auth/me
      } catch (error) {
        console.log("inside current user hook", error);

        // Access token invalid - clear it
        tokenManager.clearAccessToken();
        return null;
      }
    },

    // retry: false, // Don't retry on failure
    // staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  });

  return {
    user, // User object or null
    isLoading, // true while fetching
    isAuthenticated: !!user, // true if user exists
    error,
    refetch, // Function to manually refetch
  };
};
