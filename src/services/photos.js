import { checkError, client } from './client';

export async function fetchPhotosByUser(user_id) {
  const response = await client
    .from('photoTable')
    .select('*')
    .match({ user_id });
  return checkError(response);
}

export async function findPhotoById(id) {
  const response = await client
    .from('photoTable')
    .select('*')
    .match({ id })
    .single();
  return checkError(response);
}

export async function uploadPhoto({
  album,
  photo,
  caption,
  user_id,
  album_id,
  private_public,
}) {
  const response = await client
    .from('photoTable')
    .insert({ caption, photo, album, user_id, album_id, private_public })
    .match({ user_id });
  return checkError(response);
}

export async function fetchPhotosByAlbumId(album_id) {
  const response = await client
    .from('photoTable')
    .select('*')
    .match({ album_id });
  return checkError(response);
}

export async function fetchRandomPhotos() {
  const response = await client
    .from('photoTable')
    .select('*')
    .match({ private_public: false });
  return checkError(response);
}

export async function deletePhoto(id) {
  const response = await client.from('photoTable').delete().eq('id', id);
  return checkError(response);
}

export async function deleteBucket(path) {
  const response = await client.storage.from('photos').remove([path]);
  return checkError(response);
}
