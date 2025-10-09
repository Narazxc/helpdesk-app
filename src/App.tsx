// React router

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

import Users from "./pages/archive/user/Users";
import CreateUserPage from "./pages/archive/user/CreateUserPage";
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

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // staleTime: 60 * 1000, //1 minute be for another re-fetch
        // staleTime: 2000,
        staleTime: 0,
      },
    },
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <ScrollToTop />
          <Routes>
            {/* Dashboard Layout */}
            <Route element={<AppLayout />}>
              <Route index path="/" element={<MyDashboardPage />} />
              <Route path="users" element={<Users />} />
              <Route path="create-users" element={<CreateUserPage />} />
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
            </Route>

            {/* Auth Layout */}
            {/* <Route path="/signin" element={<Signin />} /> */}
            <Route path="/signin" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
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
