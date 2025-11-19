// import Analytics from "../../pages/dashboard/Analytics";s
import MyDashboard from "@/components/dashboard/MyDashboard";
import { tokenManager } from "@/features/auth/tokenManager";
import { useEffect } from "react";
import { useNavigate } from "react-router";

// import useRefreshToken from "@/features/auth/useRefreshToken";
// import { useEffect } from "react";

export default function MyDashboardPage() {
  const navigate = useNavigate();

  // const { getRefreshToken, isLoading } = useRefreshToken();

  // useEffect(() => {
  //   getRefreshToken();
  //   console.log("refreshToken data: ", getRefreshToken());
  // }, []);

  // if (isLoading) return <p>Loading...</p>;

  useEffect(() => {
    if (!tokenManager.getAccessToken()) {
      navigate("/signin");
    }
  }, []);

  return (
    <div>
      <MyDashboard />
      {/* <Analytics /> */}
    </div>
  );
}
