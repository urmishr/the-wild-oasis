import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";
import { subDays } from "date-fns";

export function useRecentBookings() {
  const [searchParams] = useSearchParams();

  const getDays = !searchParams.get("last") ? 7 : searchParams.get("last");
  const getDate = subDays(new Date(), getDays).toISOString();

  const { data: recentBookings, isPending: isLoadingRecentBooking } = useQuery({
    queryKey: ["recentBookings", getDays],
    queryFn: () => getBookingsAfterDate(getDate),
  });

  return { recentBookings, isLoadingRecentBooking };
}
