import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  console.log("newCabin", newCabin, "id", id);
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  //We replaceAll / in the image name because supabase would create a new folder otherwise.
  const imageName = `${Math.random()}-${newCabin.image.name}`.replace(
    /\//g,
    "",
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  //1. Create /Edit Cabin:
  let query = supabase.from("cabins");
  //Create Cabin:
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }
  //Edit Cabin:
  if (id) {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }
  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  //2. Upload image:
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);
  //3. Delete cabin if there was an error uploading the image:
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error("Cabin could not be created because of an image error");
  }
  return data;
}
