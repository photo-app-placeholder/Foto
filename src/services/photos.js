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
}) {
  const response = await client
    .from('photoTable')
    .insert({ caption, photo, album, user_id, album_id })
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
