import type { UpdateOfficeGroup } from "@/types/office-group";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOfficeGroup as updateOfficeTypeApi } from "@/services/apiOfficeGroup";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";

export function useUpdateOfficeGroup() {
  const queryClient = useQueryClient();

  const { mutate: updateOfficeGroup, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, newOfficeGroupData }: UpdateOfficeGroup) =>
      updateOfficeTypeApi(newOfficeGroupData, id),
    onSuccess: () => {
      toast.success("Office group update successfully");
      queryClient.invalidateQueries({ queryKey: ["officeGroup"] });
      queryClient.invalidateQueries({ queryKey: ["officeGroups"] });
    },
    onError: (error: AxiosError, variables) => {
      // 'variables' contains the original request data passed to mutate()
      console.log("error req body", variables);

      if (
        (error.response?.data as any)?.error ===
        "This office group already exists!"
      ) {
        toast.error(
          `Office group "${variables.newOfficeGroupData.officeName}" already exists!`
        );
      } else {
        toast.error(`${(error.response?.data as any)?.error}`);
      }
    },
  });

  return { isUpdating, updateOfficeGroup };
}
