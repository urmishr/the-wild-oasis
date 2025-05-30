import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser as updateUserApi } from "../../services/apiAuthentication";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isPending: isUserUpdating } = useMutation({
    mutationFn: updateUserApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("User data updated successfully");
    },
    onError: (err) => toast.error(err.message),
  });
  return { updateUser, isUserUpdating };
}
