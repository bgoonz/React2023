import { login as loginApi } from "../../services/apiAuth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      console.log(user);

      navigate("/dashboard");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  return { login, isLoading };
}
