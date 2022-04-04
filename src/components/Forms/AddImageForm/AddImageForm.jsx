import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { client } from '../../../services/client';
import { useUser } from '../../../context/UserContext';
import { fetchAlbumsByUser } from '../../../services/albums';
import { uploadPhoto } from '../../../services/photos';
import profileHook from '../../../hooks/profileHook';
import styles from './AddImageForm.css';

const { imageform, alert, spinner } = styles;

export default function AddImageForm() {
  const [albums, setAlbums] = useState([]);
  const [album, setAlbum] = useState({});
  const [photo, setPhoto] = useState('');
  const [caption, setCaption] = useState('');
  const history = useHistory();
  const { profile } = profileHook();
  const { username } = profile;
  const { user } = useUser();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAlbumsByUser(user.id);
      setAlbums(data);
      console.log(data);
      setAlbum(data[0]);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const input = document.getElementById('single');
    const file = input.files[0];
    const filePath = photo.split('photos/').pop();
    try {
      setLoading(true);
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
      if (album.private_public === true) {
        history.push(`/${username}/${album.id}/unlock`);
      } else {
        history.push(`/${username}/${album.id}`);
      }
    } catch (error) {
      console.log(error);
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
    if (input.files.length !== 0) {
      const file = input.files[0];
      console.log(file);
      const fileExt = file.name.split('.').pop();
      const fileName = `${new Date().toISOString()}.${fileExt}`;
      const filePath = `${user.id}/${album.title}/${fileName}`;
      setPhoto(
        `https://enluotcdncgmywquucnd.supabase.in/storage/v1/object/public/photos/${filePath}`
      );
    }
  };

  if (loading) return <span className={spinner}></span>;

  return (
    <div className={imageform}>
      <h1>Add Photo</h1>
      <form>
        <div>
          {albums.length >= 1 ? (
            <select onChange={handleAlbumSelect}>
              {albums.map((albumOption) => (
                <option
                  key={albumOption.id}
                  value={JSON.stringify(albumOption)}
                >
                  {albumOption.title}
                </option>
              ))}
            </select>
          ) : (
            <span className={alert}>
              Please <Link to="/newAlbum">make an album.</Link>
            </span>
          )}
        </div>
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
      </form>
    </div>
  );
}
