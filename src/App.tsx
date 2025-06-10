import { BrowserRouter as Router, Routes, Route } from "react-router";
import { ScrollToTop } from "./components/common/ScrollToTop";
// import "./App.css";
import AppLayout from "./layout/AppLayout";
import SignIn from "./pages/AuthPages/SignIn";
import MyDashboardPage from "./components/dashboard/MyDashboardPage";
import Users from "./pages/user/Users";
import CreateUserPage from "./pages/user/CreateUserPage";

function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/" element={<MyDashboardPage />} />
            <Route path="users" element={<Users />} />
            <Route path="create-user" element={<CreateUserPage />} />
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
