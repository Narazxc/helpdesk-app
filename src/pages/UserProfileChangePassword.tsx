export default function UserProfileChangePassword() {
  return (
    // <div className="rounded-2xl border border-gray-200  p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
    <div className="space-y-6">
      {/* Change Password Card */}
      <div className="p-5 border border-gray-200 bg-white rounded-2xl dark:bg-white/[0.03] dark:border-gray-800 lg:py-8 lg:px-10">
        {/* lg:justify-between */}
        <div className="flex flex-col gap-20 lg:flex-row lg:items-start ">
          <div className="lg:max-w-xs">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-2">
              Change Password
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Change your password or recover your current one. After a
              successful password update, you will be redirected to the login
              page where you can log in with your new password.
            </p>
          </div>

          <div className="flex-1 lg:max-w-md space-y-4">
            <div>
              <label
                htmlFor="current-password"
                className="block mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400"
              >
                Current password
              </label>
              <input
                type="password"
                id="current-password"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter current password"
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                You must provide your current password in order to change it.
              </p>
            </div>

            <div>
              <label
                htmlFor="new-password"
                className="block mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400"
              >
                New password
              </label>
              <input
                type="password"
                id="new-password"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter new password"
              />
            </div>

            <div>
              <label
                htmlFor="password-confirmation"
                className="block mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400"
              >
                Password confirmation
              </label>
              <input
                type="password"
                id="password-confirmation"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm new password"
              />
            </div>

            <div className="flex items-center gap-4 pt-2">
              <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700">
                Save password
              </button>
              <a
                href="#"
                className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
              >
                I forgot my password
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
}
