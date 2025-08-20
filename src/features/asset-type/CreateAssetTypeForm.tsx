// Component
import CustomizedInput from "../../components/form/input/CustomizedInput";
import Label from "../../components/form/Label";
import Button from "../../components/ui/button/Button";
import TextArea from "@/components/form/input/TextArea";

// react-hook-form
import { Controller, useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

// Hook
import { useCreateAssetType } from "./useCreateAssetType";

// Types
import type { CreateAssetType } from "@/types/asset-type";
import { useCategoryTypes } from "../category-type/useCategoryTypes";
import { CategoryTypeCombobox } from "./CategoryTypeCombobox";

// Import the interface from the parent component
interface IAssetType {
  categoryTypeCode: string;
  assetName: string;
  assetDescription: string;
}

interface AssetTypeFormProps {
  closeModal: () => void;
}

export default function CreateAssetTypeForm({
  closeModal,
}: AssetTypeFormProps) {
  const { categoryTypes } = useCategoryTypes();
  const { createAssetType } = useCreateAssetType();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IAssetType>();

  const onSubmit: SubmitHandler<IAssetType> = (data) => {
    console.log("Form data:", data);
    console.log("Errors:", errors);

    const assetTypeData: CreateAssetType = {
      code: data.categoryTypeCode,
      name: data.assetName,
      description: data.assetDescription,
    };

    createAssetType(assetTypeData);

    reset(); // Reset the form
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h4 className="mb-7 text-md font-medium text-gray-800 dark:text-white/90">
        New Category Type
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
                  value={field.value || ""}
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
              placeholder="Enter asset type name"
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
                placeholder="Enter Asset Type Description..."
                rows={6}
                value={field.value || ""}
                onChange={field.onChange}
                className="bg-gray-50 dark:bg-gray-800 h-20"
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
