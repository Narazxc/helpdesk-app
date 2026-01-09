// React router
import { BrowserRouter as Router, Routes, Route } from "react-router";

// Style
// import "./App.css";

// React query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Toast
import { Toaster } from "react-hot-toast";

// Component
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";

// Page component
// import SignIn from "./pages/AuthPages/SignIn";

// import Users from "./pages/archive/user/Users";
// import CreateUserPage from "./pages/archive/user/CreateUserPage";
import RequestTypes from "./pages/RequestTypes";
import RequestType from "./pages/RequestType";
import CategoryTypes from "./pages/CategoryTypes";
import CategoryType from "./pages/CategoryType";
import AssetTypes from "./pages/AssetTypes";
import AssetType from "./pages/AssetType";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Entities from "./pages/Entities";
import OfficeGroups from "./pages/OfficeGroups";
import OfficeGroup from "./pages/OfficeGroup";
import AgentGroups from "./pages/AgentGroups";
import AgentGroup from "./pages/AgentGroup";
import MyDashboardPage from "./pages/MyDashboardPage";
import Roles from "./pages/Roles";
import CreateRoleForm from "./features/role/CreateRoleForm";
import UpdateRoleForm from "./features/role/UpdateRoleForm";
import Users from "./pages/Users";
import CreateUserPage2 from "./pages/archive/user/CreateUserPage2";
import UpdateUserPage from "./pages/archive/user/UpdateUserPage";
import AdminResetPassword from "./features/auth/AdminResetPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import ResetPassword from "./pages/ResetPassword";
import Audit from "./pages/Audit";
import ChangePassword from "./pages/ChangePassword";
// import UserProfiles from "./components/experimental/UserProfiles";
import UserProfileChangePassword from "./pages/UserProfileChangePassword";
import UserProfile from "./pages/UserProfile";
import Tickets from "./pages/ticket/Tickets";
import CreateTicket from "./pages/ticket/CreateTicket";
// import UserProfile from "./components/experimental/UserProfile";
// import UpdateUserPage from "./pages/archive/user/UpdateUserpage";

const queryClient = new QueryClient({
  defaultOptions: {
    // Before 20251027
    // queries: {
    //   // staleTime: 60 * 1000, //1 minute be for another re-fetch
    //   // staleTime: 2000,
    //   // staleTime: 0,
    // },
    // On 20251027
    // queries: {
    //   staleTime: 60 * 1000, // 1 minute
    //   gcTime: 5 * 60 * 1000, // 5 minutes
    //   refetchOnWindowFocus: false, // Optional but recommended
    // },
  },
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <ScrollToTop />

          <Routes>
            {/* Dashboard Layout */}
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index path="/" element={<MyDashboardPage />} />
              {/* <Route path="users" element={<Users />} /> */}
              <Route path="users" element={<Users />} />
              {/* <Route path="create-users" element={<CreateUserPage />} /> */}
              <Route path="users/create" element={<CreateUserPage2 />} />
              <Route path="users/update" element={<UpdateUserPage />} />
              <Route path="user-roles" element={<Roles />} />
              <Route path="user-roles/create" element={<CreateRoleForm />} />
              <Route
                path="user-roles/:id/update"
                element={<UpdateRoleForm />}
              />
              <Route path="office-groups" element={<OfficeGroups />} />
              <Route path="office-groups/:id" element={<OfficeGroup />} />
              <Route path="agent-groups" element={<AgentGroups />} />
              <Route path="agent-groups/:id" element={<AgentGroup />} />
              <Route path="request-types" element={<RequestTypes />} />
              <Route path="request-types/:id" element={<RequestType />} />
              <Route path="category-types" element={<CategoryTypes />} />
              <Route path="category-types/:id" element={<CategoryType />} />
              <Route path="asset-types" element={<AssetTypes />} />
              <Route path="asset-types/:id" element={<AssetType />} />
              <Route path="entity" element={<Entities />} />
              <Route path="audit" element={<Audit />} />
              <Route path="profile" element={<UserProfile />} />
              <Route path="tickets" element={<Tickets />} />
              <Route path="tickets/create" element={<CreateTicket />} />
              <Route
                path="account-settings/change-password"
                element={<UserProfileChangePassword />}
              />

              <Route
                path="admin/users/reset-password"
                element={<AdminResetPassword />}
              />

              {/* <Route path="change-password" element={<ChangePassword />} /> */}

              {/* <Route path="change-password" element={<ChangePassword />} /> */}
            </Route>

            {/* Auth Layout */}
            {/* <Route path="/signin" element={<Signin />} /> */}
            <Route path="signin" element={<Login />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />

            {/* Change password - must be authenticated to access */}
            {/* <Route
              path="change-password"
              element={
                <ProtectedRoute>
                  <ChangePassword />
                </ProtectedRoute>
              }
            /> */}

            {/* <Route
              path="change-password"
              element={
                <ProtectedRoute>
                  <ChangePassword />
                </ProtectedRoute>
              }
            /> */}

            <Route path="change-password" element={<ChangePassword />} />
          </Routes>

          <Toaster
            position="top-right"
            gutter={12}
            containerStyle={{ margin: "8px", zIndex: 9999 }}
            toastOptions={{
              success: {
                duration: 3000,
              },
              error: {
                duration: 5000,
              },
              style: {
                fontSize: "14px",
                maxWidth: "500px",
                padding: "16px 24px",
                // backgroundColor: "var(--color-grey-0)",
                backgroundColor: "#fff",
                color: "var(--color-grey-700)",
                zIndex: 9999, // High z-index
              },
            }}
          />
        </Router>
      </QueryClientProvider>
    </>
  );
}

export default App;
