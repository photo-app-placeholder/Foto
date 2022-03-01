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

  useEffect(() => {
    const fetchData = async () => {
      const data = await findAlbumById(album);
      setCurrentAlbum(data);
      console.log(data);
      const data2 = await fetchPhotosByAlbumId(album);
      setPhotos(data2);
      console.log(data2);
    };
    fetchData();
  }, [album]);

  return (
    <div>
      {photos.map((photo) => (
        <Link to={`/${username}/${album}/${photo.id}`} key={photo.id}>
          <img src={photo.photo} />
        </Link>
      ))}
    </div>
  );
}
