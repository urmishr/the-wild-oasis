import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { subDays } from "date-fns";
import { getStaysAfterDate } from "../../services/apiBookings";

export function useRecentStays() {
  const [searchParams] = useSearchParams();

  const getDays = !searchParams.get("last") ? 7 : searchParams.get("last");
  const getDate = subDays(new Date(), getDays).toISOString();

  const { data: recentStays, isPending: isLoadingRecentStays } = useQuery({
    queryKey: ["recentStays", getDays],
    queryFn: () => getStaysAfterDate(getDate),
  });

  const confirmedStays = recentStays?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out",
  );

  return { recentStays, confirmedStays, isLoadingRecentStays, getDays };
}
