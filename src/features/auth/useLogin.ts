// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { login as loginApi } from "../../services/apiAuth";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

import type { LoginCredential } from "@/types/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi, me } from "@/services/apiAuth";
import toast from "react-hot-toast";
import { tokenManager } from "./tokenManager";
import { isAxiosError } from "axios";
import type { CurrentUser } from "@/types/auth";

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
  const queryClient = useQueryClient();

  const { mutate: login, isPending: isLoggingIn } = useMutation({
    mutationFn: ({ userId, password }: LoginCredential) =>
      loginApi({ userId, password }),
    onSuccess: async (data) => {
      console.log("useLogin Hook: ", data);
      tokenManager.setAccessToken(data.accessToken);

      // const currentUser: CurrentUser = {
      //   data.username;
      // }
      // queryClient.setQueryData(["currentUser"],   );

      // Construct CurrentUser from login response
      const currentUser: CurrentUser = {
        userId: data.userId,
        username: data.username,
        email: data.email,
        roles: data.roles,
        // id is optional; not present in /login
      };

      // // Optionally, fetch /me for full info (id)
      try {
        const meData = await me();
        currentUser.id = meData.id;
      } catch (error) {
        console.log("Failed to fetch", error);
      }

      // Save currentUser in React Query cache
      queryClient.setQueryData(["currentUser"], currentUser);
    },

    onError: (err) => {
      console.log("login error: ", err);

      if (
        isAxiosError(err) &&
        err.response?.status === 401 &&
        err.response?.data?.message === "Invalid credentials"
      ) {
        toast.error("Invalid login credentials.");
      } else if (isAxiosError(err) && err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("An unexpected error occurred.");
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
