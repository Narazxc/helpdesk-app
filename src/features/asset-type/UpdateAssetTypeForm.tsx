// React hook form
import { Controller, useForm, type SubmitHandler } from "react-hook-form";

// Component
import CustomizedInput from "@/components/form/input/CustomizedInput";
import TextArea from "@/components/form/input/TextArea";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";

// Hook
import { useCategoryTypes } from "../category-type/useCategoryTypes";

// Type
import { useUpdateAssetType } from "./useUpdateAssetType";

import type {
  AssetType,
  CreateAssetType,
  UpdateAssetType,
} from "@/types/asset-type";
import { CategoryTypeCombobox } from "./CategoryTypeCombobox";

// // Import the interface from the parent component
// interface ICategoryType {
//   categoryName: string;
//   categoryDescription: string;
//   categoryTypeCode: string;
// }

// interface CategoryTypeFormProps {
//   categoryType: CategoryType;
//   closeModal: () => void;
// }

// Import the interface from the parent component
interface IAssetType {
  categoryTypeCode: string;
  assetName: string;
  assetDescription: string;
}

interface AssetTypeFormProps {
  assetType: AssetType;
  closeModal: () => void;
}

export default function UpdateAssetTypeForm({
  assetType,
  closeModal,
}: AssetTypeFormProps) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IAssetType>({
    defaultValues: {
      categoryTypeCode: assetType?.categoryTypeCode || "",
      assetName: assetType?.name || "",
      assetDescription: assetType?.description || "",
    },
  });
  const { updateAssetType } = useUpdateAssetType();
  const { categoryTypes } = useCategoryTypes();

  const onSubmit: SubmitHandler<IAssetType> = (data) => {
    console.log("Form data:", data);
    console.log("Errors:", errors);

    const updateData: CreateAssetType = {
      code: data.categoryTypeCode,
      name: data.assetName,
      description: data.assetDescription,
    };

    const aasetToUpdate: UpdateAssetType = {
      id: assetType.id.toString(),
      newAssetTypeData: updateData,
    };

    updateAssetType(aasetToUpdate);

    reset(); // Reset the form
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h4 className="mb-7 text-md font-medium text-gray-800 dark:text-white/90">
        Update Request Type
      </h4>

      <div className="flex flex-col gap-4">
        <div className="grid lg:grid-cols-[10rem_1fr] items-start gap-[0.1rem]">
          <Label
            htmlFor="categoryTypeCode"
            className="mb-0.5 text-gray-700 dark:text-gray-100 pt-2 font-normal"
          >
            Category Type<span className="text-red-500">*</span>
          </Label>
          <div className="flex flex-col">
            <Controller
              name="categoryTypeCode"
              control={control}
              rules={{ required: "Category type is required" }}
              render={({ field }) => (
                <CategoryTypeCombobox
                  id="categoryTypeCode"
                  categoryTypes={categoryTypes}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.categoryTypeCode && (
              <span className="text-red-500 text-sm mt-1">
                {errors.categoryTypeCode.message}
              </span>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-[10rem_1fr] items-start gap-[0.1rem]">
          <Label
            htmlFor="assetName"
            className="mb-0.5 text-gray-700 dark:text-gray-100 pt-2 font-normal"
          >
            Asset Type Name<span className="text-red-500">*</span>
          </Label>
          <div className="flex flex-col">
            <CustomizedInput
              type="text"
              error={!!errors.assetName}
              placeholder="Enter Asset Type Name"
              id="assetName"
              className={`px-3 py-2 border rounded-md focus:outline-none ${
                errors.assetName
                  ? "border-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              } dark:bg-gray-800 dark:text-white dark:border-gray-600`}
              {...register("assetName", {
                required: "Asset type name is required",
                maxLength: {
                  value: 50,
                  message: "Asset type name must be less than 50 characters",
                },
                minLength: {
                  value: 2,
                  message: "Asset type name must be at least 2 characters",
                },
              })}
            />
            {errors.assetName && (
              <span className="text-red-500 text-sm mt-1">
                {errors.assetName.message}
              </span>
            )}
          </div>
        </div>
        <div className="grid lg:grid-cols-[10rem_1fr] items-start gap-[0.1rem]">
          <Label
            htmlFor="assetDescription"
            className="mb-0.5 text-gray-700 dark:text-gray-100 pt-2 font-normal"
          >
            Description
          </Label>

          <Controller
            name="assetDescription"
            control={control}
            render={({ field }) => (
              <TextArea
                id="assetDescription"
                placeholder="Enter Assest Type Description..."
                rows={6}
                value={field.value || ""}
                onChange={field.onChange}
                className="bg-gray-50 dark:bg-gray-800 h-32"
              />
            )}
          />
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
