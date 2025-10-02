import CustomizedInput from "@/components/form/input/CustomizedInput";
import Button from "@/components/ui/button/Button";
import { GenericCombobox } from "@/components/GenericCombobox";
import { useAllUsers } from "../auth/useAllUsers";
import { useCreateOfficeGroup } from "./useCreateOfficeGroup";
import type { CreateOfficeGroup } from "@/types/office-group";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import Label from "@/components/form/Label";

interface CreateOfficeGroupFormProps {
  closeModal: () => void;
}

// Dummy users data

// interface User {
//   id: number;
//   name: string;
//   email: string;
// }
// export const users: User[] = [
//   {
//     id: 1,
//     name: "Sarah Johnson",
//     email: "sarah.johnson@company.com",
//   },
//   {
//     id: 2,
//     name: "Michael Chen",
//     email: "michael.chen@company.com",
//   },
//   {
//     id: 3,
//     name: "Emily Rodriguez",
//     email: "emily.rodriguez@company.com",
//   },
//   {
//     id: 4,
//     name: "David Thompson",
//     email: "david.thompson@company.com",
//   },
//   {
//     id: 5,
//     name: "Jessica Kim",
//     email: "jessica.kim@company.com",
//   },
//   {
//     id: 6,
//     name: "Robert Williams",
//     email: "robert.williams@company.com",
//   },
//   {
//     id: 7,
//     name: "Amanda Foster",
//     email: "amanda.foster@company.com",
//   },
//   {
//     id: 8,
//     name: "James Anderson",
//     email: "james.anderson@company.com",
//   },
//   {
//     id: 9,
//     name: "Lisa Parker",
//     email: "lisa.parker@company.com",
//   },
//   {
//     id: 10,
//     name: "Christopher Lee",
//     email: "christopher.lee@company.com",
//   },
// ];

export default function CreateOfficeGroupForm({
  closeModal,
}: CreateOfficeGroupFormProps) {
  // Create state for the selected user ID
  // const [selectedUserId, setSelectedUserId] = useState<string>("");
  const { users } = useAllUsers();
  console.log("in transaction list ", users);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateOfficeGroup>();
  const { createOfficeGroup } = useCreateOfficeGroup();

  const onSubmit: SubmitHandler<CreateOfficeGroup> = (data) => {
    // For testing
    // console.log("data:", data);
    // console.log("Errors:", errors);

    const officeGroupData: CreateOfficeGroup = {
      officeName: data.officeName,
      userCode: data.userCode,
    };

    // console.log("officeGroupData", officeGroupData);

    createOfficeGroup(officeGroupData);

    reset(); // Reset the form
    closeModal();
  };

  // // Optional: Get the selected user object
  // const selectedUser = users.find(
  //   (user) => user.id.toString() === selectedUserId
  // );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h4 className="mb-7 text-md font-medium text-gray-800 dark:text-white/90">
        Add New Office
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
              placeholder="Enter Request Type Name"
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
            {/* <GenericCombobox
                items={users}
                value={selectedUserId}
                onChange={setSelectedUserId}
                getDisplayValue={(user) => user.userName}
                getItemValue={(user) => user.id.toString()}
                getItemKey={(user) => user.id}
                placeholder="Select User..."
                searchPlaceholder="Search users..."
                emptyMessage="No users found."
              /> */}

            <Controller
              name="userCode" // This is the field name in your form data
              control={control}
              rules={{ required: "Please select a user" }} // Optional validation
              render={({ field }) => (
                <GenericCombobox
                  id="userCode"
                  items={users}
                  value={field.value} // Use field.value instead of selectedUserId
                  onChange={field.onChange} // Use field.onChange instead of setSelectedUserId
                  getDisplayValue={(user) => user.userName}
                  getItemValue={(user) => user.userCode}
                  getItemKey={(user) => user.userCode}
                  placeholder="Select User..."
                  searchPlaceholder="Search users..."
                  emptyMessage="No users found."
                  // error={fieldState.error?.message} // Pass validation errors if your component supports it
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

//  <div className="grid lg:grid-cols-[10rem_1fr] items-start gap-[0.1rem]">
//           <Label
//             htmlFor="requestTypeCode"
//             className="mb-0.5 text-gray-700 dark:text-gray-100 pt-2 font-normal"
//           >
//             Request Type<span className="text-red-500">*</span>
//           </Label>
//           <div className="flex flex-col">
//             <Controller
//               name="requestTypeCode"
//               control={control}
//               rules={{ required: "Request type is required" }}
//               render={({ field }) => (
//                 <Combobox
//                   id="requestTypeCode"
//                   requestTypes={requestTypes}
//                   value={field.value || ""}
//                   onChange={field.onChange}
//                 />
//               )}
//             />
//             {errors.requestTypeCode && (
//               <span className="text-red-500 text-sm mt-1">
//                 {errors.requestTypeCode.message}
//               </span>
//             )}
//           </div>
//         </div>

//         <div className="grid lg:grid-cols-[10rem_1fr] items-start gap-[0.1rem]">
//           <Label
//             htmlFor="categoryName"
//             className="mb-0.5 text-gray-700 dark:text-gray-100 pt-2 font-normal"
//           >
//             Category Type Name<span className="text-red-500">*</span>
//           </Label>
//           <div className="flex flex-col">
//             <CustomizedInput
//               type="text"
//               error={!!errors.categoryName}
//               placeholder="Enter category type name"
//               id="categoryName"
//               className={`px-3 py-2 border rounded-md focus:outline-none ${
//                 errors.categoryName
//                   ? "border-red-500"
//                   : "border-gray-300 focus:ring-blue-500"
//               } dark:bg-gray-800 dark:text-white dark:border-gray-600`}
//               {...register("categoryName", {
//                 required: "Category type name is required",
//                 maxLength: {
//                   value: 50,
//                   message: "Category type name must be less than 50 characters",
//                 },
//                 minLength: {
//                   value: 2,
//                   message: "Category type name must be at least 2 characters",
//                 },
//               })}
//             />
//             {errors.categoryName && (
//               <span className="text-red-500 text-sm mt-1">
//                 {errors.categoryName.message}
//               </span>
//             )}
//           </div>
//         </div>

{
  /* <div className="flex flex-col">
  <CustomizedInput
    type="text"
    autoFocus={true}
    error={!!errors.reqTypeName}
    placeholder="Enter Request Type Name"
    id="reqTypeName"
    className={`px-3 py-2 border rounded-md focus:outline-none ${
      errors.reqTypeName
        ? "border-red-500"
        : "border-gray-300 focus:ring-blue-500"
    } dark:bg-gray-800 dark:text-white dark:border-gray-600`}
    {...register("reqTypeName", {
      required: "Request type name is required",
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
  {errors.reqTypeName && (
    <span className="text-red-500 text-sm mt-1">
      {errors.reqTypeName.message}
    </span>
  )}
</div>; */
}

// <div className="flex flex-col">
//   <Controller
//     name="requestTypeCode"
//     control={control}
//     rules={{ required: "Request type is required" }}
//     render={({ field }) => (
//       <Combobox
//         id="requestTypeCode"
//         requestTypes={requestTypes}
//         value={field.value || ""}
//         onChange={field.onChange}
//       />
//     )}
//   />
//   {errors.requestTypeCode && (
//     <span className="text-red-500 text-sm mt-1">
//       {errors.requestTypeCode.message}
//     </span>
//   )}
// </div>;
