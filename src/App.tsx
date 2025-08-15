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
import SignIn from "./pages/AuthPages/SignIn";
import MyDashboardPage from "./components/dashboard/MyDashboardPage";
import Users from "./pages/user/Users";
import CreateUserPage from "./pages/user/CreateUserPage";
import RequestTypes from "./pages/RequestTypes";
import RequestType from "./pages/RequestType";
import CategoryTypes from "./pages/CategoryTypes";
import CategoryType from "./pages/CategoryType";
import AssetTypes from "./pages/AssetTypes";
import Entities from "./pages/Entities";

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
              <Route path="create-user" element={<CreateUserPage />} />
              <Route path="request-type" element={<RequestTypes />} />
              <Route path="request-type/:id" element={<RequestType />} />
              <Route path="category-type" element={<CategoryTypes />} />
              <Route path="category-type/:id" element={<CategoryType />} />
              <Route path="asset-type" element={<AssetTypes />} />
              <Route path="asset-type/:id" element={<AssetTypes />} />
              <Route path="entity" element={<Entities />} />
            </Route>

            {/* Auth Layout */}
            <Route path="/signin" element={<SignIn />} />
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
