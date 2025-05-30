import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuthentication";
import toast from "react-hot-toast";

export function useLogout() {
  const queryClient = useQueryClient();
  const {
    mutate: logout,
    isPending,
    error,
  } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["user"] }),
    onError: () => toast.error(error.message),
  });

  return { isPending, logout };
}
