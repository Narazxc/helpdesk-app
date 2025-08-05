// import CustomizedInput from "../../components/form/input/CustomizedInput";
// import Label from "../../components/form/Label";
// import Button from "../../components/ui/button/Button";

// // react-hook-form
// import { useForm } from "react-hook-form";
// import type { SubmitHandler } from "react-hook-form";

// interface RequestTypeFormProps {
//   setRequestTypes: React.Dispatch<React.SetStateAction<IFormInput[]>>;
//   // handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
//   setReqTypeName: (value: string) => void;
//   setReqDescription: (value: string) => void;
//   openModal: () => void;
//   closeModal: () => void;
// }

// interface IFormInput {
//   reqTypeName: string;
//   reqTypeDescription: string;
//   categoryTypeCount: number; // Added this property to match parent component
// }

// export default function RequestTypeForm({
//   setRequestTypes,
//   // handleSubmit,
//   // setReqTypeName,
//   // setReqDescription,
//   // openModal,
//   closeModal,
// }: RequestTypeFormProps) {
//   const {
//     register,
//     handleSubmit: handleSubmit2,
//     formState: { errors },
//   } = useForm<IFormInput>();

//   const onSubmit2: SubmitHandler<IFormInput> = (data) => {
//     // console.log("Form data:", data);
//     console.log("Errors:", errors);

//     // Add the missing categoryTypeCount property with a default value
//     const formDataWithDefaults: IFormInput = {
//       ...data,
//       categoryTypeCount: 0, // Default value since it's not in the form
//     };

//     setRequestTypes((prev) => [...prev, formDataWithDefaults]);
//     closeModal();
//   };

//   return (
//     <form onSubmit={handleSubmit2(onSubmit2)}>
//       <h4 className="mb-7 text-md font-medium text-gray-800 dark:text-white/90">
//         New Request Type
//       </h4>

//       <div className="flex flex-col gap-4">
//         <div className="grid lg:grid-cols-[10rem_1fr] items-start gap-[0.1rem]">
//           <Label
//             htmlFor="reqTypeName"
//             className="mb-0.5 text-gray-700 dark:text-gray-100 pt-2 font-normal"
//           >
//             Request Type Name<span className="text-red-500">*</span>
//           </Label>
//           <div className="flex flex-col">
//             <CustomizedInput
//               type="text"
//               autoFocus={true}
//               error={!!errors.reqTypeName}
//               placeholder="Enter Request Type Name"
//               id="reqTypeName"
//               className={`px-3 py-2 border rounded-md focus:outline-none ${
//                 errors.reqTypeName
//                   ? // border-red-500
//                     ""
//                   : "border-gray-300 focus:ring-blue-500"
//               } dark:bg-gray-800 dark:text-white dark:border-gray-600`}
//               {...register("reqTypeName", {
//                 required: "Request type name is required",
//                 maxLength: {
//                   value: 50,
//                   message: "Request type name must be less than 50 characters",
//                 },
//                 minLength: {
//                   value: 2,
//                   message: "Request type name must be at least 2 characters",
//                 },
//               })}
//             />
//             {errors.reqTypeName && (
//               <span className="text-red-500 text-sm mt-1">
//                 {errors.reqTypeName.message}
//               </span>
//             )}
//           </div>
//         </div>

//         <div className="grid lg:grid-cols-[10rem_1fr] items-start gap-[0.1rem]">
//           <Label
//             htmlFor="reqTypeDescription"
//             className="mb-0.5 text-gray-700 dark:text-gray-100 pt-2 font-normal"
//           >
//             Description
//           </Label>
//           <div className="flex flex-col">
//             <CustomizedInput
//               type="text"
//               placeholder="Enter Request Type Description"
//               id="reqTypeDescription"
//               error={!!errors.reqTypeDescription}
//               className={`px-3 py-2 border rounded-md focus:outline-none ${
//                 errors.reqTypeDescription
//                   ? // border-red-500
//                     ""
//                   : "border-gray-300 focus:ring-blue-500"
//               } dark:bg-gray-800 dark:text-white dark:border-gray-600`}
//               {...register("reqTypeDescription")}
//               // {
//               //   required: "Description is required",
//               //   maxLength: {
//               //     value: 200,
//               //     message: "Description must be less than 200 characters",
//               //   },
//               // }
//             />
//             {errors.reqTypeDescription && (
//               <span className="text-red-500 text-sm mt-1">
//                 {errors.reqTypeDescription.message}
//               </span>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="flex items-center justify-end w-full gap-3 mt-6">
//         <Button size="sm" variant="outline" type="button" onClick={closeModal}>
//           Close
//         </Button>
//         <Button size="sm" type="submit">
//           Save Changes
//         </Button>
//       </div>
//     </form>
//   );
// }

import CustomizedInput from "../../components/form/input/CustomizedInput";
import Label from "../../components/form/Label";
import Button from "../../components/ui/button/Button";

// react-hook-form
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

// Import the interface from the parent component
interface IRequestType {
  reqTypeName: string;
  reqTypeDescription: string;
  categoryTypeCount: number;
}

interface RequestTypeFormProps {
  setRequestTypes: React.Dispatch<React.SetStateAction<IRequestType[]>>;
  closeModal: () => void;
}

export default function RequestTypeForm({
  setRequestTypes,
  closeModal,
}: RequestTypeFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IRequestType>();

  const onSubmit: SubmitHandler<IRequestType> = (data) => {
    console.log("Form data:", data);
    console.log("Errors:", errors);

    // Add the missing categoryTypeCount property with a default value
    const formDataWithDefaults: IRequestType = {
      ...data,
      categoryTypeCount: 0, // Default value since it's not in the form
    };

    setRequestTypes((prev) => [...prev, formDataWithDefaults]);
    reset(); // Reset the form
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h4 className="mb-7 text-md font-medium text-gray-800 dark:text-white/90">
        New Request Type
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
          <div className="flex flex-col">
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
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end w-full gap-3 mt-6">
        <Button size="sm" variant="outline" type="button" onClick={closeModal}>
          Close
        </Button>
        <Button size="sm" type="submit">
          Save Changes
        </Button>
      </div>
    </form>
  );
}
