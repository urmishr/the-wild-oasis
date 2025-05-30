import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";

import { useQuery } from "@tanstack/react-query";

export function useBookingById() {
  [];
  const { bookingId } = useParams();

  const {
    isPending,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
  });

  return { isPending, booking, error };
}
