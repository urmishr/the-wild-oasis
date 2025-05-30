import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { mutate: deleteBooking, isPending: isDeletingBooking } = useMutation({
    mutationFn: (id) => deleteBookingApi(id),
    onSuccess: () => {
      toast.success("Booking deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: () => toast.error("Error deleting Booking Data"),
  });

  return { deleteBooking, isDeletingBooking };
}
