import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useUpdateCheckIn() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: updateCheckin, isPending: isUpdatingCheckIn } = useMutation({
    mutationFn: ({ id, obj }) => updateBooking({ id, obj }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["booking"] });
      toast.success(`Check in successfully for bookind id: ${data.id}`);
      navigate("/bookings");
    },
    onError: () => toast.error("Error updating check-in status"),
  });

  return { updateCheckin, isUpdatingCheckIn };
}
