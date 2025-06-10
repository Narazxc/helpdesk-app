import { Fragment } from "react/jsx-runtime";
import CreateUserForm from "../../components/user/CreateUserForm";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { Link } from "react-router";
import AssingUserRoleForm from "../../components/user/AssingUserRoleForm";

const categories = [
  {
    name: "User Profile",
    component: <CreateUserForm />,
  },
  {
    name: "User Role",
    component: <AssingUserRoleForm />,
  },
  {
    name: "Audit",
    component: [],
  },
];

export default function CreateUserPage() {
  return (
    <>
      <nav className="mb-5">
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
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>

            <span> Create User </span>
          </li>
        </ol>
      </nav>

      <h1 className="text-2xl font-bold mb-3">Create User</h1>

      <div className="w-full">
        <div
          className={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]`}
        >
          <div className="px-5 py-5">
            <div className=" border-gray-100 dark:border-gray-800">
              <TabGroup>
                <TabList className="flex gap-4">
                  {categories.map(({ name }) => (
                    // <Tab
                    //   key={name}
                    //   className="border border-gray-200 rounded-xl px-3 py-1 text-sm/6 font-semibold text-black focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-white/5 data-selected:bg-white/10 data-selected:data-hover:bg-white/10"
                    // >
                    //   {name}
                    // </Tab>
                    <Tab key={name} as={Fragment}>
                      {({ selected }) => (
                        <button
                          className={`
                        border rounded-xl px-4 py-2 text-sm font-medium transition
                        ${
                          selected
                            ? "bg-blue-600/80 text-white border-blue-600 "
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                        }
                      `}
                        >
                          {name}
                        </button>
                      )}
                    </Tab>
                  ))}
                </TabList>
                <TabPanels className="mt-3">
                  {categories.map(({ name, component }) => (
                    <TabPanel key={name} className="rounded-xl bg-white/5">
                      {/* <ul>
                    {posts.map((post) => (
                      <li
                        key={post.id}
                        className="relative rounded-md p-3 text-sm/6 transition hover:bg-white/5"
                      >
                        <a href="#" className="font-semibold text-white">
                          <span className="absolute inset-0" />
                          {post.title}
                        </a>
                        <ul
                          className="flex gap-2 text-white/50"
                          aria-hidden="true"
                        >
                          <li>{post.date}</li>
                          <li aria-hidden="true">&middot;</li>
                          <li>{post.commentCount} comments</li>
                          <li aria-hidden="true">&middot;</li>
                          <li>{post.shareCount} shares</li>
                        </ul>
                      </li>
                    ))}
                  </ul> */}
                      {component}
                    </TabPanel>
                  ))}
                </TabPanels>
              </TabGroup>
            </div>
          </div>
        </div>
        {/* <CreateUserForm /> */}
      </div>
    </>
  );
}
