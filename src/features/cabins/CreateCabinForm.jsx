import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";
import SpinnerApi from "../../ui/SpinnerApi";

function CreateCabinForm({ editCabinData = {}, closeModal, type }) {
  const { id: editId, ...editValues } = editCabinData;
  const isEditSession = Boolean(editId);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
  } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { createCabin, isCreatingCabin } = useCreateCabin(reset);
  const { editCabin, isEditingCabin } = useEditCabin();
  const isLoading = isCreatingCabin || isEditingCabin;

  function onFormSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession) {
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        { onSuccess: () => closeModal?.() },
      );
    } else {
      createCabin(
        { ...data, image },
        {
          onSuccess: () => {
            reset();
            closeModal?.();
          },
        },
      );
    }
  }

  return (
    <Form
      onSubmit={handleSubmit(onFormSubmit)}
      type={type || (closeModal ? "modal" : "regular")}
    >
      <FormRow label="Cabin Name" errors={errors}>
        <Input
          type="text"
          id="name"
          disabled={isLoading}
          {...register("name", { required: "Cabin name is required" })}
        />
      </FormRow>
      <FormRow label="Capacity" errors={errors}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isLoading}
          {...register(
            "maxCapacity",
            {
              required: "Maximum Capacity is required",
            },
            { min: { value: 1, message: "Minimum Allowed capacity is 1" } },
          )}
        />
      </FormRow>
      <FormRow label="Regular Price" errors={errors}>
        <Input
          type="number"
          disabled={isLoading}
          id="regularPrice"
          {...register(
            "regularPrice",
            {
              required: "Regular price is required",
            },
            { min: { value: 1, message: "Minimum Allowed capacity is 1" } },
          )}
        />
      </FormRow>
      <FormRow label="Discount" errors={errors}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isLoading}
          {...register("discount", {
            validate: (value) =>
              Number(value) <= Number(getValues("regularPrice")) ||
              "Discount must be less than regular price",
          })}
        />
      </FormRow>
      <FormRow label="Description" errors={errors}>
        <Textarea
          type="number"
          id="description"
          disabled={isLoading}
          {...register("description", {
            required: "Description is required",
          })}
        />
      </FormRow>
      <FormRow label="Image" errors={errors}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "Cabin Image is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button $variation="secondary" type="reset" onClick={closeModal}>
          cancel
        </Button>
        <Button disabled={isLoading}>
          {isLoading ? (
            <SpinnerApi $margin={2} />
          ) : isEditSession ? (
            "Edit cabin"
          ) : (
            "Add cabin"
          )}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
