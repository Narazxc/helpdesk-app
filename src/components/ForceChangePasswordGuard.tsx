import { useCurrentUser } from "@/features/auth/useCurrentUser";
import type { LoginResponse } from "@/types/auth";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

export default function ForceChangePasswordGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useCurrentUser();
  const { data: auth } = useQuery<LoginResponse>({
    queryKey: ["auth"],
    enabled: false,
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (
      !isLoading &&
      isAuthenticated &&
      auth?.forcePasswordChange &&
      location.pathname !== "/change-password"
    ) {
      navigate("/change-password", { replace: true });
    }
    if (!isLoading && !isAuthenticated) {
      navigate("/signin", { replace: true });
    }
  }, [
    isAuthenticated,
    isLoading,
    auth?.forcePasswordChange,
    location.pathname,
    navigate,
  ]);

  if (isLoading) return <p>Loading...</p>;
  if (
    isAuthenticated &&
    auth?.forcePasswordChange &&
    location.pathname !== "/change-password"
  ) {
    return null; // nothing renders if they try to go somewhere else
  }

  return children;
}
