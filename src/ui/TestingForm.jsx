import { getDate } from "date-fns";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const Input = styled.input`
  background-color: var(--color-grey-200);
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid var(--color-brand-500);

  width: 50%;
`;

const StyledForm = styled.div`
  margin: 5rem;
  display: flex;
  flex-direction: column;
  width: 50%;
`;

const Button = styled.button`
  width: fit-content;
  padding: 1rem;
  margin: 2rem 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Error = styled.p`
  color: indianred;
  font-weight: 500;
`;
const Data = styled.p`
  color: cornflowerblue;
  font-weight: 500;
`;

export default function TestingForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  function handleFormSubmit(data) {
    console.log(data);
    alert(JSON.stringify(data));
  }

  const firstName = watch("firstName");
  const lastName = watch("lastName");
  const gender = watch("gender");
  return (
    <>
      <h1>Form</h1>
      <StyledForm>
        <Form onSubmit={handleSubmit(handleFormSubmit)}>
          <label>first Name</label>
          <Input
            {...register("firstName", { required: "First name is required" })}
            type="text"
          />
          <Error>{errors.firstName ? errors.firstName.message : ""}</Error>
          <label>lastname</label>
          <Input
            {...register("lastName", { required: "last name is required" })}
            type="text"
          />
          <Error>{errors.lastName ? errors.lastName.message : ""}</Error>
          <select {...register("gender", { disabled: true })}>
            <option value="female">female</option>
            <option value="male">male</option>
            <option value="other">other</option>
          </select>
          <Button>Submit Form</Button>
        </Form>
        <Data>{firstName && `First name: ${firstName}`}</Data>
        <Data>{lastName && `Last name: ${lastName}`}</Data>
        <Data>{gender && `Gender: ${gender}`}</Data>
      </StyledForm>
    </>
  );
}
