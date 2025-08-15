import { useMutation, useQueryClient } from "@tanstack/react-query";
// import toast from "react-hot-toast";
import { deleteRequestType as deleteRequestTypeApi } from  "../../services/apiRequestType"
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


export function useDeleteRequestType() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { isPending: isDeleting, mutate: deleteRequestType } = useMutation({
    mutationFn: deleteRequestTypeApi,
    onSuccess: () => {
      toast.success("Request Type successfully deleted");

      queryClient.invalidateQueries({
        queryKey: ["requestTypes"],
      });

       // Invalidate any individual request type queries
      queryClient.invalidateQueries({
        queryKey: ["requestType"],
      });

      navigate("/request-type");
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteRequestType };
}
