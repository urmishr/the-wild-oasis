import supabase from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Error retriving cabin data");
  }

  return data;
}

export async function deleteCabin(id) {
  //delete image as well
  const { data, error } = await supabase
    .from("cabins")
    .delete()
    .eq("id", id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Error deleting Cabin");
  }
  const imageName = data[0].image.split("//")[2];

  const { error: imageUploadError } = await supabase.storage
    .from("cabin-images")
    .remove([imageName]);

  if (imageUploadError) {
    throw new Error("Error deleting cabin Image");
  }

  return data;
}

export async function createEditCabin(cabinData, id) {
  const isFile = cabinData.image instanceof File;
  let imagePath = cabinData.image;

  // If a new image file is provided, upload it and set the new path
  if (isFile) {
    const imageName =
      `${Math.floor(Math.random() * 900000 + 100000)}-${cabinData.image.name}`.replaceAll(
        "/",
        "",
      );
    imagePath = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/cabin-images//${imageName}`;

    // Upload the new image
    const { error: imageUploadError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, cabinData.image);

    if (imageUploadError) {
      console.error(imageUploadError);
      throw new Error("Failed to upload image");
    }
  }

  let query = supabase.from("cabins");
  if (!id) query = query.insert([{ ...cabinData, image: imagePath }]);
  if (id) query = query.update({ ...cabinData, image: imagePath }).eq("id", id);

  const { data, error } = await query.select();
  if (error) throw new Error("Error creating cabin data");

  return data;
}
