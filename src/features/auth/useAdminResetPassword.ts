import {
  useMutation,
  //  useQueryClient
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import { adminResetPassword as adminResetPasswordApi } from "@/services/apiAuth";
import type { AdminResetPassword } from "@/types/auth";

export function useAdminResetPassword() {
  //   const queryClient = useQueryClient();

  const { mutate: adminResetPassword, isPending: isLoading } = useMutation({
    mutationFn: ({
      userId,
      passwords,
    }: {
      userId: string;
      passwords: AdminResetPassword;
    }) => adminResetPasswordApi(userId, passwords),
    onSuccess: () => {
      toast.success("Password changed successfully");
      //   queryClient.invalidateQueries({ queryKey: ["categoryTypes"] });
    },
    // onError: (error: AxiosError) => {
    //   let categoryTypeName;
    //   let requestBody;

    //   try {
    //     // Parse if it's a JSON string
    //     requestBody =
    //       typeof error.config?.data === "string"
    //         ? JSON.parse(error.config.data)
    //         : error.config?.data;

    //     // Extract the name after successful parsing/assignment
    //     categoryTypeName = requestBody?.name;
    //   } catch {
    //     // If parsing fails, try to access directly (in case it's already an object)
    //     categoryTypeName = error.config?.data?.name;
    //   }

    //   toast.error(`Category Type "${categoryTypeName}" already exist`);
    //   console.error(
    //     "Error resetting user password: ",
    //     error.response?.data || error.message
    //   );
    // },
  });

  return { adminResetPassword, isLoading };
}
