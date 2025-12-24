import { useMutation, useQueryClient } from "@tanstack/react-query";
import { importUsersCsv as importUsersCsvApi } from "@/services/apiUser";

export function useImportUsersCsv() {
  const queryClient = useQueryClient();
  const { mutate: importUsersCsv, isPending: isLoading } = useMutation({
    mutationFn: (file: File) => importUsersCsvApi(file),
    onSuccess: (data) => {
      // Optional: Add success handling
      console.log("CSV imported successfully:", data);
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
    },
    onError: (error) => {
      // Optional: Add error handling
      console.error("CSV import failed:", error);
    },
  });

  return { isLoading, importUsersCsv };
}
