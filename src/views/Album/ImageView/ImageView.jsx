import React, { useEffect, useState } from 'react';
import { findPhotoById, updatePhoto } from '../../../services/photos';
import { useParams, useHistory, Link } from 'react-router-dom';
import { deleteBucket, deletePhoto } from '../../../services/photos';
import { useUser } from '../../../context/UserContext';
import { findAlbumById } from '../../../services/albums';
import styles from './ImageView.css';
import profileHook from '../../../hooks/profileHook';
const {
  imageContainer,
  userName,
  details,
  deleteButton,
  caption,
  editing,
  date,
} = styles;

export default function ImageView() {
  const [currentPhoto, setCurrentPhoto] = useState({});
  const [photoPath, setPhotoPath] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const { profile } = profileHook();
  const { username } = profile[0];
  const history = useHistory();

  const params = useParams();
  const { photo } = params;

  const [displayDate, setDisplayDate] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await findPhotoById(photo);
      setCurrentPhoto(data);
      const dateUpdated = data.created_at.split('T').shift();
      setDisplayDate(dateUpdated);
      console.log(dateUpdated);
      setPhotoPath(data.photo.split('photos/').pop());
    };
    fetchData();
  }, [isEditing]);

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this photo?')) {
      await deletePhoto(photo);
      await deleteBucket(photoPath);
      history.push('/');
    }
  };

  const handleEdit = async () => {
    try {
      await updatePhoto(newCaption, currentPhoto.id);

      setIsEditing(false);
    } catch (error) {
      alert(error);
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
              defaultValue={currentPhoto.caption}
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
            <Link to={`/${currentPhoto.username}`} className={userName}>
              @{currentPhoto.username}
            </Link>
            <span className={caption}>{currentPhoto.caption}</span>
            <span className={date}>{displayDate}</span>
            {currentPhoto.username === username && (
              <button onClick={() => setIsEditing(true)}>Edit</button>
            )}
          </>
        </div>
      )}
    </div>
  );
}
