import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tokenManager } from "./tokenManager";
import { logout as logoutApi } from "@/services/apiAuth";

export const useLogout = () => {
  const queryClient = useQueryClient();

  const {
    mutate: logout,
    isPending: isLoggingOut,
    error,
  } = useMutation({
    mutationFn: () => logoutApi(),
    onSuccess: () => {
      tokenManager.clearAccessToken();
      queryClient.setQueryData(["currentUser"], null);

      queryClient.invalidateQueries({ queryKey: ["currentUserProfile"] });

      queryClient.invalidateQueries();

      // queryClient.clear(); // Clear all cached queries
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return {
    error,
    logout,
    isLoggingOut,
  };
};
