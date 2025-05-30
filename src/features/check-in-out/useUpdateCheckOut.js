import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useUpdateCheckOut() {
  const queryClient = useQueryClient();

  const { mutate: checkOut, isPending: isCheckingOut } = useMutation({
    mutationFn: ({ id, obj }) => updateBooking({ id, obj }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["booking"] });
      queryClient.invalidateQueries({ queryKey: ["todayActivity"] });
      toast.success(`Check out successfully for bookind id: ${data.id}`);
    },
    onError: () => toast.error("Error updating check-out status"),
  });

  return { checkOut, isCheckingOut };
}
