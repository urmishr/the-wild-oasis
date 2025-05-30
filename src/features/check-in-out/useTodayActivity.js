import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export function useTodayActivity() {
  const {
    isPending,
    data: todayActivity,
    error,
  } = useQuery({
    queryKey: ["todayActivity"],
    queryFn: getStaysTodayActivity,
  });

  return { isPending, todayActivity, error };
}
