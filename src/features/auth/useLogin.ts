// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { login as loginApi } from "../../services/apiAuth";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

import type { LoginCredential } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "@/services/apiAuth";
import toast from "react-hot-toast";
import { tokenManager } from "./tokenManager";
import { isAxiosError } from "axios";

// export function useLogin() {
//   const queryClient = useQueryClient();
//   const navigate = useNavigate();

//   const { mutate: login, isLoading } = useMutation({
//     mutationFn: ({ email, password }) => loginApi({ email, password }),
//     onSuccess: (user) => {
//       queryClient.setQueryData(["user"], user.user);
//       navigate("/dashboard", { replace: true });
//     },

//     onError: (err) => {
//       console.log("ERROR", err);
//       toast.error("Provided email or password are incorrect");
//     },
//   });
//   return { login, isLoading };
// }

export function useLogin() {
  // const queryClient = useQueryClient();

  const { mutate: login, isPending: isLoggingIn } = useMutation({
    mutationFn: ({ userId, password }: LoginCredential) =>
      loginApi({ userId, password }),
    onSuccess: (data) => {
      console.log("useLogin Hook: ", data);
      tokenManager.setAccessToken(data.accessToken);
      // queryClient.setQueryData(["currentUser"], data.user);
    },
    onError: (err) => {
      console.log("login error: ", err);
      if (
        isAxiosError(err) &&
        err.response?.status === 401 &&
        err.response?.data?.message === "Invalid credentials"
      ) {
        toast.error("Invalid login credentials.");
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    },
  });

  // // Process the error in the hook
  // const getErrorMessage = () => {
  //   if (!error) return null;

  //   // return "Authentication failed. Please try again.";
  // };

  return { login, isLoggingIn };
}
