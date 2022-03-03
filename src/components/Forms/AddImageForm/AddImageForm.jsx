import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { client } from '../../../services/client';
import { useUser } from '../../../context/UserContext';
import { fetchAlbumsByUser } from '../../../services/albums';
import { uploadPhoto } from '../../../services/photos';
import profileHook from '../../../hooks/profileHook';
import styles from './AddImageForm.css';

const { imageform } = styles;

export default function AddImageForm() {
  const [albums, setAlbums] = useState([]);
  const [album, setAlbum] = useState({});
  const [photo, setPhoto] = useState('');
  const [caption, setCaption] = useState('');
  const history = useHistory();
  const { profile } = profileHook();
  const { username } = profile[0];
  const { user } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAlbumsByUser(user.id);
      setAlbums(data);
      setAlbum(data[0]);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const input = document.getElementById('single');
    const file = input.files[0];
    const filePath = photo.split('photos/').pop();
    try {
      await uploadPhoto({
        caption: caption,
        photo: photo,
        user_id: user.id,
        album: album.title,
        album_id: album.id,
        private_public: album.private_public,
        username: username,
      });
      let { error: uploadError } = await client.storage
        .from('photos')
        .upload(filePath, file);
      if (uploadError) {
        throw uploadError;
      }
      alert(`your photo has been uploaded to ${album.title}`);
      if (album.private_public === true) {
        history.replace(`/${username}/${album.id}/unlock`);
      } else {
        history.replace(`/${username}/${album.id}`);
      }
    } catch {
      throw new Error('something went wrong uploading your image');
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!e.target.files || e.target.files === 0) {
      throw new Error('please choose a file to upload');
    }
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${new Date().toISOString()}.${fileExt}`;
    const filePath = `${user.id}/${album.title}/${fileName}`;
    setPhoto(
      `https://enluotcdncgmywquucnd.supabase.in/storage/v1/object/public/photos/${filePath}`
    );
  };

  const handleAlbumSelect = (e) => {
    e.preventDefault();
    setAlbum(JSON.parse(e.target.value));
    const input = document.getElementById('single');
    const file = input.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${new Date().toISOString()}.${fileExt}`;
    const filePath = `${user.id}/${album.title}/${fileName}`;
    setPhoto(
      `https://enluotcdncgmywquucnd.supabase.in/storage/v1/object/public/photos/${filePath}`
    );
  };

  return (
    <div className={imageform}>
      <form>
        <div>
          <select onChange={handleAlbumSelect}>
            {albums.map((albumOption) => (
              <option key={albumOption.id} value={JSON.stringify(albumOption)}>
                {albumOption.title}
              </option>
            ))}
          </select>
        </div>
        <>
          <div>
            <input
              required
              type="file"
              accept="image/*"
              id="single"
              onChange={handleUpload}
            />
          </div>
          <div>
            <textarea
              type="text"
              value={caption}
              placeholder="Caption"
              onChange={(e) => setCaption(e.target.value)}
            />
          </div>
          <button onClick={handleSubmit}>Upload</button>
        </>
      </form>
    </div>
  );
}
