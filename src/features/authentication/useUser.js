import { useQuery } from "@tanstack/react-query";
import { getUserSession } from "../../services/apiAuthentication";

export function useUser() {
  const {
    data: user,
    isPending,
    fetchStatus,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUserSession,
  });

  return {
    user,
    isPending,
    isAuthenticated: user?.role === "authenticated",
    fetchStatus,
  };
}
