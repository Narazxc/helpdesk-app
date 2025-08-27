// React hook form
import { Controller, useForm, type SubmitHandler } from "react-hook-form";

// Component
import Button from "@/components/ui/button/Button";
import { Combobox } from "@/components/Combobox";
import CustomizedInput from "@/components/form/input/CustomizedInput";
import TextArea from "@/components/form/input/TextArea";
import Label from "@/components/form/Label";

// Hook
import type { CreateCategoryType } from "@/types/category-type";
import { useCreateCategoryType } from "./useCreateCategoryType";
import { useRequestTypes } from "@/features/request-type/useRequestTypes";

// Import the interface from the parent component
interface ICategoryType {
  requestTypeCode: string;
  categoryName: string;
  categoryDescription: string;
}

interface CategoryTypeFormProps {
  closeModal: () => void;
}

export default function CreateCategoryTypeForm({
  closeModal,
}: CategoryTypeFormProps) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ICategoryType>();
  const { createCategoryType } = useCreateCategoryType();

  const onSubmit: SubmitHandler<ICategoryType> = (data) => {
    // console.log("Form data:", data);
    // console.log("Errors:", errors);

    const categoryTypeData: CreateCategoryType = {
      name: data.categoryName, // or data.reqTypeName
      description: data.categoryDescription,
      code: data.requestTypeCode,
    };

    createCategoryType(categoryTypeData);
    // console.log(categoryTypeData);

    reset(); // Reset the form
    closeModal();
  };

  const { requestTypes } = useRequestTypes();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h4 className="mb-7 text-md font-medium text-gray-800 dark:text-white/90">
        New Category Type
      </h4>

      <div className="flex flex-col gap-4">
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
                <Combobox
                  id="requestTypeCode"
                  requestTypes={requestTypes}
                  value={field.value || ""}
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
            htmlFor="categoryName"
            className="mb-0.5 text-gray-700 dark:text-gray-100 pt-2 font-normal"
          >
            Category Type Name<span className="text-red-500">*</span>
          </Label>
          <div className="flex flex-col">
            <CustomizedInput
              type="text"
              error={!!errors.categoryName}
              placeholder="Enter category type name"
              id="categoryName"
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
                  className={`bg-gray-50 dark:bg-gray-800 h-20  ${
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
