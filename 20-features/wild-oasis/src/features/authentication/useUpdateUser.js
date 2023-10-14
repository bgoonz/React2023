import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import { toast } from "react-hot-toast";
export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      toast.success("User account sucessfully updated");
      //the setQueryData method is used to update the cache with local data... the data is also sent to the server via the mutationFn but the cache is updated without needing to fetch the data from the server.
      queryClient.setQueryData(["user"], user);
      //   queryClient.invalidateQueries({
      //     queryKey: ["user"]
      //   });
    },
    onError: () => {
      toast.error("Cabin could not be created");
    },
  });
  return {
    updateUser,
    isUpdating,
  };
}
