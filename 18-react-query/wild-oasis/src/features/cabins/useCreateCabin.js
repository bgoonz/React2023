import { useMutation, useQueryClient } from "react-query";
import { createEditCabin } from "../../services/apiCabins";
import { toast } from "react-hot-toast";


export function useCreateCabin(){
    const queryClient = useQueryClient();

    const { mutate: createCabin, isLoading: isCreating } = useMutation({
      mutationFn: (newCabin) => createEditCabin(newCabin),
      onSuccess: () => {
        toast.success("New cabin sucessfully created");
        queryClient.invalidateQueries({
          queryKey: ["cabins"],
        });

      },
      onError: () => {
        toast.error("Cabin could not be created");
      },
    });
    
    return {createCabin, isCreating};
}
