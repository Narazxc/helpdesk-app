import type { UpdateUser } from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { updateUser as updateUserApi } from "@/services/apiUser";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, newUserData }: UpdateUser) =>
      updateUserApi(newUserData, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },

    onError: (error: AxiosError) => {
      console.error(
        "Error updating user:",
        error.response?.data || error.message
      );
    },
  });

  return { updateUser, isUpdating };
}

// export function useUpdateCategoryType() {
//   const queryClient = useQueryClient();

//   const { mutate: updateCategoryType, isPending: isUpdating } = useMutation({
//     mutationFn: ({ id, newCategoryTypeData }: UpdateCategoryType) =>
//       updateCategoryTypeApi(newCategoryTypeData, id),
//     onSuccess: () => {
//       toast.success("Category Type update successfully");
//       queryClient.invalidateQueries({ queryKey: ["categoryType"] });
//       queryClient.invalidateQueries({ queryKey: ["categoryTypes"] });
//     },
//     onError: (error: AxiosError) => {
//       console.error(
//         "Error creating category type:",
//         error.response?.data || error.message
//       );
//     },
//   });

//   return { isUpdating, updateCategoryType };
// }
