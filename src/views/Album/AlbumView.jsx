import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import profileHook from '../../hooks/profileHook';
import { findAlbumById } from '../../services/albums';
import { fetchPhotosByAlbumId, findPhotoById } from '../../services/photos';
import styles from './AlbumView.css';

const { albumView, title } = styles;
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
      const data2 = await fetchPhotosByAlbumId(album);
      setPhotos(data2);
    };
    fetchData();
  }, [album]);

  return (
    <div className={albumView}>
      {currentAlbum.private_public ? (
        <Redirect to={`${username}/${album.id}/unlock`} />
      ) : (
        <>
          <div className={title}>
            <h1>{currentAlbum.title}</h1>
            <Link to="/addImage">Add Image</Link>
          </div>
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
