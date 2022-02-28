import { checkError, client } from './client';

export async function fetchAlbumsByUser(user_id) {
  const response = await client.from('albums').select('*').match({ user_id })
}

export async function findAlbumById(id) {
  const response = await client.from('albums').select('*').match({ id }).single();
  return checkError(response);
}

export async function addAlbum({ private, user_id, code, title }) {
    const response = await client.from('albums').insert({ private, title, code}).match({ user_id })
}
