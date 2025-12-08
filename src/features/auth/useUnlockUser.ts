import { unlockUser as unlockUserApi } from "@/services/apiAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useUnlockUser() {
  const queryClient = useQueryClient();

  const { mutate: unlockUser, isPending: isLoading } = useMutation({
    mutationFn: unlockUserApi,
    onSuccess: () => {
      // Invalidate all user-related queries
      queryClient.invalidateQueries({ queryKey: ["users"] });

      // Optional: Show success message
      toast.success("User unlocked successfully");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return {
    unlockUser,
    isLoading,
  };
}
