import useChangePassword from "@/features/auth/useChangePassword";
import type { ChangePassword } from "@/types/auth";
import { useState } from "react";
// React hook form
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

// export default function UserProfileChangePassword() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     control,
//     formState,
//     watch,
//   } = useForm<ChangePassword>();
//   const { isLoading, changePassword } = useChangePassword();

//   return (
//     // <div className="rounded-2xl border border-gray-200  p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
//     <div className="space-y-6">
//       {/* Change Password Card */}
//       <div className="p-5 border border-gray-200 bg-white rounded-2xl dark:bg-white/[0.03] dark:border-gray-800 lg:py-8 lg:px-10">
//         {/* lg:justify-between */}
//         <div className="flex flex-col gap-20 lg:flex-row lg:items-start ">
//           <div className="lg:max-w-xs">
//             <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-2">
//               Change Password
//             </h4>
//             <p className="text-sm text-gray-500 dark:text-gray-400">
//               Change your password or recover your current one. After a
//               successful password update, you will be redirected to the login
//               page where you can log in with your new password.
//             </p>
//           </div>

//           <div className="flex-1 lg:max-w-md space-y-4">
//             <div>
//               <label
//                 htmlFor="current-password"
//                 className="block mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400"
//               >
//                 Current password
//               </label>
//               <input
//                 type="password"
//                 id="current-password"
//                 className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter current password"
//               />
//               <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
//                 You must provide your current password in order to change it.
//               </p>
//             </div>

//             <div>
//               <label
//                 htmlFor="new-password"
//                 className="block mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400"
//               >
//                 New password
//               </label>
//               <input
//                 type="password"
//                 id="new-password"
//                 className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter new password"
//               />
//             </div>

//             <div>
//               <label
//                 htmlFor="password-confirmation"
//                 className="block mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400"
//               >
//                 Password confirmation
//               </label>
//               <input
//                 type="password"
//                 id="password-confirmation"
//                 className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Confirm new password"
//               />
//             </div>

//             <div className="flex items-center gap-4 pt-2">
//               <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700">
//                 Save password
//               </button>
//               <a
//                 href="#"
//                 className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
//               >
//                 I forgot my password
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     // </div>
//   );
// }

