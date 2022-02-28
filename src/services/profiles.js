import { client, checkError } from './client.js';

export async function getProfile() {
  const request = await client.from('profiles').select('*');
  return checkError(request);
}

export async function getProfileByUserId() {
  const request = await client.from('profiles').select('*');
  return checkError(request);
}

export async function updateProfile({ username, bio, user_id }) {
  const request = await client
    .from('profiles')
    .update({ username, bio })
    .match({ user_id });
  return checkError(request);
}

export async function createProfile({ username, bio, user_id }) {
  const request = await client
    .from('profiles')
    .insert({ username, bio, user_id });
  return checkError(request);
}
