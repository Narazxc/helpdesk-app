import UpdateUserForm from "@/features/users/UpdateUserForm";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router";

export default function UpdateUserPage() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
        <div className="flex items-center gap-3">
          <ArrowLeft
            onClick={() => navigate(-1)}
            className="hover:cursor-pointer hover:text-gray-600 transition-colors duration-150"
          />
          <h1 className="text-2xl text-color font-bold">Update User</h1>
        </div>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link
                className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-400"
                to="/"
              >
                Home
              </Link>
            </li>
            <span className="text-gray-500">/</span>
            <li className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-400">
              <Link to="/users">Users</Link>
            </li>
            <span className="text-gray-500">/</span>
            <li className="flex items-center gap-1.5 text-sm text-gray-800 dark:text-white/90">
              {/* / */}
              <span className="page-title-text">Update User</span>
            </li>
          </ol>
        </nav>
      </div>
      <UpdateUserForm />
    </div>
  );
}
