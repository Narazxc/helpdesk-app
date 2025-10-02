import CustomizedInput from "@/components/form/input/CustomizedInput";
import { GenericCombobox } from "@/components/GenericCombobox";
import Button from "@/components/ui/button/Button";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { useAllUsers } from "../auth/useAllUsers";
import type {
  CreateOfficeGroup,
  UpdateOfficeGroup,
} from "@/types/office-group";
// import { useModal } from "@/hook/useModal";
import Label from "@/components/form/Label";
import { useUpdateOfficeGroup } from "./useUpdateOfficeGroup";
// import toast from "react-hot-toast";

interface UpdateOfficeGroupFormProp {
  officeGroupData: UpdateOfficeGroup;
  closeModal: () => void;
}

export default function UpdateOfficeGroupForm({
  officeGroupData,
  closeModal,
}: UpdateOfficeGroupFormProp) {
  const { users } = useAllUsers();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateOfficeGroup>({
    defaultValues: {
      officeName: officeGroupData?.newOfficeGroupData?.officeName || "",
      userCode: officeGroupData?.newOfficeGroupData?.userCode || "",
    },
  });
  const { updateOfficeGroup } = useUpdateOfficeGroup();

  console.log("office Group data", officeGroupData);

  //   const { updateOfficeGroup } = useUpdateOfficeGroup();

  const onSubmit: SubmitHandler<CreateOfficeGroup> = (data) => {
    const updateData: UpdateOfficeGroup = {
      id: officeGroupData.id,
      newOfficeGroupData: {
        officeName: data.officeName,
        userCode: data.userCode,
      },
    };

    updateOfficeGroup(updateData, {
      onSuccess: () => {
        reset();
        closeModal();
      },
      onError: (error) => {
        console.error("Failed to update office group:", error);
        // Handle error (show toast, etc.)
      },
    });
    // console.log("updateData", updateData);

    reset();
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h4 className="mb-7 text-md font-medium text-gray-800 dark:text-white/90">
        Update Office Group
      </h4>

      <div className="flex flex-col gap-4">
        <div className="grid lg:grid-cols-[10rem_1fr] items-start gap-[0.1rem]">
          <Label
            htmlFor="officeName"
            className="mb-0.5 text-gray-700 dark:text-gray-100 pt-2 font-normal"
          >
            Office Name<span className="text-red-500"> *</span>
          </Label>
          <div className="flex flex-col">
            <CustomizedInput
              type="text"
              autoFocus={true}
              error={!!errors.officeName}
              placeholder="Enter Office Name"
              id="officeName"
              className={`px-3 py-2 border rounded-md focus:outline-none ${
                errors.officeName
                  ? "border-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              } dark:bg-gray-800 dark:text-white dark:border-gray-600`}
              {...register("officeName", {
                required: "Office Group name is required",
                maxLength: {
                  value: 50,
                  message: "must be less than 50 characters",
                },
                minLength: {
                  value: 2,
                  message: "must be at least 2 characters",
                },
              })}
            />
            {errors.officeName && (
              <span className="text-red-500 text-sm mt-1">
                {errors.officeName.message}
              </span>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-[10rem_1fr] items-start gap-[0.1rem]">
          <Label
            htmlFor="userCode"
            className="mb-0.5 text-gray-700 dark:text-gray-100 pt-2 font-normal"
          >
            Chief Office<span className="text-red-500"> *</span>
          </Label>
          <div className="flex flex-col">
            <Controller
              name="userCode"
              control={control}
              rules={{ required: "Please select a user" }}
              render={({ field }) => (
                <GenericCombobox
                  id="userCode"
                  items={users}
                  value={field.value}
                  onChange={field.onChange}
                  getDisplayValue={(user) => user.userName}
                  getItemValue={(user) => user.userCode}
                  getItemKey={(user) => user.userCode}
                  placeholder="Select User..."
                  searchPlaceholder="Search users..."
                  emptyMessage="No users found."
                  // error={fieldState.error?.message}
                />
              )}
            />
            {errors.userCode && (
              <span className="text-red-500 text-sm mt-1">
                {errors.userCode.message}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end w-full gap-3 mt-6">
        <Button
          size="sm"
          variant="outline"
          type="button"
          onClick={() => {
            console.log("clicked");
            closeModal();
          }}
        >
          Close
        </Button>
        <Button size="sm" type="submit">
          Save
        </Button>
      </div>
    </form>
  );
}
