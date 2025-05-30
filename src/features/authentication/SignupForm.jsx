import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useSignUp";
import SpinnerApi from "./../../ui/SpinnerApi";
// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();

  const { signup, isSigningUp } = useSignup();

  function handleSignup(data) {
    const newUser = {
      fullName: data.fullName,
      email: data.email,
      password: data.password,
    };

    console.log(newUser);
    signup(newUser, { onSuccess: () => reset() });
  }
  return (
    <Form onSubmit={handleSubmit(handleSignup)} noValidate>
      <FormRow label="Full name" errors={errors}>
        <Input
          type="text"
          id="fullName"
          disabled={isSigningUp}
          {...register("fullName", { required: "full name is required" })}
        />
      </FormRow>

      <FormRow label="Email address" errors={errors}>
        <Input
          type="email"
          id="email"
          disabled={isSigningUp}
          {...register("email", {
            required: "Email address is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please Provide proper email address",
            },
          })}
        />
      </FormRow>

      <FormRow label="Password (min 8 characters)" errors={errors}>
        <Input
          type="password"
          id="password"
          disabled={isSigningUp}
          {...register("password", {
            required: "password is required field",
            min: {
              value: 8,
              message: "Password length must be more than 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" errors={errors}>
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isSigningUp}
          {...register("passwordConfirm", {
            required: "repeat password is required field",
            validate: (value) =>
              getValues("password") === value ||
              "Repeat password should match password",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button $variation="secondary" type="reset">
          Cancel
        </Button>
        <Button>
          {isSigningUp ? <SpinnerApi $margin={5} /> : "Create new user"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
