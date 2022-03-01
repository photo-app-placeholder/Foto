import { checkError, client } from './client';

export async function fetchPhotosByUser(user_id) {
  const response = await client.from('photos').select('*').match({ user_id });
  return checkError(response);
}

export async function findPhotoById(id) {
  const response = await client
    .from('photos')
    .select('*')
    .match({ id })
    .single();
  return checkError(response);
}

export async function uploadPhoto({ album, photo, caption, user_id }) {
  const response = await client
    .from('photos')
    .insert({ caption, photo, album, user_id })
    .match({ user_id });
  return checkError(response);
}
