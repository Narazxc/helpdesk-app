// import ComponentCard from "@/components/common/ComponentCard";
// import ExampleFormTwo from "@/components/form/ExampleFormTwo";
import DefaultTab from "@/components/ui/tabs/DefaultTabs";
import { ArrowLeft } from "lucide-react";
// import CreateUserForm from "@/components/user/CreateUserForm";
import { Link, useNavigate } from "react-router";

export default function CreateUserPage2() {
  const navigate = useNavigate();
  return (
    <>
      {/* <h1 className="text-2xl font-bold mb-3 text-gray-700 dark:text-gray-100">
      Create User
      </h1> */}
      <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
        <div className="flex items-center gap-3">
          <ArrowLeft
            onClick={() => navigate(-1)}
            className="hover:cursor-pointer hover:text-gray-600 transition-colors duration-150"
          />
          <h1 className="text-2xl text-color font-bold">Create New User</h1>
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
            <li className="flex items-center gap-1.5 text-sm text-gray-800 dark:text-white/90">
              /<span className="page-title-text">Create User</span>
            </li>
          </ol>
        </nav>
      </div>

      <div className="w-full">
        <DefaultTab />
        {/* <ExampleFormTwo /> */}
      </div>
    </>
  );
}

{
  /* <div
          className={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]`}
        >
          <div className="px-5 py-5">
            <div className=" border-gray-100 dark:border-gray-800"></div>
          </div>
        </div> */
}
