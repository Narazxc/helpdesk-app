// Component
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Spinner } from "@/components/ui/spinner";

// React router
import { Link, useNavigate } from "react-router";

// React hook form
import { useForm, useWatch } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

// Toast
import toast from "react-hot-toast";

// Type
import type { ChangePassword } from "@/types/auth";

// Hook
import useChangePassword from "./useChangePassword";

// Icon
import { CircleCheck } from "lucide-react";
import { useState } from "react";
import { EyeCloseIcon, EyeIcon } from "@/icons";

export default function ChangePasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    formState,
    watch,
  } = useForm<ChangePassword>();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const { changePassword, isLoading: isChangingPassword } = useChangePassword();

  const newPassword = useWatch({ control, name: "newPassword" }) || "";

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
        localStorage.removeItem("cpw");

        navigate("/", { replace: true });
      },

      // // temp testing
      // onSettled: () => {
      //   toast.success("Password reset successfully");
      // },
    });
  };

  // Helper functions to check each requirement
  const hasMinLength = newPassword.length >= 8;
  const hasUpperCase = /[A-Z]/.test(newPassword);
  const hasLowerCase = /[a-z]/.test(newPassword);
  const hasNumber = /\d/.test(newPassword);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex items-center justify-center"
    >
      <div className="dark:bg-gray-900 flex border flex-col gap-6 w-full max-w-[28rem] md:max-w-[30rem] bg-white px-4 sm:px-8 py-8 shadow-sm rounded-md">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-xl font-semibold">Change Password</h1>
          <span
            // className="sr-only"
            className="text-gray-500 text-sm"
          >
            Create a new password for your account
          </span>
        </div>

        <div className="flex flex-col gap-4">
          {/* Original form without hide password button */}
          {/* <div className="flex flex-col gap-1">
            <div className="grid text-sm gap-2">
              <Label className="font-[500]" htmlFor="oldPassword">
                Current Password
              </Label>
              <Input
                id="oldPassword"
                type="password"
                // placeholder="New Password"
                placeholder="••••••••"
                className="h-10"
                {...register("oldPassword", {
                  required: "Current password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  maxLength: {
                    value: 50,
                    message: "Password must be less than 50 characters",
                  },
                })}
              />
            </div>
            {errors.oldPassword && (
              <span className={`text-red-500 text-sm`}>
                {errors.oldPassword.message}
              </span>
            )}
          </div> */}

          <div className="flex flex-col gap-1">
            <div className="grid text-sm gap-2">
              <Label className="font-[500]" htmlFor="oldPassword">
                Current Password
              </Label>
              <div className="relative">
                <Input
                  id="oldPassword"
                  type={showOldPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="h-10"
                  {...register("oldPassword", {
                    required: "Current password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    maxLength: {
                      value: 50,
                      message: "Password must be less than 50 characters",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                >
                  {showOldPassword ? (
                    <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                  ) : (
                    <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                  )}
                </button>
              </div>
            </div>
            {errors.oldPassword && (
              <span className={`text-red-500 text-sm`}>
                {errors.oldPassword.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <div className="grid text-sm gap-2">
              <Label className="font-[500]" htmlFor="newPassword">
                New Password
              </Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  // placeholder="New Password"
                  placeholder="••••••••"
                  className="h-10"
                  {...register("newPassword", {
                    required: "New password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    maxLength: {
                      value: 50,
                      message: "Password must be less than 50 characters",
                    },
                    validate: {
                      hasUpperCase: (value) =>
                        /[A-Z]/.test(value) ||
                        "Password must contain at least one uppercase letter",
                      hasLowerCase: (value) =>
                        /[a-z]/.test(value) ||
                        "Password must contain at least one lowercase letter",
                      hasNumber: (value) =>
                        /\d/.test(value) ||
                        "Password must contain at least one number",
                      hasSpecialChar: (value) =>
                        /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                        "Password must contain at least one special character",
                      minLength: (value) =>
                        value.length >= 8 ||
                        "Password must be at least 8 characters",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                >
                  {showNewPassword ? (
                    <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                  ) : (
                    <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                  )}
                </button>
              </div>
            </div>
            {/* {errors.newPassword && (
              <span className={`text-red-500 text-sm`}>
                {errors.newPassword.message}
              </span>
            )} */}

            {/* Strong password indicator */}
            <div className="mt-2 space-y-1 ml-3">
              <div
                className={`${
                  hasMinLength
                    ? "text-green-600"
                    : formState.isSubmitted && !hasMinLength
                    ? "text-red-500"
                    : "text-gray-500"
                } flex items-center gap-2 text-sm transition-colors duration-300`}
              >
                <span>
                  <CircleCheck size={16} />
                </span>
                <p>At least 8 characters</p>
              </div>
              <div
                className={`${
                  hasUpperCase
                    ? "text-green-600"
                    : formState.isSubmitted && !hasUpperCase
                    ? "text-red-500"
                    : "text-gray-500"
                } flex items-center gap-2 text-sm transition-colors duration-300`}
              >
                <span>
                  <CircleCheck size={16} />
                </span>
                <p>Uppercase</p>
              </div>
              <div
                className={`${
                  hasLowerCase
                    ? "text-green-600"
                    : formState.isSubmitted && !hasLowerCase
                    ? "text-red-500"
                    : "text-gray-500"
                } flex items-center gap-2 text-sm transition-colors duration-300`}
              >
                <span>
                  <CircleCheck size={16} />
                </span>
                <p>Lowercase</p>
              </div>
              <div
                className={`${
                  hasSpecialChar
                    ? "text-green-600"
                    : formState.isSubmitted && !hasSpecialChar
                    ? "text-red-500"
                    : "text-gray-500"
                } flex items-center gap-2 text-sm transition-colors duration-300`}
              >
                <span>
                  <CircleCheck size={16} />
                </span>
                <p>Special character</p>
              </div>
              <div
                className={`${
                  hasNumber
                    ? "text-green-600"
                    : formState.isSubmitted && !hasNumber
                    ? "text-red-500"
                    : "text-gray-500"
                } flex items-center gap-2 text-sm transition-colors duration-300`}
              >
                <span>
                  <CircleCheck size={16} />
                </span>
                <p>Number</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="grid text-sm gap-2">
              <Label className="font-[500]" htmlFor="confirmPassword">
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  // type="password"
                  type={showConfirmPassword ? "text" : "password"}
                  // placeholder="Confirm Password"
                  placeholder="••••••••"
                  className="h-10"
                  {...register("confirmPassword", {
                    required: "Please confirm your new password",
                    validate: (value) =>
                      value === watch("newPassword") ||
                      "Passwords do not match",
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
            </div>
            {errors.confirmPassword && (
              <span className={`text-red-500 text-sm`}>
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <Button
            type="submit"
            disabled={isChangingPassword}
            className="w-full font-medium h-10 bg-blue-600/90 dark:bg-blue-600/80 hover:bg-blue-500 dark:text-[#f9fafc]"
          >
            {!isChangingPassword ? <span>Change Password</span> : <Spinner />}
          </Button>

          <p className="text-sm text-right text-gray-500 dark:text-[#f9fafc]">
            Remember Password?{" "}
            <Link
              className="text-black hover:underline dark:text-[#f9fafc]"
              to="/signin"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
}
