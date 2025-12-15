// import { useCurrentUser } from "@/features/auth/useCurrentUser";
// import ChangePassword from "@/pages/ChangePassword";
// import type { LoginResponse } from "@/types/auth";
// import { useQuery } from "@tanstack/react-query";
// // import type { LoginResponse } from "@/types/auth";
// // import { useQuery } from "@tanstack/react-query";
// import { useEffect } from "react";
// import { useNavigate } from "react-router";

// interface ProtectedRouteProps {
//   children: React.ReactNode;
// }

// export default function ProtectedRoute({ children }: ProtectedRouteProps) {
//   // navigate is only allowed to be called in some other function like in a callback or useEffect, not at the top level of the component
//   const navigate = useNavigate();

//   // 1. Load authenticated user
//   const { isLoading, isAuthenticated } = useCurrentUser();

//   console.log("in protected route isAuthenticated", isAuthenticated);

//   // ✅ Get auth data reactively (includes forceResetPassword flag)
//   const { data: auth, isLoading: isLoadingAuth } = useQuery<LoginResponse>({
//     queryKey: ["auth"],
//     queryFn: () => {
//       throw new Error("This should never be called");
//     },
//     enabled: false, // Don't refetch, just read from cache
//   });

//   // 2. If there is NO authenticated user, redirect to the /login
//   useEffect(
//     function () {
//       if (!isLoading && !isAuthenticated) navigate("/signin");
//     },
//     [isAuthenticated, isLoading, navigate, isLoadingAuth]
//   );

//   useEffect(
//     function () {
//       if (
//         isAuthenticated &&
//         auth?.forcePasswordChange !== undefined &&
//         auth.forcePasswordChange
//       )
//         navigate("/change-password");
//     },
//     [
//       isAuthenticated,
//       isLoading,
//       navigate,
//       isLoadingAuth,
//       auth?.forcePasswordChange,
//     ]
//   );

//   // // 3. While loading, show a spinner
//   // if (isLoading) return <p>Loading...</p>;

//   // if (isAuthenticated && auth?.forcePasswordChange) return <ChangePassword />;
//   // if (isAuthenticated && !auth?.forcePasswordChange) return children;

//   // // 4. If there IS a user, render the app
//   // // only return children if the user is authenticated
//   if (isAuthenticated) return children;
// }

////////////////////////////////////////////////////////////
// import { useCurrentUser } from "@/features/auth/useCurrentUser";
// // import type { LoginResponse } from "@/types/auth";
// // import { useQuery } from "@tanstack/react-query";
// import { useEffect } from "react";
// import { useNavigate, useLocation } from "react-router";

// interface ProtectedRouteProps {
//   children: React.ReactNode;
// }

// export default function ProtectedRoute({ children }: ProtectedRouteProps) {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const { isLoading, isAuthenticated, user } = useCurrentUser();

//   // console.log("user?.forcePasswordChange", user?.forcePasswordChange);

//   // const { data: auth } = useQuery<LoginResponse>({
//   //   queryKey: ["auth"],
//   //   queryFn: () => {
//   //     throw new Error("This should never be called");
//   //   },
//   // });

//   // console.log("isAuthenticated: ", isAuthenticated);
//   // console.log("auth: ", auth);
//   // console.log("forcePasswordChange: ", auth?.forcePasswordChange);
//   // console.log("location pathname", location.pathname);

//   useEffect(() => {
//     if (location.pathname !== "/change-password") {
//       console.log("not on /change-password");
//     } else {
//       console.log("on /change-password");
//     }

//     if (isLoading) return;

//     // 1. Not authenticated → go to signin
//     if (!isAuthenticated) {
//       navigate("/signin", { replace: true });
//       return;
//     }

//     // 2. MUST CHANGE PASSWORD → always redirect to change page
//     if (
//       isAuthenticated &&
//       user?.forcePasswordChange &&
//       location.pathname !== "/change-password"
//     ) {
//       navigate("/change-password", { replace: true });
//       return;
//     }
//   }, [
//     isLoading,
//     isAuthenticated,
//     user,
//     navigate,
//     location.pathname,
//     user?.forcePasswordChange, // safe, optional chaining
//   ]);

//   // While loading, don't render app
//   if (isLoading) return null;

//   // Block rendering of other routes until password changed
//   if (user?.forcePasswordChange && location.pathname !== "/change-password")
//     return null;

//   // if (isAuthenticated) return children;
//   // if (isAuthenticated)
//   return children;
// }

//////////////////////////////////////////////////
// import { useCurrentUser } from "@/features/auth/useCurrentUser";
// import { useEffect } from "react";
// import { useNavigate, useLocation } from "react-router";

// interface ProtectedRouteProps {
//   children: React.ReactNode;
// }

// export default function ProtectedRoute({ children }: ProtectedRouteProps) {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const { isLoading, isAuthenticated, user } = useCurrentUser();

//   useEffect(() => {
//     // Skip all redirects if on change-password page
//     if (location.pathname === "/change-password") return;

