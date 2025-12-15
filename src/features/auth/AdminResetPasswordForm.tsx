// Component
import { useForm, type SubmitHandler } from "react-hook-form";
import CustomizedInput from "../../components/form/input/CustomizedInput";
import Label from "../../components/form/Label";
import Button from "../../components/ui/button/Button";
import type { AdminResetPassword } from "@/types/auth";
import { useState } from "react";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import type { User4 } from "@/types/user";
import { useAdminResetPassword } from "./useAdminResetPassword";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";

interface AdminResetPasswordForm {
  user: User4 | undefined;
  closeModal: () => void;
}

export default function AdminResetPasswordForm({
  user,
  closeModal,
}: AdminResetPasswordForm) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<AdminResetPassword>();
  const {
    adminResetPassword,
    // isLoading
  } = useAdminResetPassword();
  // Inside your component
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  console.log("itemToDelete in modal", user);

  const onSubmit: SubmitHandler<AdminResetPassword> = (data) => {
    // For testing
    // console.log("data:", data);
    // console.log("Errors:", errors);

    if (!user) {
      console.log("user is undefined");
      return;
    }

    const userId = user?.id.toString();

    const passwords: AdminResetPassword = {
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword,
    };

    adminResetPassword(
      { userId, passwords },
      {
        onSuccess: () => {},

        onError: (err) => {
          let message = "An error occurred";

          if (isAxiosError(err) && err.response?.data?.message) {
            message = err.response.data.message; // safe now
          } else if (err instanceof Error) {
            message = err.message;
          }

          toast.error(message);
        },
      }
    );

    reset(); // Reset the form
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h4 className="mb-7 text-md font-medium text-gray-800 dark:text-white/90">
        Reset Password For User:{" "}
        <span className="font-bold">{user?.userId}</span>
      </h4>

      <div className="flex flex-col gap-4">
        <div className="grid lg:grid-cols-[10rem_1fr] items-start gap-[0.1rem]">
          <Label
            htmlFor="newPassword"
            className="mb-0.5 text-gray-700 dark:text-gray-100 pt-2 font-normal"
          >
            New Password<span className="text-red-500"> *</span>
          </Label>

          <div>
            <div className="relative">
              <CustomizedInput
                type={showPassword ? "text" : "password"}
                error={!!errors.newPassword}
                placeholder="Enter Password"
                id="newPassword"
                className={`px-3 py-2 border rounded-md focus:outline-none ${
                  errors.newPassword
                    ? "border-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                } dark:bg-gray-800 dark:text-white dark:border-gray-600`}
                {...register("newPassword", {
                  required: "New password is required.",
                })}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
              >
                {showPassword ? (
                  <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                ) : (
                  <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                )}
              </button>
            </div>

            {errors.newPassword && (
              <span className="text-red-500 text-sm mt-1 block">
                {errors.newPassword.message}
              </span>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-[10rem_1fr] items-start gap-[0.1rem]">
          <Label
            htmlFor="confirmPassword"
            className="mb-0.5 text-gray-700 dark:text-gray-100 pt-2 font-normal"
          >
            Confirm Password<span className="text-red-500"> *</span>
          </Label>

          <div>
            <div className="relative">
              <CustomizedInput
                // type="password"

                type={showConfirmPassword ? "text" : "password"}
                error={!!errors.confirmPassword}
                placeholder="Enter Confirm Password"
                id="confirmPassword"
                className={`px-3 py-2 border rounded-md focus:outline-none ${
                  errors.confirmPassword
                    ? "border-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                } dark:bg-gray-800 dark:text-white dark:border-gray-600`}
                {...register("confirmPassword", {
                  required: "Confirm password is required.",
                  validate: (value) =>
                    value === watch("newPassword") || "Passwords do not match",
                })}
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
              >
                {showConfirmPassword ? (
                  <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                ) : (
                  <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                )}
              </button>
            </div>

            {errors.confirmPassword && (
              <span className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end w-full gap-3 mt-6">
        <Button size="sm" variant="outline" type="button" onClick={closeModal}>
          Close
        </Button>
        <Button size="sm" type="submit">
          Save
        </Button>
      </div>
    </form>
  );
}

{
  /* <div className="flex flex-col">
            <CustomizedInput
              type="password"
              autoFocus={true}
              error={!!errors.newPassword}
              placeholder="Enter New Password"
              id="reqTypeName"
              className={`px-3 py-2 border rounded-md focus:outline-none ${
                errors.newPassword
                  ? "border-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              } dark:bg-gray-800 dark:text-white dark:border-gray-600`}
              {...register("newPassword", {
                required: "New Password is required",
                maxLength: {
                  value: 50,
                  message: "Request type name must be less than 50 characters",
                },
                minLength: {
                  value: 2,
                  message: "Request type name must be at least 2 characters",
                },
              })}
            />
            {errors.newPassword && (
              <span className="text-red-500 text-sm mt-1">
                {errors.newPassword.message}
              </span>
            )}
          </div> */
}

{
  /* <div className="relative">
            <CustomizedInput
              // type="password"
              type={showPassword ? "text" : "password"}
              error={!!errors.newPassword}
              placeholder="Enter Password"
              id="newPassword"
              className={`px-3 py-2 border rounded-md focus:outline-none ${
                errors.newPassword
                  ? "border-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              } dark:bg-gray-800 dark:text-white dark:border-gray-600`}
              {...register("newPassword", {
                required: "New password is required.",
              })}
            />
            {errors.newPassword && (
              <span className="text-red-500 text-sm mt-1">
                {errors.newPassword.message}
              </span>
            )}

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
            >
              {showPassword ? (
                <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
              ) : (
                <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
              )}
            </button>
          </div> */
}

{
  /* ======================================= */
}

{
  /* <div className="flex flex-col">
            <CustomizedInput
              type="password"
              autoFocus={true}
              error={!!errors.confirmPassword}
              placeholder="Enter Confirm Password"
              id="reqTypeName"
              className={`px-3 py-2 border rounded-md focus:outline-none ${
                errors.confirmPassword
                  ? "border-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              } dark:bg-gray-800 dark:text-white dark:border-gray-600`}
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                maxLength: {
                  value: 50,
                  message: "Request type name must be less than 50 characters",
                },
                minLength: {
                  value: 2,
                  message: "Request type name must be at least 2 characters",
                },
              })}
            />
            {errors.confirmPassword && (
              <span className="text-red-500 text-sm mt-1 block">
                {errors.confirmPassword.message}
              </span>
            )}
          </div> */
}
