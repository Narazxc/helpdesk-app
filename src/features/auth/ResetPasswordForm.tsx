// Component
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Spinner } from "@/components/ui/spinner";

// React router
import { Link, useSearchParams } from "react-router";

// React hook form
import { useForm, useWatch } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

// Toast
import toast from "react-hot-toast";

// Type
import type { ResetPassword } from "@/types/auth";

// Hook
import useResetPassword from "./useResetPassword";

// Icon
import { CircleCheck } from "lucide-react";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import { useState } from "react";

export default function ResetPasswordForm() {
  const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
    control,
    watch,
  } = useForm<ResetPassword>();
  const [searchParams] = useSearchParams();

  // Inside your component
  const newPassword = useWatch({ control, name: "newPassword" }) || "";
  // const [showPassword, setShowPassword] = useState(false);

  const { resetPassword, isLoading: isResettingPassword } = useResetPassword();

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const onSubmit: SubmitHandler<ResetPassword> = (data) => {
    console.log("resetPassword form data: ", data);

    const token = searchParams.get("token");

    if (!token) {
      // Handle missing token case
      toast.error("Invalid or missing reset token");
      return;
    }

    const resetPasswordData: ResetPassword = {
      token,
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword,
    };

    console.log("resetPasswordData", resetPasswordData);

    // Uncomment when ready to use
    resetPassword(resetPasswordData, {
      onSuccess: () => {
        toast.success("Password reset successfully");
        setResetSuccess(true);
      },

      onError: () => {
        toast.error("Fail");
      },

      // Use onSettled (temporary)
      // onSettled: () => {
      //   toast.success("Password reset successfully");
      // },
    });
  };

  // Getting value from url query strings
  // console.log("search param: ", searchParams.get("token"));
  // console.log("search param: ", searchParams.get("abc"));

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
          <h1 className="text-xl font-semibold">Reset Password</h1>
          <span
            // className="sr-only"
            className="text-gray-500 text-sm"
          >
            Create a new password for your account
          </span>
        </div>

        {resetSuccess ? (
          <div className="flex flex-col gap-6">
            <div>
              <div className="grid text-sm gap-2">
                <Label className="font-[500]" htmlFor="newPassword">
                  New Password
                </Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    // placeholder="New Password"
                    type={showNewPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="h-10"
                    {...register("newPassword", {
                      required: "Password is required",
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
                    onClick={() => {
                      console.log("Click");
                      setShowNewPassword(!showNewPassword);
                    }}
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
              <span className={`text-red-500 text-sm mt-2`}>
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

            <div>
              <div className="grid text-sm gap-2">
                <Label className="font-[500]" htmlFor="confirmPassword">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    // placeholder="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="h-10"
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === watch("newPassword") ||
                        "Passwords do not match",
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setShowConfirmPassword(!showConfirmPassword);
                    }}
                    className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                  >
                    {showNewPassword ? (
                      <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                    ) : (
                      <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <span className={`text-red-500 text-sm mt-2`}>
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>
            </div>

            <Button
              // onClick={handleForgotPassword}
              type="submit"
              disabled={isResettingPassword}
              className="w-full font-medium h-10 bg-blue-600/90 dark:bg-blue-600/80 hover:bg-blue-500 dark:text-[#f9fafc]"
            >
              {!isResettingPassword ? <span>Reset Password</span> : <Spinner />}
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
        ) : (
          <ResetPasswordSuccessfulMessageBox />
        )}
      </div>
    </form>
  );
}

function ResetPasswordSuccessfulMessageBox() {
  return (
    <div
      data-slot="alert"
      role="alert"
      className="relative w-full rounded-lg border px-4 py-3 text-sm grid has-[&gt;svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[&gt;svg]:gap-x-3 gap-y-0.5 items-start [&amp;&gt;svg]:size-4 [&amp;&gt;svg]:translate-y-0.5 [&amp;&gt;svg]:text-current bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-300"
    >
      <div
        data-slot="alert-description"
        className="text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&amp;_p]:leading-relaxed"
      >
        Your password has been successfully reset. You can now{" "}
        <Link to="/signin" className="font-medium underline">
          sign in
        </Link>{" "}
        with your new credentials.
      </div>
    </div>
  );
}

{
  /* <div className="flex flex-col gap-6">
          <div className="grid text-sm gap-2">
            <Label htmlFor="newPassword">Password</Label>
            <Input
              id="newPassword"
              type="password"
              placeholder="Password"
              // required
              className="h-10"
              {...register("newPassword", {
                required: "Password is required",
                maxLength: {
                  value: 50,
                  message: "Password must be less than 50 characters",
                },
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            {errors.newPassword && (
              <span className="text-red-500 text-sm mt-1">
                {errors.newPassword.message}
              </span>
            )}
          </div>

          <div className="grid text-sm gap-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              // required
              className="h-10"
              {...register("confirmPassword", {
                required: "Comfirm Password is required",
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
              <span className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </span>
            )}
          </div> */
}