//     if (isLoading) return;

//     // Not authenticated → go to signin
//     if (!isAuthenticated) {
//       navigate("/signin", { replace: true });
//       return;
//     }

//     // Must change password → redirect to change page
//     if (user?.forcePasswordChange) {
//       navigate("/change-password", { replace: true });
//       return;
//     }
//   }, [
//     isLoading,
//     isAuthenticated,
//     user?.forcePasswordChange,
//     navigate,
//     location.pathname,
//   ]);

//   // While loading, show nothing
//   if (isLoading) return null;

//   // Not authenticated, show nothing (will redirect)
//   if (!isAuthenticated) return null;

//   // Must change password but not on that page, show nothing (will redirect)
//   // Skip this guard if already on change-password page
//   if (user?.forcePasswordChange && location.pathname !== "/change-password") {
//     return null;
//   }

//   return <>{children}</>;
// }

// import { useCurrentUser } from "@/features/auth/useCurrentUser";
// import { useNavigate } from "react-router";
// import ChangePassword from "@/pages/ChangePassword"; // Import your component
// import { useEffect } from "react";
// import type { LoginResponse } from "@/types/auth";
// import { useQuery } from "@tanstack/react-query";

// interface ProtectedRouteProps {
//   children: React.ReactNode;
// }

// export default function ProtectedRoute({ children }: ProtectedRouteProps) {
//   const navigate = useNavigate();
//   const { isLoading: isLoadingCurrentUser, isAuthenticated } = useCurrentUser();

//   // ✅ Get auth data reactively (includes forceResetPassword flag)
//   const { data: auth, isLoading: isLoadingAuth } = useQuery<LoginResponse>({
//     queryKey: ["auth"],
//     queryFn: () => {
//       throw new Error("This should never be called");
//     },
//     // enabled: false, // Don't refetch, just read from cache
//   });

//   const isLoading = isLoadingCurrentUser || isLoadingAuth;

//   useEffect(() => {
//     // While loading, don't render anything
//     if (isLoading || isLoadingAuth) return;
//     if (auth === undefined) return;
//     console.log("auth?.forcePasswordChange", auth?.forcePasswordChange);

//     // Not authenticated → redirect to signin
//     if (!isAuthenticated) {
//       navigate("/signin", { replace: true });
//       return;
//     }
//   }, [
//     isLoading,
//     isAuthenticated,
//     navigate,
//     auth?.forcePasswordChange,
//     isLoadingAuth,
//     auth,
//   ]);

//   // All good → render protected content
//   // return <>{children}</>;
//   // // Must change password → render ChangePassword component directly
//   // if (!isLoading && user?.forcePasswordChange) {
//   //   console.log("user?.forcePasswordChange", user?.forcePasswordChange);
//   //   return;
//   // }

//   console.log("isLoading", !isLoading);
//   console.log("isAuthenticated", isAuthenticated);
//   console.log("auth?.forcePasswordChange", auth?.forcePasswordChange);
//   if (!isLoading && isAuthenticated && auth?.forcePasswordChange) {
//     console.log("a");
//     return <ChangePassword />;
//   }

//   if (!isLoading && isAuthenticated && !auth?.forcePasswordChange) {
//     console.log("b");
//     return <>{children}</>;
//   }
//   // if (!isLoading && isAuthenticated && user?.forcePasswordChange)
//   //   return <ChangePassword />;
//   // if (isAuthenticated && !user?.forcePasswordChange)
// }

import { useCurrentUser } from "@/features/auth/useCurrentUser";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const { isLoading: isLoadingCurrentUser, isAuthenticated } = useCurrentUser();

  // ✅ Read from localStorage directly
  const [forcePasswordChange] = useState<boolean>(() => {
    const cpw = localStorage.getItem("cpw");
    return cpw === "true";
  });

  useEffect(() => {
    if (isLoadingCurrentUser) return;

    // Not authenticated → redirect to signin
    if (!isAuthenticated) {
      navigate("/signin", { replace: true });
      return;
    }

    if (forcePasswordChange === true) {
      navigate("/change-password");
    }
  }, [isLoadingCurrentUser, isAuthenticated, navigate, forcePasswordChange]);

  // console.log("isLoading", !isLoadingCurrentUser);
  // console.log("isAuthenticated", isAuthenticated);
  // console.log("forcePasswordChange", forcePasswordChange);

  // if (!isLoadingCurrentUser && isAuthenticated && forcePasswordChange) {
  //   console.log("a - showing change password");
  //   return <ChangePassword />;
  // }

  if (!isLoadingCurrentUser && isAuthenticated && !forcePasswordChange) {
    // console.log("b - showing protected content");
    return <>{children}</>;
  }

  // if (!isLoadingCurrentUser && isAuthenticated && !forcePasswordChange) {
  //   console.log("b - showing protected content");
  //   return <>{children}</>;
  // }

  return null; // Loading state
}
