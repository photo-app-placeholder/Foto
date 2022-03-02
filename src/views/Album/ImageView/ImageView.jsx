import React, { useEffect, useState } from 'react';
import { findPhotoById, updatePhoto } from '../../../services/photos';
import { useParams, useHistory } from 'react-router-dom';
import { deleteBucket, deletePhoto } from '../../../services/photos';
import { useUser } from '../../../context/UserContext';
import { findAlbumById } from '../../../services/albums';
import styles from './ImageView.css';
const { imageContainer } = styles;

export default function ImageView() {
  const [currentPhoto, setCurrentPhoto] = useState({});
  const [photoPath, setPhotoPath] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const params = useParams();
  const { photo, album } = params;
  const { history } = useHistory();
  const { user } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      const data = await findPhotoById(photo);
      setCurrentPhoto(data);
      const data2 = await findAlbumById(album);

      setPhotoPath(data.photo.split('photos/').pop());
    };
    fetchData();
  }, [isEditing]);
  console.log(photoPath);

  const handleDelete = async () => {
    console.log(photoPath);
    await deletePhoto(photo);
    await deleteBucket(photoPath);
  };

  const handleEdit = async () => {
    try {
      const data = await updatePhoto(newCaption, currentPhoto.id);

      console.log(data);

      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={imageContainer}>
      <img src={currentPhoto.photo} />
      {isEditing ? (
        <>
          <input
            placeholder="New Caption"
            type="text"
            onChange={(e) => setNewCaption(e.target.value)}
          />
          <button onClick={handleEdit}>Update Caption</button>
        </>
      ) : (
        <>
          <span>{currentPhoto.caption}</span>
          <button onClick={() => setIsEditing(true)}>Edit Caption</button>
        </>
      )}

      <button onClick={() => handleDelete()}>Delete</button>
    </div>
  );
}