export default function UserProfileChangePassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<ChangePassword>();

  const { isLoading, changePassword } = useChangePassword();

  const newPassword = watch("newPassword");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit: SubmitHandler<ChangePassword> = (data) => {
    console.log("changePassword form data: ", data);

    const changePasswordData: ChangePassword = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword,
    };

    changePassword(changePasswordData, {
      onSuccess: () => {
        toast.success("Password reset successfully");
        reset(); // Reset form after successful submission
      },
    });
  };

  // return (
  //   <div className="space-y-6">
  //     {/* Change Password Card */}
  //     <div className="p-5 border border-gray-200 bg-white rounded-2xl dark:bg-white/[0.03] dark:border-gray-800 lg:py-8 lg:px-10">
  //       <div className="flex flex-col gap-20 lg:flex-row lg:items-start">
  //         <div className="lg:max-w-xs">
  //           <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-2">
  //             Change Password
  //           </h4>
  //           <p className="text-sm text-gray-500 dark:text-gray-400">
  //             Change your password or recover your current one. After a
  //             successful password update, you will be redirected to the login
  //             page where you can log in with your new password.
  //           </p>
  //         </div>

  //         <form
  //           onSubmit={handleSubmit(onSubmit)}
  //           className="flex-1 lg:max-w-md space-y-4"
  //         >
  //           <div>
  //             <label
  //               htmlFor="old-password"
  //               className="block mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400"
  //             >
  //               Current password
  //             </label>
  //             <input
  //               type="password"
  //               id="old-password"
  //               {...register("oldPassword", {
  //                 required: "Current password is required",
  //               })}
  //               className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
  //               placeholder="Enter current password"
  //               disabled={isLoading}
  //             />

  //             {errors.oldPassword && (
  //               <p className="mt-1 text-xs text-red-500">
  //                 {errors.oldPassword.message}
  //               </p>
  //             )}
  //             <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
  //               You must provide your current password in order to change it.
  //             </p>
  //           </div>

  //           <div>
  //             <label
  //               htmlFor="new-password"
  //               className="block mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400"
  //             >
  //               New password
  //             </label>
  //             <input
  //               type="password"
  //               id="new-password"
  //               {...register("newPassword", {
  //                 required: "New password is required",
  //                 minLength: {
  //                   value: 8,
  //                   message: "Password must be at least 8 characters",
  //                 },
  //                 pattern: {
  //                   value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
  //                   message:
  //                     "Password must contain uppercase, lowercase, and number",
  //                 },
  //               })}
  //               className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
  //               placeholder="Enter new password"
  //               disabled={isLoading}
  //             />
  //             {errors.newPassword && (
  //               <p className="mt-1 text-xs text-red-500">
  //                 {errors.newPassword.message}
  //               </p>
  //             )}
  //           </div>

  //           <div>
  //             <label
  //               htmlFor="confirm-password"
  //               className="block mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400"
  //             >
  //               Password confirmation
  //             </label>
  //             <input
  //               type="password"
  //               id="confirm-password"
  //               {...register("confirmPassword", {
  //                 required: "Password confirmation is required",
  //                 validate: (value) =>
  //                   value === newPassword || "Passwords do not match",
  //               })}
  //               className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
  //               placeholder="Confirm new password"
  //               disabled={isLoading}
  //             />
  //             {errors.confirmPassword && (
  //               <p className="mt-1 text-xs text-red-500">
  //                 {errors.confirmPassword.message}
  //               </p>
  //             )}
  //           </div>

  //           <div className="flex items-center gap-4 pt-2">
  //             <button
  //               type="submit"
  //               disabled={isLoading}
  //               className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
  //             >
  //               {isLoading ? "Saving..." : "Save password"}
  //             </button>
  //           </div>
  //         </form>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div className="space-y-6">
      {/* Change Password Card */}
      <div className="p-5 border border-gray-200 bg-white rounded-2xl dark:bg-white/[0.03] dark:border-gray-800 lg:py-8 lg:px-10">
        <div className="flex flex-col gap-20 lg:flex-row lg:items-start">
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

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex-1 lg:max-w-md space-y-4"
          >
            <div>
              <label
                htmlFor="old-password"
                className="block mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400"
              >
                Current password
              </label>
              <div className="relative">
                <input
                  type={showOldPassword ? "text" : "password"}
                  id="old-password"
                  {...register("oldPassword", {
                    required: "Current password is required",
                  })}
                  className="
                    w-full px-3 py-2 pr-12 text-sm border rounded-lg
                    text-gray-900 dark:text-white
                    placeholder-gray-500 dark:placeholder-gray-400
                    bg-white dark:bg-gray-800
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                  "
                  placeholder="Enter current password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  {showOldPassword ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>

              {errors.oldPassword && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.oldPassword.message}
                </p>
              )}
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
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  id="new-password"
                  {...register("newPassword", {
                    required: "New password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                      message:
                        "Password must contain uppercase, lowercase, and number",
                    },
                  })}
                  // className="w-full px-3 py-2 pr-10 text-sm border border-gray-300 rounded-lg dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  className="
                    w-full px-3 py-2 pr-12 text-sm border rounded-lg
                    text-gray-900 dark:text-white
                    placeholder-gray-500 dark:placeholder-gray-400
                    bg-white dark:bg-gray-800
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                  "
                  placeholder="Enter new password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  {showNewPassword ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {errors.newPassword && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirm-password"
                className="block mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400"
              >
                Password confirmation
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirm-password"
                  {...register("confirmPassword", {
                    required: "Password confirmation is required",
                    validate: (value) =>
                      value === newPassword || "Passwords do not match",
                  })}
                  className="
                    w-full px-3 py-2 pr-12 text-sm border rounded-lg
                    text-gray-900 dark:text-white
                    placeholder-gray-500 dark:placeholder-gray-400
                    bg-white dark:bg-gray-800
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                  "
                  placeholder="Confirm new password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  {showConfirmPassword ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="flex items-center gap-4 pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Saving..." : "Save password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
