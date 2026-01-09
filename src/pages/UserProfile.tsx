import { useCurrentUserProfile } from "@/features/users/useCurrentUserProfile";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import {
  updateCurrentUserProfile,
  updateCurrentUserProfileImage,
} from "@/services/apiUser";
import { useQueryClient } from "@tanstack/react-query";
import CustomizedInput from "@/components/form/input/CustomizedInput";
import toast from "react-hot-toast";
// import type { ChangePassword } from "@/types/auth";
import type { UpdateCurrentUserProfile } from "@/types/user";
import { Check } from "lucide-react";

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const { currentUserProfile } = useCurrentUserProfile();
  // const fileInputRef = useRef(null);
  // const [profileImage, setProfileImage] = useState(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const [, setIsSettingProfileImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      username: "",
      userId: "",
      email: "",
      phoneNumber: "",
      operatingId: "",
      telegramId: "",
    },
  });

  // Update form when profile data loads
  useEffect(() => {
    if (currentUserProfile) {
      reset({
        username: currentUserProfile.username || "",
        userId: currentUserProfile.userId || "",
        email: currentUserProfile.email || "",
        phoneNumber: currentUserProfile.phoneNumber || "",
        operatingId: currentUserProfile.operatingId || "",
        telegramId: currentUserProfile.telegramId || "",
      });
      setProfileImage(currentUserProfile.base64Data);
    }
  }, [currentUserProfile, reset]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  // const handleImageChange = async (e) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setProfileImage(reader.result);
  //       console.log("New image selected:", file.name);
  //       // Add your upload logic here
  //       // updateCurrentUserProfileImage(file);

  //       setIsSettingProfileImage(true); // Show loading state
  //       try {
  //         await updateCurrentUserProfileImage(file);
  //         toast.success("Profile image updated successfully");
  //       } catch (error) {
  //         console.error("Failed to upload image:", error);
  //         toast.error("Failed to update profile image");
  //         // Revert to previous image on error
  //       } finally {
  //         setIsSettingProfileImage(false);
  //       }
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        // Add async here!
        setProfileImage(reader.result as string);
        console.log("New image selected:", file.name);

        setIsSettingProfileImage(true); // Show loading state
        try {
          await updateCurrentUserProfileImage(file);
          toast.success("Profile image updated successfully");
          // queryClient.invalidateQueries("");
          queryClient.invalidateQueries({ queryKey: ["currentUserProfile"] });
        } catch (error) {
          console.error("Failed to upload image:", error);
          toast.error("Failed to update profile image");
          // Revert to previous image on error
        } finally {
          setIsSettingProfileImage(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: UpdateCurrentUserProfile) => {
    // console.log("Saved data:", data);
    // console.log("Profile image:", profileImage);
    // // Add your API call here to save the data
    // setIsEditing(false);

    try {
      const updateData = data;

      console.log("Submitting data:", updateData);

      const result = await updateCurrentUserProfile(updateData);

      console.log("Profile updated successfully:", result);
      queryClient.invalidateQueries({
        queryKey: ["currentUserProfile"],
      });

      // Optionally show success message to user
      // toast.success("Profile updated successfully");

      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
      // Optionally show error message to user
      // toast.error("Failed to update profile");
    }
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-950">
      <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
        <h1 className="text-2xl text-color font-bold">Profile</h1>

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
              /<span className="page-title-text">Profile</span>
            </li>
          </ol>
        </nav>
      </div>

      <div className="space-y-6">
        <div className="p-5 bg-white border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
              <div
                className="relative w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800 group cursor-pointer"
                onClick={handleImageClick}
              >
                {!profileImage ? (
                  <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-semibold flex-shrink-0">
                    {currentUserProfile?.username
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                ) : (
                  <img
                    src={profileImage}
                    alt="user"
                    className="w-full h-full object-cover"
                  />
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                {/* Hidden File Input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
              <div className="order-3 xl:order-2">
                <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                  {currentUserProfile?.username}
                </h4>
                <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Team Manager
                  </p>
                  <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Arizona, United States
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6 bg-white dark:bg-gray-900">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-6">
                  User Information
                </h4>

                <div className="grid grid-cols-1 gap-x-4 gap-y-5 lg:grid-cols-2 lg:gap-x-6">
                  {/* Username */}
                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Username
                    </p>
                    {isEditing ? (
                      // <input
                      //   type="text"
                      //   {...register("username")}
                      //   disabled
                      //   className="w-full px-3 py-2 text-sm font-medium text-gray-800 dark:text-white/90 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg cursor-not-allowed opacity-60"
                      // />

                      <CustomizedInput
                        type="text"
                        error={!!errors.username}
                        placeholder="Enter Username"
                        id="userName"
                        disabled
                        className={`px-3 py-2 border h-[38px] focus:outline-none w-full text-sm font-medium text-gray-800 dark:text-white/90 bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-lg cursor-not-allowed opacity-60 ${
                          errors.username
                            ? "border-red-500"
                            : "border-gray-300 focus:ring-blue-500"
                        } dark:bg-gray-800 dark:text-white dark:border-gray-600`}
                        {...register("username", {
                          required: "Username is required",
                        })}
                      />
                    ) : (
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {currentUserProfile?.username}
                      </p>
                    )}
                  </div>

                  {/* User ID */}
                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      User ID
                    </p>
                    {isEditing ? (
                      // <input
                      //   type="text"
                      //   {...register("userId")}
                      //   disabled
                      //   className="w-full px-3 py-2 text-sm font-medium text-gray-800 dark:text-white/90 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg cursor-not-allowed opacity-60"
                      // />
                      <CustomizedInput
                        type="text"
                        error={!!errors.userId}
                        placeholder="Enter User ID"
                        id="userId"
                        disabled
                        className={`px-3 py-2 border h-[38px] focus:outline-none w-full text-sm font-medium text-gray-800 dark:text-white/90 bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-lg cursor-not-allowed opacity-60 ${
                          errors.userId
                            ? "border-red-500"
                            : "border-gray-300 focus:ring-blue-500"
                        } dark:bg-gray-800 dark:text-white dark:border-gray-600`}
                        {...register("userId", {
                          required: "User ID is required",
                        })}
                      />
                    ) : (
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {currentUserProfile?.userId}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Email address
                    </p>
                    {isEditing ? (
                      // <input
                      //   type="email"
                      //   {...register("email")}
                      //   disabled
                      //   className="w-full px-3 py-2 text-sm font-medium text-gray-800 dark:text-white/90 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg cursor-not-allowed opacity-60"
                      // />

                      <CustomizedInput
                        type="text"
                        error={!!errors.email}
                        placeholder="Enter email"
                        id="email"
                        disabled
                        className={`px-3 py-2 border h-[38px] focus:outline-none w-full text-sm font-medium text-gray-800 dark:text-white/90 bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-lg cursor-not-allowed opacity-60 ${
                          errors.email
                            ? "border-red-500"
                            : "border-gray-300 focus:ring-blue-500"
                        } dark:bg-gray-800 dark:text-white dark:border-gray-600`}
                        {...register("email", {
                          required: "Email is required",
                        })}
                      />
                    ) : (
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {currentUserProfile?.email}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Phone
                    </p>
                    {isEditing ? (
                      <div>
                        {/* <input
                          type="tel"
                          {...register("phoneNumber", {
                            pattern: {
                              value:
                                /^[+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/,
                              message: "Invalid phone number",
                            },
                          })}
                          className="w-full px-3 py-2 text-sm font-medium text-gray-800 dark:text-white/90 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        /> */}

                        <CustomizedInput
                          type="text"
                          error={!!errors.phoneNumber}
                          placeholder="Enter Phone Number"
                          id="phoneNumber"
                          className={`px-3 py-2 border h-[38px] focus:outline-none w-full text-sm font-medium text-gray-800 dark:text-white/90 bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-lg ${
                            errors.email
                              ? "border-red-500"
                              : "border-gray-300 focus:ring-blue-500"
                          } dark:bg-gray-800 dark:text-white dark:border-gray-600`}
                          {...register("phoneNumber", {
                            pattern: {
                              value:
                                /^[+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/,
                              message: "Invalid phone number",
                            },
                          })}
                        />
                        {errors.phoneNumber && (
                          <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                            {errors.phoneNumber.message}
                          </p>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {currentUserProfile?.phoneNumber}
                      </p>
                    )}
                  </div>

                  {/* Entity */}
                  <div className="lg:col-span-2">
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Entity
                    </p>
                    {isEditing ? (
                      // <input
                      //   type="text"
                      //   {...register("operatingId")}
                      //   disabled
                      //   className="w-full px-3 py-2 text-sm font-medium text-gray-800 dark:text-white/90 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg cursor-not-allowed opacity-60"
                      // />
                      <CustomizedInput
                        type="text"
                        error={!!errors.operatingId}
                        placeholder="Enter Telegram ID"
                        id="operatingId"
                        disabled
                        className={`px-3 py-2 border h-[38px] focus:outline-none w-full text-sm font-medium text-gray-800 dark:text-white/90 bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-lg cursor-not-allowed opacity-60 ${
                          errors.operatingId
                            ? "border-red-500"
                            : "border-gray-300 focus:ring-blue-500"
                        } dark:bg-gray-800 dark:text-white dark:border-gray-600`}
                        {...register("operatingId", {
                          required: "Entity is required",
                        })}
                      />
                    ) : (
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {currentUserProfile?.operatingId}
                      </p>
                    )}
                  </div>

                  {/* Telegram ID */}
                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Telegram ID
                    </p>
                    {isEditing ? (
                      // <input
                      //   type="text"
                      //   {...register("telegramId")}
                      //   disabled
                      //   className="w-full px-3 py-2 text-sm font-medium text-gray-800 dark:text-white/90 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg cursor-not-allowed opacity-60"
                      // />
                      <CustomizedInput
                        type="text"
                        error={!!errors.telegramId}
                        placeholder="Please select an entity"
                        id="telegramId"
                        disabled
                        className={`px-3 py-2 border h-[38px] focus:outline-none w-full text-sm font-medium text-gray-800 dark:text-white/90 bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-lg cursor-not-allowed opacity-60 ${
                          errors.telegramId
                            ? "border-red-500"
                            : "border-gray-300 focus:ring-blue-500"
                        } dark:bg-gray-800 dark:text-white dark:border-gray-600`}
                        {...register("telegramId", {
                          // required: "Telegram ID is required",
                        })}
                      />
                    ) : (
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {currentUserProfile?.telegramId}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 w-full lg:w-auto">
                {isEditing ? (
                  <>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="flex flex-1 lg:flex-none items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex flex-1 lg:flex-none items-center justify-center gap-2 rounded-full bg-blue-600 px-4 py-3 text-sm font-medium text-white shadow-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={!isDirty}
                    >
                      {/* <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.25 4.5L6.75 12L3.75 9"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg> */}
                      <Check />
                      Save Changes
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
                  >
                    <svg
                      className="fill-current"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
                        fill=""
                      />
                    </svg>
                    Edit
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
