import { Link } from "react-router";
import DataTableThree from "../../components/tables/datatables/datatablethree/DataTableThree";
import DataTableTwo from "../../components/tables/datatables/datatabletwo/DataTableTwo";
import DatePicker from "../../components/form/DatePicker";

export default function Users() {
  return (
    <div>
      {/* <DataTableThree /> */}
      {/* Breadcrumb */}
      {/* <nav className="mb-5">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <a
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-400"
              href="/"
              data-discover="true"
            >
              Home
            </a>
          </li>
          <li className="flex items-center gap-1.5 text-sm text-gray-800 dark:text-white/90">
            <span className="text-gray-500 dark:text-gray-400">
              <svg
                className="stroke-current"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.83333 12.6665L10 8.49984L5.83333 4.33317"
                  stroke=""
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </span>
            <span> Ui Kits </span>
          </li>
        </ol>
      </nav> */}
      <div className="w-full flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Users</h1>
        <Link
          className="bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300  rounded-lg text-sm"
          to="/create-user"
        >
          <div className="flex px-5 py-2.5 rounded-xl">
            <span>Create user</span>
            <ion-icon
              className="text-white-500 text-lg ml-1"
              style={{
                // color: "white",
                strokeWidth: "2px",
              }}
              name="person-add-outline"
            ></ion-icon>
          </div>
        </Link>
      </div>
      <div className="mb-4"></div>
      <DataTableTwo />
    </div>
  );
}
