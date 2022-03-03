import React, { useEffect, useState } from 'react';
import { findPhotoById, updatePhoto } from '../../../services/photos';
import { useParams, useHistory } from 'react-router-dom';
import { deleteBucket, deletePhoto } from '../../../services/photos';
import { useUser } from '../../../context/UserContext';
import { findAlbumById } from '../../../services/albums';
import styles from './ImageView.css';
import profileHook from '../../../hooks/profileHook';
const { imageContainer, userName, details, deleteButton, caption, editing } =
  styles;

export default function ImageView() {
  const [currentPhoto, setCurrentPhoto] = useState({});
  const [photoPath, setPhotoPath] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const { profile } = profileHook();
  const { username } = profile[0];
  const history = useHistory();

  const params = useParams();
  const { photo, album } = params;

  useEffect(() => {
    const fetchData = async () => {
      const data = await findPhotoById(photo);
      setCurrentPhoto(data);

      setPhotoPath(data.photo.split('photos/').pop());
    };
    fetchData();
  }, [isEditing]);
  console.log(photoPath);

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this photo?')) {
      await deletePhoto(photo);
      await deleteBucket(photoPath);
      history.push('/');
    }
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
          <div className={editing}>
            <input
              placeholder="New Caption"
              type="text"
              onChange={(e) => setNewCaption(e.target.value)}
            />
            <button onClick={handleEdit}>Update</button>
            <button className={deleteButton} onClick={() => handleDelete()}>
              Delete Photo
            </button>
            <button onClick={() => setIsEditing(false)}>back</button>
          </div>
        </>
      ) : (
        <div className={details}>
          <>
            <span className={userName}>@{currentPhoto.username}</span>
            <span className={caption}>{currentPhoto.caption}</span>
            {currentPhoto.username === username && (
              <button onClick={() => setIsEditing(true)}>Edit</button>
            )}
          </>
        </div>
      )}
    </div>
  );
}
