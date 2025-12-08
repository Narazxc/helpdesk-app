// Component
import Form from "@/components/form/Form";
import Label from "@/components/form/Label";
import toast from "react-hot-toast";

// Type
import type { CreateUser2, UpdateUser } from "@/types/user";
import type { SubmitHandler } from "react-hook-form";

// Hook
import { useRoles } from "@/features/role/useRoles";
import { useUpdateUser } from "./useUpdateUser";
import { useEntities } from "@/features/entities/useEntities";
import { useRequestTypes } from "@/features/request-type/useRequestTypes";

import { useLocation, useNavigate } from "react-router";
import { Controller, useForm } from "react-hook-form";
import CustomizedInput from "@/components/form/input/CustomizedInput";
import { GenericCombobox } from "@/components/GenericCombobox";
import { Checkbox } from "@/components/ui/checkbox";
import Button from "@/components/ui/button/Button";
import { useGetUserById } from "./useUserById";
import { useEffect, useState } from "react";

// interface UpdateUserFormProps {
//   userData: User;
// }

export default function UpdateUserForm() {
  // { user }: UpdateUserFormProps

  // const { user: user } = useGetUserById("1");
  // console.log("user number 1", user);
  // get id by using useLocation

  const location = useLocation();
  const id = location.state?.id;

  const { user } = useGetUserById(id);
  const { updateUser } = useUpdateUser();
  const { entities } = useEntities();

  console.log("getUserById", user);

  // const {
  //   control,
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<CreateUser>(
  //    defaultValues: {
  //     userName: user?.userName || "",
  //     userId: user?.userId || "",
  //     telegramId: user?.telegramId || ""
  //   },
  // );

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateUser2>({
    defaultValues: {
      username: "",
      userId: "",
      telegramId: "",
      phoneNumber: "",
      businessCode: "",
      email: "",
    },
  });

  // Role
  const { roles, isLoading: isLoadingRole } = useRoles();
  const [checkedRoles, setCheckedRoles] = useState<string[]>([]);

  const handleCheckChange = (roleId: string, isChecked: boolean) => {
    setCheckedRoles((prev) =>
      isChecked ? [...prev, roleId] : prev.filter((id) => id !== roleId)
    );
  };

  console.log(checkedRoles);

  const { requestTypes, isLoading: isLoadingRequestTypes } = useRequestTypes();
  const [checkedRequestTypes, setCheckRequestTypes] = useState<string[]>([]);

  const handleRequestTypeCheckChange = (roleId: string, isChecked: boolean) => {
    setCheckRequestTypes((prev) =>
      isChecked ? [...prev, roleId] : prev.filter((id) => id !== roleId)
    );
  };

  console.log(checkedRequestTypes);

  // useEffect(() => {
  //   if (user) {
  //     reset({
  //       userName: user.userName,
  //       userId: user.userId,
  //       telegramId: user.telegramId,
  //       // ask bong mom to get password back
  //       phoneNumber: user.phoneNumber,
  //       businessCode: user.operatingId,
  //       email: user.email,
  //     });
  //   }
  // }, [user, reset]);

  useEffect(() => {
    if (user && entities.length > 0) {
      // user.operatingId = "1032-GDPFMIT"
      // Find entity object that matches
      const matchedEntity = entities.find(
        (e) => `${e.operatingUnit}-${e.enShortName}` === user.operatingId
      );

      reset({
        username: user.username,
        userId: user.userId,
        telegramId: user.telegramId,
        phoneNumber: user.phoneNumber,
        businessCode: matchedEntity?.businessCode || "", // ID only
        email: user.email,
      });
    }
  }, [user, entities, reset]);

  useEffect(() => {
    if (user && roles.length > 0 && requestTypes.length > 0) {
      // Map role names to role codes
      if (user.roleName && Array.isArray(user.roleName)) {
        const userRoleCodes = roles
          .filter((role) => user.roleName.includes(role.roleName))
          .map((role) => role.id.toString());
        setCheckedRoles(userRoleCodes);
      }

      // Map request type names to request type codes
      if (user.requestTypeName && Array.isArray(user.requestTypeName)) {
        const userRequestTypeCodes = requestTypes
          .filter((rt) => user.requestTypeName.includes(rt.name))
          .map((rt) => rt.requestTypeCode);
        setCheckRequestTypes(userRequestTypeCodes);
      }
    }
  }, [user, roles, requestTypes]);

  const navigate = useNavigate();
  // const { roles, isLoading: isLoadingRole } = useRoles();

  const onSubmit: SubmitHandler<CreateUser2> = (data) => {
    console.log("On submit data: ", data);

    const dataToSend: CreateUser2 = {
      username: data.username,
      userId: data.userId,
      telegramId: data.telegramId,
      password: "Fmis#2025!",
      phoneNumber: data.phoneNumber,
      email: data.email,
      businessCode: data.businessCode,
      roleIds: checkedRoles, // ← Use actual checked roles
      requestTypeCode: checkedRequestTypes, // ← Use actual checked request types
    };

    const updateUserData: UpdateUser = {
      id,
      newUserData: dataToSend,
    };

    updateUser(updateUserData, {
      onSuccess: () => {
        navigate("/users");
        toast.success("User updated successfully."); // Shows on new page
      },
      onError: (error) => {
        console.log(error);
      },
    });

    // reset(); // Reset the form
  };

  return (
    <Form className="" onSubmit={handleSubmit(onSubmit)}>
      <div className="rounded-xl border-1 bg-white p-6 pt-4">
        {/* sm: */}
        <div className="grid gap-6 grid-cols-2">
          <div className="col-span-full">
            <h4 className="pb-4 text-lg font-semibold text-gray-800 border-b border-gray-200 dark:border-gray-800 dark:text-white/90">
              Personal Info
            </h4>
            <div className="flex flex-col gap-4 lg:gap-3.5 max-w-[40rem]">
              <div className="grid  lg:grid-cols-[10rem_1fr] items-center gap-[0.1rem]">
                <Label
                  htmlFor="userName"
                  className="mb-0.5 text-gray-700 dark:text-gray-100 pt-2 font-normal"
                >
                  Username <span className="text-red-500">*</span>
                </Label>

                <div>
                  <CustomizedInput
                    type="text"
                    error={!!errors.username}
                    placeholder="Enter Username"
                    id="userName"
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

              {/* Row 1 */}
              <div className="grid lg:grid-cols-[10rem_1fr] items-center gap-[0.1rem]">
                <Label
                  htmlFor="userId"
                  className="text-sm font-medium mb-0.5 text-gray-700 dark:text-gray-100"
                >
                  User ID <span className="text-red-500">*</span>
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

              {/* Row 2 */}
              {/* <div className="grid  lg:grid-cols-[10rem_1fr] items-center gap-[0.1rem]">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium mb-0.5 text-gray-700 dark:text-gray-100"
                >
                  Password
                </Label>

                <div>
                  <CustomizedInput
                    type="password"
                    error={!!errors.password}
                    placeholder="Enter Password"
                    id="password"
                    className={`px-3 py-2 border rounded-md focus:outline-none ${
                      errors.password
                        ? "border-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    } dark:bg-gray-800 dark:text-white dark:border-gray-600`}
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                  {errors.password && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.password.message}
                    </span>
                  )}
                </div>
              </div> */}

              {/* Row 3 */}
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

              {/* Row 4 */}
              <div className="grid lg:grid-cols-[10rem_1fr] items-center gap-[0.1rem]">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium mb-0.5 text-gray-700 dark:text-gray-100"
                >
                  Email <span className="text-red-500">*</span>
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
                        isAllowedDomain: (value) => {
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

              {/* Row 5 */}
              <div className="grid lg:grid-cols-[10rem_1fr] items-center gap-[0.1rem]">
                <Label
                  htmlFor="entity"
                  className="text-sm font-medium mb-0.5 text-gray-700 dark:text-gray-100"
                >
                  Entity <span className="text-red-500">*</span>
                </Label>

                <Controller
                  name="businessCode" // This is the field name in your form data
                  control={control}
                  rules={{ required: "Please select a user" }} // Optional validation
                  render={({ field }) => (
                    // <GenericCombobox
                    //   id="entity"
                    //   items={entities}
                    //   value={field.value} // Use field.value instead of selectedUserId
                    //   onChange={field.onChange} // Use field.onChange instead of setSelectedUserId
                    //   getDisplayValue={(entity) =>
                    //     `${entity.operatingUnit} - ${entity.enLongName}`
                    //   }
                    //   getItemValue={(entity) => entity.businessCode}
                    //   getItemKey={(entity) => entity.businessCode}
                    //   placeholder="Select an Entity..."
                    //   searchPlaceholder="Search users..."
                    //   emptyMessage="No users found."
                    //   // error={fieldState.error?.message} // Pass validation errors if your component supports it
                    // />
                    <GenericCombobox
                      id="entity"
                      items={entities}
                      value={field.value} // ID string
                      onChange={field.onChange} // set ID directly
                      getDisplayValue={(entity) =>
                        `${entity.operatingUnit} - ${entity.enLongName}`
                      }
                      getItemValue={(entity) => entity.businessCode} // the ID
                      getItemKey={(entity) => entity.businessCode}
                      placeholder="Select an Entity..."
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

          {/* Address section */}
          {/* Assign Role */}
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
                          handleCheckChange(
                            p.id.toString(),
                            isChecked as boolean
                          )
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

          <div className="flex flex-col col-span-2">
            <div className="bg-gray-50 rounded-lg">
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                {!isLoadingRequestTypes &&
                  requestTypes.map((p) => (
                    <div key={p.id} className="flex items-center gap-3">
                      <Checkbox
                        className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                        checked={checkedRequestTypes.includes(
                          p.requestTypeCode
                        )}
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
              Update
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
}
