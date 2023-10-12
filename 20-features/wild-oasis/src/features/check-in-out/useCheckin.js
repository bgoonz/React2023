import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { updateBooking } from "../../services/apiBookings";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    // the data recieved by onSucess is the data returned by the mutationFn (updateBooking)
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} sucessfully checked in!`);
      // queryClient.invalidateQueries("bookings"); <===this would also work
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },
    onError: () => {
      toast.error("Something went wrong while attempting to check in.");
    },
  });

  return { checkin, isCheckingIn };
}
