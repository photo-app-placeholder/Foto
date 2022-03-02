import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import profileHook from '../../hooks/profileHook';
import { findAlbumById } from '../../services/albums';
import { fetchPhotosByAlbumId, findPhotoById } from '../../services/photos';

export default function AlbumView() {
  const [currentAlbum, setCurrentAlbum] = useState({});
  const { album } = useParams();
  const [photos, setPhotos] = useState([]);
  const { profile } = profileHook();
  const { username } = profile[0];
  console.log(album);
  useEffect(() => {
    const fetchData = async () => {
      const data = await findAlbumById(album);
      setCurrentAlbum(data);
      const data2 = await fetchPhotosByAlbumId(album);
      setPhotos(data2);
    };
    fetchData();
  }, [album]);

  return (
    <div>
      {currentAlbum.private_public ? (
        <Redirect to={`${username}/${album.id}/unlock`} />
      ) : (
        <>
          <h1>{currentAlbum.title}</h1>
          {photos.map((photo) => (
            <Link to={`/${username}/${album}/${photo.id}`} key={photo.id}>
              <img src={photo.photo} />
            </Link>
          ))}
        </>
      )}
    </div>
  );
}
