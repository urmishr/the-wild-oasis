import supabase from "./supabase";
export async function signUp({ fullName, email, password }) {
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { fullName, avatar: "" },
    },
  });

  if (error) {
    console.error(error);
    throw new Error(`There was an error signing up`);
  }

  return data;
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error);
    throw new Error(`Error Logging in user`);
  }

  return data;
}

export async function getUserSession() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) {
    console.error("error retriving user session ");
    return null;
  }

  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  let { error } = await supabase.auth.signOut();

  if (error) throw new Error("Error Logging out user");
}

export async function updateUser({ fullName, password, avatar }) {
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };
  const { data, error } = await supabase.auth.updateUser({
    ...updateData,
  });

  if (error) throw new Error(error.message);

  if (!avatar) return data;

  //image upload

  const fileName = `avatar-${data.user.id}-${Math.floor(Math.random() * 900000 + 100000)}-${avatar.name}`;

  const imagePath = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/avatars//${fileName}`;
  updateData = { data: { ...updateData.data, avatar: imagePath } };

  const { error: avatarUploadError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (avatarUploadError) throw new Error("Error uploading avatar image");

  const { data: updatedUserData, error: avatarError } =
    await supabase.auth.updateUser({
      data: { avatar: imagePath },
    });

  if (avatarError) throw new Error(avatarError.message);

  return updatedUserData;
}
