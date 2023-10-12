import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { updateBooking } from "../../services/apiBookings";

export function useCheckout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, { status: "checked-out" }),
    // the data recieved by onSucess is the data returned by the mutationFn (updateBooking)
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} sucessfully checked out!`);
      // queryClient.invalidateQueries("bookings"); <===this would also work
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => {
      toast.error("Something went wrong while attempting to check out.");
    },
  });

  return { checkout, isCheckingOut };
}
