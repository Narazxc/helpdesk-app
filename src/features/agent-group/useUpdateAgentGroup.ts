import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateAgentGroup as updateAgentGroupApi } from "@/services/apiAgentGroup";
import type { UpdateAgentGroup } from "@/types/agent-group";
import type { AxiosError } from "axios";

export function useUpdateAgentGroup() {
  const queryClient = useQueryClient();

  const { mutate: updateAgentGroup, isPending: isUpdating } = useMutation({
    mutationFn: ({
      id,
      newAgentGroupData,
    }: {
      id: string;
      newAgentGroupData: UpdateAgentGroup;
    }) => updateAgentGroupApi(newAgentGroupData, id),
    onSuccess: () => {
      toast.success("Agent group update successfully");
      queryClient.invalidateQueries({ queryKey: ["agentGroup"] });
      queryClient.invalidateQueries({ queryKey: ["agentGroups"] });
    },
    onError: (error: AxiosError) => {
      const errorMessage = (error.response?.data as any)?.error;

      if (errorMessage.startsWith("User")) {
        toast.error("This user already chief office with another office group");
        // } else if (errorMessage.startsWith("Another")) {
        //   toast.error(errorMessage);
        // }
      } else {
        toast.error(errorMessage);
      }
    },
  });

  return { isUpdating, updateAgentGroup };
}

// export function useUpdateOfficeGroup() {
//   const queryClient = useQueryClient();

//   const { mutate: updateOfficeGroup, isPending: isUpdating } = useMutation({
//     mutationFn: ({ id, newOfficeGroupData }: UpdateOfficeGroup) =>
//       updateOfficeTypeApi(newOfficeGroupData, id),
//     onSuccess: () => {
//       toast.success("Office group update successfully");
//       queryClient.invalidateQueries({ queryKey: ["officeGroup"] });
//       queryClient.invalidateQueries({ queryKey: ["officeGroups"] });
//     },
//     onError: (error: AxiosError, variables) => {
//       // 'variables' contains the original request data passed to mutate()
//       console.log("error req body", variables);

//       if (
//         (error.response?.data as any)?.error ===
//         "This office group already exists!"
//       ) {
//         toast.error(
//           `Office group "${variables.newOfficeGroupData.officeName}" already exists!`
//         );
//       } else {
//         toast.error(`${(error.response?.data as any)?.error}`);
//       }
//     },
//   });

//   return { isUpdating, updateOfficeGroup };
// }
