export default function UserAuditPage() {
  return (
    <div className="text-gray-700 text-md p-4">
      <div className="mb-4.5 flex flex-col gap-2 pl-3">
        <div className="grid grid-cols-[20rem_1fr] text-gray-700 dark:text-gray-100">
          <p>User ID:</p>
          <p className="font-bold">nimol.sun</p>
        </div>

        <div className="grid grid-cols-[20rem_1fr] text-gray-700 dark:text-gray-100">
          <p>Username:</p>
          <p>Sun Nimol</p>
        </div>
      </div>

      <p className="text-amber-700 text-lg font-bold mb-2.5">
        Audit Information
      </p>
      <div className="flex flex-col gap-2 pl-3 text-md">
        <div className="grid grid-cols-[20rem_1fr] text-gray-700 dark:text-gray-100">
          <p>Last update user ID:</p>
          <p className="font-bold">nimol.sun</p>
        </div>
        <div className="grid grid-cols-[20rem_1fr] text-gray-700 dark:text-gray-100">
          <p>Last update Date Time:</p>
          <p>20/01/2025 3:16:15PM</p>
        </div>
        <div className="grid grid-cols-[20rem_1fr] text-gray-700 dark:text-gray-100">
          <p>Create Date Time:</p>
          <p>04/09/2025 3:26:03PM</p>
        </div>
        <div className="grid grid-cols-[20rem_1fr] text-gray-700 dark:text-gray-100">
          <p>Last Signon Date Time:</p>
          <p>26/02/2025 11:18.48PM</p>
        </div>
      </div>
    </div>
  );
}
