// React hook form
import { Controller, useForm, type SubmitHandler } from "react-hook-form";

// Component
import CustomizedInput from "@/components/form/input/CustomizedInput";
import TextArea from "@/components/form/input/TextArea";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";

// Hook
import { useRequestTypes } from "../request-type/useRequestTypes";
import { useUpdateCategoryType } from "./useUpdateCategoryType";

// Type
import type {
  CategoryType,
  CreateCategoryType,
  UpdateCategoryType,
} from "@/types/category-type";
import { RequestTypeCombobox } from "./RequestTypeCombobox";

// Import the interface from the parent component
interface ICategoryType {
  categoryName: string;
  categoryDescription: string;
  requestTypeCode: string;
}

interface CategoryTypeFormProps {
  categoryType: CategoryType;
  closeModal: () => void;
}

export default function UpdateCategoryTypeForm({
  categoryType,
  closeModal,
}: CategoryTypeFormProps) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ICategoryType>({
    defaultValues: {
      requestTypeCode: categoryType?.requestTypeCode || "",
      categoryName: categoryType?.name || "",
      categoryDescription: categoryType?.description || "",
    },
  });
  const { updateCategoryType } = useUpdateCategoryType();
  const { requestTypes } = useRequestTypes();

  const onSubmit: SubmitHandler<ICategoryType> = (data) => {
    // console.log("Form data:", data);
    // console.log("Errors:", errors);

    const updateData: CreateCategoryType = {
      code: data.requestTypeCode,
      name: data.categoryName,
      description: data.categoryDescription,
    };

    const categoryToUpdate: UpdateCategoryType = {
      id: categoryType.id.toString(),
      newCategoryTypeData: updateData,
    };

    updateCategoryType(categoryToUpdate);

    reset(); // Reset the form
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h4 className="mb-7 text-md font-medium text-gray-800 dark:text-white/90">
        Update Category Type
      </h4>

      <div className="flex flex-col gap-4">
        {/* <div className="grid lg:grid-cols-[10rem_1fr] items-start gap-[0.1rem]">
          <Label
            htmlFor="requestTypeCode"
            className="mb-0.5 text-gray-700 dark:text-gray-100 pt-2 font-normal"
          >
            Request Type<span className="text-red-500">*</span>
          </Label>
          <div className="flex flex-col">
            <CustomizedInput
              type="text"
              autoFocus={true}
              error={!!errors.requestTypeCode}
              placeholder="Enter Request Type Name"
              id="requestTypeCode"
              className={`px-3 py-2 border rounded-md focus:outline-none ${
                errors.requestTypeCode
                  ? "border-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              } dark:bg-gray-800 dark:text-white dark:border-gray-600`}
              {...register("requestTypeCode", {
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
            {errors.requestTypeCode && (
              <span className="text-red-500 text-sm mt-1">
                {errors.requestTypeCode.message}
              </span>
            )}
          </div>
        </div> */}

        <div className="grid lg:grid-cols-[10rem_1fr] items-start gap-[0.1rem]">
          <Label
            htmlFor="requestTypeCode"
            className="mb-0.5 text-gray-700 dark:text-gray-100 pt-2 font-normal"
          >
            Request Type<span className="text-red-500">*</span>
          </Label>
          <div className="flex flex-col">
            <Controller
              name="requestTypeCode"
              control={control}
              rules={{ required: "Request type is required" }}
              render={({ field }) => (
                <RequestTypeCombobox
                  id="requestTypeCode"
                  requestTypes={requestTypes}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.requestTypeCode && (
              <span className="text-red-500 text-sm mt-1">
                {errors.requestTypeCode.message}
              </span>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-[10rem_1fr] items-start gap-[0.1rem]">
          <Label
            htmlFor="reqTypeName"
            className="mb-0.5 text-gray-700 dark:text-gray-100 pt-2 font-normal"
          >
            Category Type Name<span className="text-red-500">*</span>
          </Label>
          <div className="flex flex-col">
            <CustomizedInput
              type="text"
              error={!!errors.categoryName}
              placeholder="Enter Category Type Name"
              id="reqTypeName"
              className={`px-3 py-2 border rounded-md focus:outline-none ${
                errors.categoryName
                  ? "border-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              } dark:bg-gray-800 dark:text-white dark:border-gray-600`}
              {...register("categoryName", {
                required: "Category type name is required",
                maxLength: {
                  value: 50,
                  message: "Category type name must be less than 50 characters",
                },
                minLength: {
                  value: 2,
                  message: "Category type name must be at least 2 characters",
                },
              })}
            />
            {errors.categoryName && (
              <span className="text-red-500 text-sm mt-1">
                {errors.categoryName.message}
              </span>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-[10rem_1fr] items-start gap-[0.1rem]">
          <Label
            htmlFor="categoryDescription"
            className="mb-0.5 text-gray-700 dark:text-gray-100 pt-2 font-normal"
          >
            Description
          </Label>
          {/* <div className="flex flex-col">
            <CustomizedInput
              type="text"
              placeholder="Enter Request Type Description"
              id="reqTypeDescription"
              error={!!errors.reqTypeDescription}
              className={`px-3 py-2 border rounded-md focus:outline-none ${
                errors.reqTypeDescription
                  ? "border-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              } dark:bg-gray-800 dark:text-white dark:border-gray-600`}
              {...register("reqTypeDescription")}
            />
            {errors.reqTypeDescription && (
              <span className="text-red-500 text-sm mt-1">
                {errors.reqTypeDescription.message}
              </span>
            )}
          </div> */}

          <div className="flex flex-col">
            <Controller
              name="categoryDescription"
              control={control}
              rules={{
                maxLength: {
                  value: 250,
                  message: "Description must be 250 characters or less",
                },
              }}
              render={({ field }) => (
                <TextArea
                  id="categoryDescription"
                  placeholder="Enter Request Type Description... (max 250)"
                  rows={6}
                  value={field.value || ""}
                  onChange={field.onChange}
                  error={!!errors.categoryDescription}
                  className={`bg-gray-50 dark:bg-gray-800 h-32  ${
                    errors.categoryDescription
                      ? "border-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                />
              )}
            />
            {errors.categoryDescription && (
              <span className="text-red-500 text-sm mt-1 block">
                {errors.categoryDescription.message}
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

//=============================================================================================================

// import { Controller, useForm, type SubmitHandler } from "react-hook-form";
// import { useUpdateCategoryType } from "./useUpdateCategoryType";
// import { useRequestTypes } from "@/features/request-type/useRequestTypes";
// import type {
//   CategoryType,
//   CreateCategoryType,
//   UpdateCategoryType,
// } from "@/types/category-type";
// import CustomizedInput from "@/components/form/input/CustomizedInput";
// import TextArea from "@/components/form/input/TextArea";
// import Label from "@/components/form/Label";
// import Button from "@/components/ui/button/Button";
// import { Combobox } from "@/components/Combobox";

// // Import the interface from the parent component
// interface ICategoryType {
//   categoryName: string;
//   categoryDescription: string;
//   requestTypeCode: string;
// }

// interface CategoryTypeFormProps {
//   categoryType: CategoryType;
//   closeModal: () => void;
// }

// export default function UpdateCategoryTypeForm({
//   categoryType,
//   closeModal,
// }: CategoryTypeFormProps) {
//   const {
//     control,
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm<ICategoryType>({
//     defaultValues: {
//       categoryName: categoryType?.name || "",
//       categoryDescription: categoryType?.description || "",
//       requestTypeCode: categoryType?.requestTypeCode || "",
//     },
//   });
//   const { updateCategoryType } = useUpdateCategoryType();
//   const { requestTypes } = useRequestTypes();

//   const onSubmit: SubmitHandler<ICategoryType> = (data) => {
//     console.log("Form data:", data);
//     console.log("Errors:", errors);

//     const updateData: CreateCategoryType = {
//       name: data.categoryName,
//       description: data.categoryDescription,
//       code: data.requestTypeCode,
//     };

//     const categoryToUpdate: UpdateCategoryType = {
//       id: categoryType.id.toString(),
//       newCategoryTypeData: updateData,
//     };

//     updateCategoryType(categoryToUpdate);

//     reset(); // Reset the form
//     closeModal();
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <h4 className="mb-7 text-md font-medium text-gray-800 dark:text-white/90">
//         Update Request Type
//       </h4>

//       <div className="flex flex-col gap-4">
//         {/* Replace the CustomizedInput with Controller + Combobox */}
//         <div className="grid lg:grid-cols-[10rem_1fr] items-start gap-[0.1rem]">
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
//               rules={{
//                 required: "Request type is required",
//               }}
//               render={({ field }) => (
//                 <Combobox
//                   requestTypes={requestTypes}
//                   value={field.value}
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
//             htmlFor="reqTypeName"
//             className="mb-0.5 text-gray-700 dark:text-gray-100 pt-2 font-normal"
//           >
//             Category Type Name<span className="text-red-500">*</span>
//           </Label>
//           <div className="flex flex-col">
//             <CustomizedInput
//               type="text"
//               error={!!errors.categoryName}
//               placeholder="Enter Category Type Name"
//               id="reqTypeName"
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

//         <div className="grid lg:grid-cols-[10rem_1fr] items-start gap-[0.1rem]">
//           <Label
//             htmlFor="categoryDescription"
//             className="mb-0.5 text-gray-700 dark:text-gray-100 pt-2 font-normal"
//           >
//             Description
//           </Label>
//           <Controller
//             name="categoryDescription"
//             control={control}
//             render={({ field }) => (
//               <TextArea
//                 placeholder="Enter Request Type Description..."
//                 rows={6}
//                 value={field.value || ""}
//                 onChange={field.onChange}
//                 className="bg-gray-50 dark:bg-gray-800 h-20"
//               />
//             )}
//           />
//         </div>
//       </div>

//       <div className="flex items-center justify-end w-full gap-3 mt-6">
//         <Button size="sm" variant="outline" type="button" onClick={closeModal}>
//           Close
//         </Button>
//         <Button size="sm" type="submit">
//           Save
//         </Button>
//       </div>
//     </form>
//   );
// }
