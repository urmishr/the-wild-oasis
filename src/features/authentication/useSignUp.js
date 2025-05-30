import { useMutation } from "@tanstack/react-query";
import { signUp as signupApi } from "../../services/apiAuthentication";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isPending: isSigningUp } = useMutation({
    mutationFn: ({ email, password }) => signupApi({ email, password }),
    onSuccess: () => {
      toast.success("User account successfully created");
    },
    onError: (err) => toast.error(err.message),
  });
  return { signup, isSigningUp };
}
