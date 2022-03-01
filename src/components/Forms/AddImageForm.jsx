import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { client } from '../../services/client';
import { useUser } from '../../context/UserContext';
import { fetchAlbumsByUser } from '../../services/albums';
import { uploadPhoto } from '../../services/photos';
import profileHook from '../../hooks/profileHook';
import AlbumView from '../../views/Album/AlbumView';

export default function AddImageForm() {
  const [albums, setAlbums] = useState([]);
  const [album, setAlbum] = useState({});
  const [photo, setPhoto] = useState('');
  const [caption, setCaption] = useState('');
  const history = useHistory();
  const { profile } = profileHook();
  console.log(album);
  const { user } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAlbumsByUser(user.id);
      setAlbums(data);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await uploadPhoto({
        caption: caption,
        photo: photo,
        user_id: user.id,
        album: album.title,
        album_id: album.id,
      });
      alert(`your photo has been uploaded to ${album.title}`);
      history.replace(`/${user.id}/${album.title}`);
    } catch {
      throw new Error('something went wrong uploading your image');
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
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
      let { error: uploadError } = await client.storage
        .from('photos')
        .upload(filePath, file);
      if (uploadError) {
        throw uploadError;
      }
    } catch (error) {
      alert('error uploading');
    }
  };

  return (
    <form>
      <select onChange={(e) => setAlbum(JSON.parse(e.target.value))}>
        <option>Pick an album</option>
        {albums.map((albumOption) => (
          <option key={albumOption.id} value={JSON.stringify(albumOption)}>
            {albumOption.title}
          </option>
        ))}
      </select>
      <input
        required
        type="file"
        accept="image/*"
        id="single"
        onChange={(e) => {
          handleUpload(e);
        }}
      />
      <input
        type="text"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <button onClick={handleSubmit}>Upload</button>
    </form>
  );
}
