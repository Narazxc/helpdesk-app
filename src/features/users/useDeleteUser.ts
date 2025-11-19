import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { deleteUser as deleteUserApi } from "@/services/apiUser";

export function useDeleteUser() {
  const queryClient = useQueryClient();
  //   const navigate = useNavigate();

  const { isPending: isDeleting, mutate: deleteUser } = useMutation({
    mutationFn: deleteUserApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });

      // Invalidate any individual asset type queries
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });

      //   navigate("/asset-types");
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteUser };
}
