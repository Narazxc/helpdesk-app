import { BrowserRouter as Router, Routes, Route } from "react-router";
import { ScrollToTop } from "./components/common/ScrollToTop";
// import "./App.css";
import AppLayout from "./layout/AppLayout";
import SignIn from "./pages/AuthPages/SignIn";
import MyDashboardPage from "./components/dashboard/MyDashboardPage";
import Users from "./pages/user/Users";
import CreateUserPage from "./pages/user/CreateUserPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CategoryType from "./pages/category-type/CategoryType";
import CategoryTypeDetail from "./pages/category-type/CategoryTypeDetail";
import RequestTypes from "./pages/RequestTypes";
import RequestType from "./pages/RequestType";

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
              <Route path="category-type" element={<CategoryType />} />
              <Route
                path="category-type/:id"
                element={<CategoryTypeDetail />}
              />
            </Route>

            {/* Auth Layout */}
            <Route path="/signin" element={<SignIn />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </>
  );
}

export default App;
