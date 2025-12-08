import { refreshToken as refreshTokenApi } from "@/services/apiAuth";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

// export const useLogout = () => {
//   const queryClient = useQueryClient();

//   const {
//     mutate: logout,
//     isPending: isLoggingOut,
//     error,
//   } = useMutation({
//     mutationFn: () => logoutApi(),
//     onSuccess: () => {
//       tokenManager.clearAccessToken();
//       queryClient.setQueryData(["currentUser"], null);
//       queryClient.clear(); // Clear all cached queries
//     },
//     onError: (err) => {
//       console.log(err);
//     },
//   });

//   return {
//     error,
//     logout,
//     isLoggingOut,
//   };
// };

export default function useRefreshToken() {
  const { mutate: getRefreshToken, isPending: isLoading } = useMutation({
    mutationFn: () => refreshTokenApi(),
    onSuccess: (data) => {
      toast.success(data.accessToken);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return {
    getRefreshToken,
    isLoading,
  };
}
