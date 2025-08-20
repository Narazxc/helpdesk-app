// Components
import CustomizedInput from "../../components/form/input/CustomizedInput";
import Label from "../../components/form/Label";
import Button from "../../components/ui/button/Button";
import TextArea from "@/components/form/input/TextArea";

// react-hook-form
import { Controller, useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

// Type
import type {
  CreateRequestType,
  RequestType,
  UpdateRequestType,
} from "@/types/request-type";

// Hook
import { useUpdateRequestType } from "./useUpdateRequestType";

// Import the interface from the parent component
interface IRequestType {
  reqTypeName: string;
  reqTypeDescription: string;
  //   categoryTypeCount: number;
}

// setRequestTypes: React.Dispatch<React.SetStateAction<IRequestType[]>>;
interface UpdateRequestTypeFormProps {
  requestType: RequestType;
  closeModal: () => void;
}

export default function UpdateRequestTypeForm({
  requestType,
  closeModal,
}: UpdateRequestTypeFormProps) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IRequestType>({
    defaultValues: {
      reqTypeName: requestType?.name || "",
      reqTypeDescription: requestType?.description || "",
    },
  });
  const { updateRequestType } = useUpdateRequestType();

  const onSubmit: SubmitHandler<IRequestType> = (data) => {
    // For testing
    // console.log("data:", data);
    // console.log("Errors:", errors);

    const updateData: CreateRequestType = {
      name: data.reqTypeName,
      description: data.reqTypeDescription,
    };

    const requestToUpdate: UpdateRequestType = {
      id: requestType.id.toString(),
      newRequestTypeData: updateData,
    };

    updateRequestType(requestToUpdate);

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
            htmlFor="reqTypeName"
            className="mb-0.5 text-gray-700 dark:text-gray-100 pt-2 font-normal"
          >
            Request Type Name<span className="text-red-500">*</span>
          </Label>
          <div className="flex flex-col">
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
          </div>
        </div>

        <div className="grid lg:grid-cols-[10rem_1fr] items-start gap-[0.1rem]">
          <Label
            htmlFor="reqTypeDescription"
            className="mb-0.5 text-gray-700 dark:text-gray-100 pt-2 font-normal"
          >
            Description
          </Label>

          <Controller
            name="reqTypeDescription"
            control={control}
            render={({ field }) => (
              <TextArea
                id="reqTypeDescription"
                placeholder="Enter Request Type Description..."
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

// Old, normal text input for description
{
  /* <div className="flex flex-col">
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
          </div> */
}
