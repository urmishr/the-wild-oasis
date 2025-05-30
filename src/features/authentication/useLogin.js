import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuthentication";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();
  const { mutate: login, isPending: isLoggingIn } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: () => {
      toast.success("User authentication successful");
      navigate("/dashboard", { replace: true });
    },
    onError: () => toast.error("Provided email and password is incorrect"),
  });
  return { login, isLoggingIn };
}
