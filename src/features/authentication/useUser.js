import { useQuery } from "@tanstack/react-query";
import { getUserSession } from "../../services/apiAuthentication";

export function useUser() {
  const {
    data: user,
    isLoading,
    fetchStatus,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUserSession,
  });

  return {
    user,
    isLoading,
    isAuthenticated: user?.role === "authenticated",
    fetchStatus,
  };
}
