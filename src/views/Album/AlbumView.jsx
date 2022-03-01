import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import profileHook from '../../hooks/profileHook';
import { findAlbumById } from '../../services/albums';
import { fetchPhotosByAlbumId, findPhotoById } from '../../services/photos';

export default function AlbumView() {
  const [currentAlbum, setCurrentAlbum] = useState({});
  const { album } = useParams();
  const [photos, setPhotos] = useState([]);
  const { profile } = profileHook();
  const { username } = profile[0];
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(album);
    const fetchData = async () => {
      try {
        const data = await findAlbumById(album);
        setCurrentAlbum(data[0]);
        console.log(data);
        const data2 = await fetchPhotosByAlbumId(album);
        setPhotos(data2);
        setLoading(false);
        console.log(data2);
      } catch (error) {
        console.log(error);
      }
    };
    if (loading) fetchData();
  }, []);

  return (
    <div>
      <h1>{currentAlbum.title}</h1>
      {photos.map((photo) => (
        <Link to={`/${username}/${album}/${photo.id}`} key={photo.id}>
          <img src={photo.photo} />
        </Link>
      ))}
    </div>
  );
}
