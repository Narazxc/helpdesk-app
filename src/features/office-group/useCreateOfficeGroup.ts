import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOfficeGroup as createOfficeGroupApi } from "@/services/apiOfficeGroup";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";

export function useCreateOfficeGroup() {
  const queryClient = useQueryClient();
  const { mutate: createOfficeGroup, isPending: isCreating } = useMutation({
    mutationFn: createOfficeGroupApi,
    onSuccess: () => {
      toast.success("Office group created successfully");
      queryClient.invalidateQueries({ queryKey: ["officeGroups"] });
    },

    onError: (error: AxiosError, variables) => {
      // 'variables' contains the original request data passed to mutate()
      console.log("error req body", variables);

      if (
        (error.response?.data as any)?.error ===
        "This office group already exists!"
      ) {
        toast.error(`Office group "${variables.officeName}" already exists!`);
      } else {
        toast.error(`${(error.response?.data as any)?.error}`);
      }
    },
  });

  return { isCreating, createOfficeGroup };
}

// export function useCreateRequestType() {
//   const queryClient = useQueryClient();

//   const { mutate: createRequestType, isPending: isCreating } = useMutation({
//     mutationFn: createRequestTypeApi,
//     onSuccess: () => {
//       toast.success("Request Type created successfully");
//       queryClient.invalidateQueries({ queryKey: ["requestTypes"] });
//     },
//     onError: (error: AxiosError) => {
//       let requestTypeName;
//       let requestBody;

//       try {
//         // Parse if it's a JSON string
//         requestBody =
//           typeof error.config?.data === "string"
//             ? JSON.parse(error.config.data)
//             : error.config?.data;

//         // Extract the name after successful parsing/assignment
//         requestTypeName = requestBody?.name;
//       } catch {
//         // If parsing fails, try to access directly (in case it's already an object)
//         requestTypeName = error.config?.data?.name;
//       }

//       toast.error(`Request Type "${requestTypeName}" already exist`);
//       console.error(
//         "Error creating request type:",
//         error.response?.data || error.message
//       );
//     },
//   });

//   return { isCreating, createRequestType };
// }
