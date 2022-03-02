import React, { useEffect, useState } from 'react';
import { findPhotoById } from '../../../services/photos';
import { useParams, useHistory } from 'react-router-dom';
import { deleteBucket, deletePhoto } from '../../../services/photos';
import { useUser } from '../../../context/UserContext';
import { findAlbumById } from '../../../services/albums';

export default function ImageView() {
  const [currentPhoto, setCurrentPhoto] = useState({});
  const [photoPath, setPhotoPath] = useState('');

  const params = useParams();
  const { photo, album } = params;
  const { history } = useHistory();
  const { user } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      const data = await findPhotoById(photo);
      setCurrentPhoto(data);
      const data2 = await findAlbumById(album);
      console.log(data2);
      setPhotoPath(data.photo.split('photos/').pop());
    };
    fetchData();
  }, []);
  console.log(photoPath);

  const handleDelete = async () => {
    await deletePhoto(photo);
    await deleteBucket(photoPath);
  };

  return (
    <div>
      <img src={currentPhoto.photo} />
      <span>{currentPhoto.caption}</span>
      <span>{currentPhoto.created_at}</span>
      <button onClick={() => handleDelete()}>Delete</button>
    </div>
  );
}
