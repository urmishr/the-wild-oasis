import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { mutate: deleteCabin, isPending: isDeleting } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      toast.success("Cabin data deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: () => {
      toast.error("Error deleting cabin data");
    },
  });
  return { deleteCabin, isDeleting };
}
