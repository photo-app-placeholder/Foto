import { checkError, client } from './client';

export async function fetchAlbumsByUser(user_id) {
  const response = await client.from('albums').select('*').match({ user_id });
  return checkError(response);
}

export async function findAlbumById(id) {
  console.log('findAlbumById', id);
  const response = await client.from('albums').select('*').match({ id });
  // .single();
  return checkError(response);
}

export async function addAlbum({ private_public, user_id, code, title }) {
  const response = await client
    .from('albums')
    .insert({ private_public, title, code, user_id })
    .match({ user_id });
  return checkError(response);
}
