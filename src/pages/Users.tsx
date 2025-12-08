import { useState } from "react";

// Components
import PageMeta from "@/components/common/PageMeta";
// import Button from "@/components/ui/button/Button";
import UsersTable from "@/features/users/UsersTable";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Icon
// import { FolderUp } from "lucide-react";

// React router
import { Link } from "react-router";

export default function Users() {
  const [status, setStatus] = useState("active");
  //   const { users } = useAllUsers();
  //   console.log("users", users);

  return (
    <div>
      <PageMeta title="User Role" description="" />

      <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
        <h1 className="text-2xl text-color font-bold">Users</h1>

        {/* Breadcrumb */}
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link
                className={`flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-400`}
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="flex items-center gap-1.5 text-sm text-gray-800 dark:text-white/90">
              /<span className="page-title-text">Users</span>
            </li>
          </ol>
        </nav>
      </div>

      <div className="flex justify-between items-center mb-4">
        <Link className="inline-block" to="/users/create">
          {/* mb-4 */}
          <button className="bg-[#4264eb] hover:bg-[#5b78ed] border-[2px] flex flex-col justify-center h-9 transition-colors duration-150 hover:border-[#4b6cee] border-[#a0afee] text-sm dark:text-white text-white px-4 py-2 rounded-md">
            Add New
          </button>
        </Link>
        {/* mb-4 */}
        <div className="flex gap-2">
          {/* <Button variant="outline" size="sm">
            Import
            <svg
              className="fill-current"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.0018 14.083C9.7866 14.083 9.59255 13.9924 9.45578 13.8472L5.61586 10.0097C5.32288 9.71688 5.32272 9.242 5.61552 8.94902C5.90832 8.65603 6.3832 8.65588 6.67618 8.94868L9.25182 11.5227L9.25182 3.33301C9.25182 2.91879 9.5876 2.58301 10.0018 2.58301C10.416 2.58301 10.7518 2.91879 10.7518 3.33301L10.7518 11.5193L13.3242 8.94866C13.6172 8.65587 14.0921 8.65604 14.3849 8.94903C14.6777 9.24203 14.6775 9.7169 14.3845 10.0097L10.5761 13.8154C10.4385 13.979 10.2323 14.083 10.0018 14.083ZM4.0835 13.333C4.0835 12.9188 3.74771 12.583 3.3335 12.583C2.91928 12.583 2.5835 12.9188 2.5835 13.333V15.1663C2.5835 16.409 3.59086 17.4163 4.8335 17.4163H15.1676C16.4102 17.4163 17.4176 16.409 17.4176 15.1663V13.333C17.4176 12.9188 17.0818 12.583 16.6676 12.583C16.2533 12.583 15.9176 12.9188 15.9176 13.333V15.1663C15.9176 15.5806 15.5818 15.9163 15.1676 15.9163H4.8335C4.41928 15.9163 4.0835 15.5806 4.0835 15.1663V13.333Z"
                fill="currentColor"
              />
            </svg>
          </Button>
          <Button variant="outline" size="sm">
            Export
            <FolderUp strokeWidth={2} size={19} />
          </Button> */}
          {/* <SelectDemo /> */}
          <Select value={status} onValueChange={setStatus}>
            {/* Change trigger background and text color */}
            {/* pl-3 pr-3 */}
            <SelectTrigger className="w-[7rem] py-5 text-sm text-gray-800 bg-white border border-gray-300 rounded-lg h-9 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            {/* Change dropdown background */}
            <SelectContent className="border-gray-300 dark:border-gray-700 dark:bg-gray-900">
              <SelectGroup>
                <SelectLabel className="text-gray-800 dark:text-white/90">
                  Filter
                </SelectLabel>
                {/* Change item colors and hover states */}
                <SelectItem
                  value="active"
                  className="text-gray-500 dark:text-gray-400 focus:bg-brand-50 dark:focus:bg-gray-800"
                >
                  Active
                </SelectItem>
                <SelectItem
                  value="inactive"
                  className="text-gray-500 dark:text-gray-400 focus:bg-brand-50 dark:focus:bg-gray-800"
                >
                  Inactive
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border-1 dark:bg-gray-900 dark:border-gray-800 p-6 rounded-md bg-white shadow-md">
        {/* <ComponentCard title="Data Table 2"> */}
        <UsersTable filterStatus={status} />
        {/* </ComponentCard> */}
      </div>
    </div>
  );
}

{
  /* <svg
                className="fill-current"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.0018 14.083C9.7866 14.083 9.59255 13.9924 9.45578 13.8472L5.61586 10.0097C5.32288 9.71688 5.32272 9.242 5.61552 8.94902C5.90832 8.65603 6.3832 8.65588 6.67618 8.94868L9.25182 11.5227L9.25182 3.33301C9.25182 2.91879 9.5876 2.58301 10.0018 2.58301C10.416 2.58301 10.7518 2.91879 10.7518 3.33301L10.7518 11.5193L13.3242 8.94866C13.6172 8.65587 14.0921 8.65604 14.3849 8.94903C14.6777 9.24203 14.6775 9.7169 14.3845 10.0097L10.5761 13.8154C10.4385 13.979 10.2323 14.083 10.0018 14.083ZM4.0835 13.333C4.0835 12.9188 3.74771 12.583 3.3335 12.583C2.91928 12.583 2.5835 12.9188 2.5835 13.333V15.1663C2.5835 16.409 3.59086 17.4163 4.8335 17.4163H15.1676C16.4102 17.4163 17.4176 16.409 17.4176 15.1663V13.333C17.4176 12.9188 17.0818 12.583 16.6676 12.583C16.2533 12.583 15.9176 12.9188 15.9176 13.333V15.1663C15.9176 15.5806 15.5818 15.9163 15.1676 15.9163H4.8335C4.41928 15.9163 4.0835 15.5806 4.0835 15.1663V13.333Z"
                  fill="currentColor"
                />
              </svg> */
}
