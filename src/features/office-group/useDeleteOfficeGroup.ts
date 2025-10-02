import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteOfficeGroup as deleteOfficeGroupApi } from "@/services/apiOfficeGroup";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export function useDeleteOfficeGroup() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    isPending: isDeleting,
    mutate: deleteOfficeGroup,
    error,
  } = useMutation({
    mutationFn: deleteOfficeGroupApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["officeGroups"],
      });

      navigate("/office-groups");
    },

    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteOfficeGroup, error };
}

// import { useMutation, useQueryClient } from "@tanstack/react-query";
// // import toast from "react-hot-toast";
// import { deleteRequestType as deleteRequestTypeApi } from "../../services/apiRequestType";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// export function useDeleteRequestType() {
//   const queryClient = useQueryClient();
//   const navigate = useNavigate();

//   const { isPending: isDeleting, mutate: deleteRequestType } = useMutation({
//     mutationFn: deleteRequestTypeApi,
//     onSuccess: () => {
//       toast.success("Request Type successfully deleted");

//       queryClient.invalidateQueries({
//         queryKey: ["requestTypes"],
//       });

//       // Invalidate any individual request type queries
//       queryClient.invalidateQueries({
//         queryKey: ["requestType"],
//       });

//       navigate("/request-types");
//     },
//     onError: (err) => toast.error(err.message),
//   });

//   return { isDeleting, deleteRequestType };
// }
