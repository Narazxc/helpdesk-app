import { useCurrentUser } from "@/features/auth/useCurrentUser";
import { useEffect } from "react";
import { useNavigate } from "react-router";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  // navigate is only allowed to be called in some other function like in a callback or useEffect, not at the top level of the component
  const navigate = useNavigate();

  // 1. Load authenticated user
  const { isLoading, isAuthenticated } = useCurrentUser();

  console.log("in protected route isAuthenticated", isAuthenticated);

  // 2. If there is NO authenticated user, redirect to the /login
  useEffect(
    function () {
      if (!isLoading && !isAuthenticated) navigate("/signin");
    },
    [isAuthenticated, isLoading, navigate]
  );

  // // 3. While loading, show a spinner
  // if (isLoading) return <p>Loading...</p>;

  // 4. If there IS a user, render the app
  // only return children if the user is authenticated
  if (isAuthenticated) return children;
}
