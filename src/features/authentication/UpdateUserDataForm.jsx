import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";
import SpinnerApi from "../../ui/SpinnerApi";
import styled from "styled-components";

const ImagePreview = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-left: 8;
  object-fit: cover;
  border: 2px solid #afafaf;
`;

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUser();

  const { isUserUpdating, updateUser } = useUpdateUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(updateData);
    console.log(avatar);
    if (!fullName) return;
    updateUser(
      { fullName, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          setAvatarPreview(null);
          e.target.reset();
        },
      },
    );
  }

  // Create a preview URL for the selected avatar file
  const [avatarPreview, setAvatarPreview] = useState(null);

  function handleAvatarChange(e) {
    const file = e.target.files[0];
    setAvatar(file);
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
    } else {
      setAvatarPreview(null);
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled={isUserUpdating}
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput id="avatar" accept="image/*" onChange={handleAvatarChange} />
        {avatarPreview && (
          <label>
            <ImagePreview src={avatarPreview} alt="Current avatar" />
          </label>
        )}
      </FormRow>
      <FormRow>
        <Button
          type="reset"
          $variation="secondary"
          onClick={() => {
            setAvatarPreview(null);
            setFullName(currentFullName);
          }}
        >
          Cancel
        </Button>
        <Button>
          {isUserUpdating ? <SpinnerApi $margin={4} /> : "Update account"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
