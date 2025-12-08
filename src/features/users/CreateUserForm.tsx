import { useState } from "react";

// React-hook-form
import { Controller, useForm, useWatch } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

// Component
import Form from "@/components/form/Form";
import Label from "@/components/form/Label";
import toast from "react-hot-toast";
import CustomizedInput from "@/components/form/input/CustomizedInput";
import { GenericCombobox } from "@/components/GenericCombobox";
import { Checkbox } from "@/components/ui/checkbox";
import Button from "@/components/ui/button/Button";

// Type
import type { CreateUser2 } from "@/types/user";

// Hook
import { useRoles } from "@/features/role/useRoles";
import { useCreateUser } from "@/features/users/useCreateUser";
import { useNavigate } from "react-router";
import { useEntities } from "@/features/entities/useEntities";
import { useRequestTypes } from "@/features/request-type/useRequestTypes";

// Icon
import { CircleCheck } from "lucide-react";
import { EyeCloseIcon, EyeIcon } from "@/icons";
// EyeIcon, EyeClosedIcon;

export default function CreateUserForm() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUser2>();
  const { entities } = useEntities();
  const { roles, isLoading: isLoadingRole } = useRoles();
  const { requestTypes, isLoading: isLoadingRequestTypes } = useRequestTypes();
  const { createUser } = useCreateUser();
  const navigate = useNavigate();

  // For checkbox
  const [checkedRoles, setCheckedRoles] = useState<string[]>([]);
  const [checkedRequestTypes, setCheckRequestTypes] = useState<string[]>([]);

  // Inside your component
  const password = useWatch({ control, name: "password" }) || "";
  const [showPassword, setShowPassword] = useState(false);

  const handleCheckChange = (roleId: string, isChecked: boolean) => {
    setCheckedRoles((prev) =>
      isChecked ? [...prev, roleId] : prev.filter((id) => id !== roleId)
    );
  };

  const handleRequestTypeCheckChange = (roleId: string, isChecked: boolean) => {
    setCheckRequestTypes((prev) =>
      isChecked ? [...prev, roleId] : prev.filter((id) => id !== roleId)
    );
  };

  const onSubmit: SubmitHandler<CreateUser2> = (data) => {
    // console.log("On submit data: ", data);

    const dataToSend: CreateUser2 = {
      username: data.username,
      // userName: data.userName,
      userId: data.userId,
      telegramId: data.telegramId,
      password: data.password,
      phoneNumber: data.phoneNumber,
      email: data.email,
      businessCode: data.businessCode,
      roleIds: checkedRoles,
      requestTypeCode: checkedRequestTypes,
    };

    console.log("data to send", dataToSend);

    createUser(dataToSend, {
      onSuccess: () => {
        navigate("/users");
        toast.success("User created successfully."); // Shows on new page
      },
      onError: (error) => {
        console.log(error);
      },
    });

    // reset(); // Reset the form
  };

  console.log("error password", errors.password);

  // Helper functions to check each requirement
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return (
    <Form className="" onSubmit={handleSubmit(onSubmit)}>
      {/* sm: */}
      <div className="grid gap-6 grid-cols-2">
        {/* Personal info section */}
        <div className="col-span-full">
          <h4 className="pb-4 text-lg mb-6 font-semibold text-gray-800 border-b border-gray-200 dark:border-gray-800 dark:text-white/90">
            Personal Info
          </h4>
          <div className="flex flex-col gap-4 lg:gap-3.5 max-w-[40rem]">
            {/* username */}
            <div className="grid  lg:grid-cols-[10rem_1fr] items-center gap-[0.1rem]">
              <Label
                htmlFor="username"
                className="mb-0.5 text-gray-700 dark:text-gray-100 pt-2 font-normal"
              >
                Username<span className="text-red-500"> *</span>
              </Label>

              <div>
                <CustomizedInput
                  type="text"
                  error={!!errors.username}
                  placeholder="Enter Username"
                  id="username"
                  className={`px-3 py-2 border rounded-md focus:outline-none ${
                    errors.username
                      ? "border-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  } dark:bg-gray-800 dark:text-white dark:border-gray-600`}
                  {...register("username", {
                    required: "Username is required",
                  })}
                />
                {errors.username && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.username.message}
                  </span>
                )}
              </div>
            </div>

            {/* userId */}
            <div className="grid lg:grid-cols-[10rem_1fr] items-center gap-[0.1rem]">
              <Label
                htmlFor="userId"
                className="text-sm font-medium mb-0.5 text-gray-700 dark:text-gray-100"
              >
                User ID<span className="text-red-500"> *</span>
              </Label>

              <div>
                <CustomizedInput
                  type="text"
                  error={!!errors.userId}
                  placeholder="Enter User ID"
                  id="userId"
                  className={`px-3 py-2 border rounded-md focus:outline-none ${
                    errors.userId
                      ? "border-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  } dark:bg-gray-800 dark:text-white dark:border-gray-600`}
                  {...register("userId", {
                    required: "User ID is required",
                  })}
                />
                {errors.userId && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.userId.message}
                  </span>
                )}
              </div>
            </div>

            {/* telegramId */}
            <div className="grid lg:grid-cols-[10rem_1fr] items-center gap-[0.1rem]">
              <Label
                htmlFor="telegramId"
                className="text-sm font-medium mb-0.5 text-gray-700 dark:text-gray-100"
              >
                Telegram ID
              </Label>

              <div>
                <CustomizedInput
                  type="text"
                  error={!!errors.telegramId}
                  placeholder="Enter Telegram ID"
                  id="telegramId"
                  className={`px-3 py-2 border rounded-md focus:outline-none ${
                    errors.telegramId
                      ? "border-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  } dark:bg-gray-800 dark:text-white dark:border-gray-600`}
                  {...register(
                    "telegramId"
                    // Remove required
                    //, {
                    //   required: "Telegram ID is required",
                    // }
                  )}
                />
                {errors.telegramId && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.telegramId.message}
                  </span>
                )}
              </div>
            </div>

            {/* password */}
            <div className="grid lg:grid-cols-[10rem_1fr] items-center gap-[0.1rem]">
              <Label
                htmlFor="password"
                className="text-sm font-medium mb-0.5 text-gray-700 dark:text-gray-100 place-self-start mt-3"
              >
                Password<span className="text-red-500"> *</span>
              </Label>

              <div>
                <div className="relative">
                  <CustomizedInput
                    // type="password"
                    type={showPassword ? "text" : "password"}
                    error={!!errors.password}
                    placeholder="Enter Password"
                    id="password"
                    className={`px-3 py-2 border rounded-md focus:outline-none ${
                      errors.password
                        ? "border-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    } dark:bg-gray-800 dark:text-white dark:border-gray-600`}
                    {...register("password", {
                      required:
                        "Password is required, please follow below format.",
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
                      // minLength: {
                      //   value: 8,
                      //   message: "Password must be at least 8 characters ",
                      // },
                    })}
                  />
                  {/* {errors.password && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </span>
                )} */}

                  {/* <p>at least 8 characters</p>
                <p>capital letter</p>
                <p>small letter</p>
                <p>special character</p>
                <p>number</p> */}
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

                {errors.password && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </span>
                )}

                <div className="mt-2 space-y-1 ml-3">
                  <div
                    className={`${
                      hasMinLength ? "text-green-600" : "text-gray-500"
                    } flex items-center gap-2 text-sm transition-colors duration-300`}
                  >
                    <span>
                      <CircleCheck size={16} />
                    </span>{" "}
                    <p>At least 8 characters</p>
                  </div>
                  <div
                    className={`${
                      hasUpperCase ? "text-green-600" : "text-gray-500"
                    } flex items-center gap-2 text-sm transition-colors duration-300`}
                  >
                    <span>
                      <CircleCheck size={16} />
                    </span>
                    <p>Capital letter</p>
                  </div>
                  <div
                    className={`${
                      hasLowerCase ? "text-green-600" : "text-gray-500"
                    } flex items-center gap-2 text-sm transition-colors duration-300`}
                  >
                    <span>
                      <CircleCheck size={16} />
                    </span>{" "}
                    <p>Small letter</p>
                  </div>
                  <div
                    className={`${
                      hasSpecialChar ? "text-green-600" : "text-gray-500"
                    } flex items-center gap-2 text-sm transition-colors duration-300`}
                  >
                    <span>
                      <CircleCheck size={16} />
                    </span>{" "}
                    <p>Special character</p>
                  </div>
                  <div
                    className={`${
                      hasNumber ? "text-green-600" : "text-gray-500"
                    } flex items-center gap-2 text-sm transition-colors duration-300`}
                  >
                    <span>
                      <CircleCheck size={16} />
                    </span>{" "}
                    <p>Number</p>
                  </div>
                </div>
              </div>
            </div>

            {/* phoneNumber */}
            <div className="grid  lg:grid-cols-[10rem_1fr] items-center gap-[0.1rem]">
              <Label
                htmlFor="phoneNumber"
                className="text-sm font-medium mb-0.5 text-gray-700 dark:text-gray-100"
              >
                Phone Number
              </Label>

              <div>
                <CustomizedInput
                  type="number"
                  error={!!errors.phoneNumber}
                  placeholder="Enter Phone Number"
                  id="phoneNumber"
                  className={`px-3 py-2 border rounded-md focus:outline-none ${
                    errors.phoneNumber
                      ? "border-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  } dark:bg-gray-800 dark:text-white dark:border-gray-600`}
                  {...register("phoneNumber", {
                    // required: "Phone Number is required",
                  })}
                />
                {errors.phoneNumber && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.phoneNumber.message}
                  </span>
                )}
              </div>
            </div>

            {/* email */}
            <div className="grid  lg:grid-cols-[10rem_1fr] items-center gap-[0.1rem]">
              <Label
                htmlFor="email"
                className="text-sm font-medium mb-0.5 text-gray-700 dark:text-gray-100"
              >
                Email <span className="text-red-500"> *</span>
              </Label>

              <div>
                <CustomizedInput
                  type="text"
                  error={!!errors.email}
                  placeholder="Enter Email"
                  id="email"
                  className={`px-3 py-2 border rounded-md focus:outline-none ${
                    errors.email
                      ? "border-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  } dark:bg-gray-800 dark:text-white dark:border-gray-600`}
                  {...register("email", {
                    required: "Email is required",
                    validate: {
                      isAllowedDomain:
                        // (value) => {
                        //   const allowedDomains = ["fmis.gov.kh"]; // add your domains here
                        //   const domain = value.split("@")[1];
                        //   return (
                        //     allowedDomains.some((d) => domain?.endsWith(d)) ||
                        //     "Email must be from an approved domain (fmis.gov.kh)"
                        //   );
                        // },

                        (value) => {
                          // Basic email format check first
                          if (!value.includes("@"))
                            return "Invalid email format";

                          const parts = value.split("@");
                          if (parts.length !== 2) return "Invalid email format";

                          const domain = parts[1].toLowerCase();
                          return (
                            domain.endsWith("fmis.gov.kh") ||
                            "Email must be a fmis.gov.kh address"
                          );
                        },
                    },
                  })}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </span>
                )}
              </div>
            </div>

            {/* entity */}
            <div className="grid lg:grid-cols-[10rem_1fr] items-center gap-[0.1rem]">
              <Label
                htmlFor="entity"
                className="text-sm font-medium mb-0.5 text-gray-700 dark:text-gray-100"
              >
                Entity <span className="text-red-500"> *</span>
              </Label>

              <div>
                <Controller
                  name="businessCode" // This is the field name in your form data
                  control={control}
                  rules={{ required: "Please select an Entity" }} // Optional validation
                  render={({ field }) => (
                    <GenericCombobox
                      id="entity"
                      items={entities}
                      value={field.value} // Use field.value instead of selectedUserId
                      onChange={field.onChange} // Use field.onChange instead of setSelectedUserId
                      getDisplayValue={(entity) =>
                        `${entity.operatingUnit} - ${entity.enLongName}`
                      }
                      getItemValue={(entity) => entity.businessCode}
                      getItemKey={(entity) => entity.businessCode}
                      placeholder="Select an Entity..."
                      searchPlaceholder="Search users..."
                      emptyMessage="No users found."
                      // error={fieldState.error?.message} // Pass validation errors if your component supports it
                    />
                  )}
                />
                {errors.businessCode && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.businessCode.message}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Assign Role section */}
        <div className="col-span-2">
          {/* text-base font-medium */}
          <h4 className="pb-4 text-lg font-semibold text-gray-800 border-b border-gray-200 dark:border-gray-800 dark:text-white/90">
            Assign Role
          </h4>
        </div>

        <div className="flex flex-col col-span-2">
          <div className="bg-gray-50 rounded-lg">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 p-6">
              {!isLoadingRole &&
                roles.map((p) => (
                  <div key={p.id} className="flex items-center gap-3">
                    <Checkbox
                      className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                      checked={checkedRoles.includes(p.id.toString())}
                      onCheckedChange={(isChecked) =>
                        handleCheckChange(p.id.toString(), isChecked as boolean)
                      }
                      id={`role-${p.id}`}
                    />
                    <Label htmlFor={`role-${p.id}`} className="mb-0">
                      {p.roleName}
                    </Label>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="col-span-2">
          {/* text-base font-medium */}
          <h4 className="pb-4 text-lg font-semibold text-gray-800 border-b border-gray-200 dark:border-gray-800 dark:text-white/90">
            Request Type
          </h4>
        </div>

        {/* Assign Request Type section */}
        <div className="flex flex-col col-span-2">
          <div className="bg-gray-50 rounded-lg">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 p-6">
              {!isLoadingRequestTypes &&
                requestTypes.map((p) => (
                  <div key={p.id} className="flex items-center gap-3">
                    <Checkbox
                      className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                      checked={checkedRequestTypes.includes(p.requestTypeCode)}
                      onCheckedChange={(isChecked) =>
                        handleRequestTypeCheckChange(
                          p.requestTypeCode,
                          isChecked as boolean
                        )
                      }
                      id={`request-type-${p.id}`}
                    />
                    <Label htmlFor={`request-type-${p.id}`} className="mb-0">
                      {p.name}
                    </Label>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Form buttons */}
        <div className="flex gap-3 col-span-2 justify-end">
          <Button
            type="button"
            onClick={() => navigate(-1)}
            size="sm"
            variant="outline"
          >
            Cancel
          </Button>
          <Button type="submit" size="sm">
            Create
          </Button>
        </div>
      </div>
    </Form>
  );
}

// For wrapping whole form
//  </ComponentCard></ComponentCard>
{
  /* <div className="flex gap-3 col-span-2 self-end">
          <Button size="sm" variant="outline">
            Cancel
          </Button>
          <Button type="submit" size="sm">
            Create
          </Button>
        </div> */

  {
    /* <Button size="sm">Save Changes</Button> */
  }
}
