// import Analytics from "../../pages/dashboard/Analytics";s
import MyDashboard from "@/components/dashboard/MyDashboard";
// import { tokenManager } from "@/features/auth/tokenManager";
// import { useCurrentUser } from "@/features/auth/useCurrentUser";
// import useResetPassword from "@/features/auth/useResetPassword";
// import type { ResetPassword } from "@/types/auth";
// import { useEffect } from "react";
// import { useNavigate } from "react-router";
// import Analytics from "./archive/dashboard/Analytics";

// import useRefreshToken from "@/features/auth/useRefreshToken";
// import { useEffect } from "react";

export default function MyDashboardPage() {
  // const { user } = useCurrentUser();
  // const { resetPassword } = useResetPassword();

  // const { getRefreshToken, isLoading } = useRefreshToken();

  // useEffect(() => {
  //   getRefreshToken();
  //   console.log("refreshToken data: ", getRefreshToken());
  // }, []);

  // if (isLoading) return <p>Loading...</p>;

  ///////////////////////

  //aaaaa
  // const { user } = useCurrentUser();
  // console.log("current user", user);

  // useEffect(() => {
  //   if (!tokenManager.getAccessToken()) {
  //     navigate("/signin");
  //   }
  // }, []);
  //aaaaa

  // console.log("CurrentUser in dashboard", user);

  // Test reset password
  // function handleResetPassword() {
  //   const token = "b0242640-440e-4cba-ad87-82bacf17f154";

  //   const resetPasswordDataTest: ResetPassword = {
  //     token,
  //     newPassword: "Fmis#2026",
  //     confirmPassword: "Fmis#2026",
  //   };

  //   resetPassword(resetPasswordDataTest);
  // }

  // console.log("accessToken", tokenManager.getAccessToken());
  return (
    <div>
      {/* <button onClick={handleResetPassword}>reset password</button> */}
      <MyDashboard />
      {/* <Analytics /> */}
    </div>
  );
}
