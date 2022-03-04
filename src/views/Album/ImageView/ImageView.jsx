import React, { useEffect, useState } from 'react';
import { findPhotoById, updatePhoto } from '../../../services/photos';
import { useParams, useHistory, Link } from 'react-router-dom';
import { deleteBucket, deletePhoto } from '../../../services/photos';
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
  back,
  back2,
  spinner,
} = styles;

export default function ImageView() {
  const [currentPhoto, setCurrentPhoto] = useState({});
  const [photoPath, setPhotoPath] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
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
      setLoading(false);
    };
    fetchData();
  }, [isEditing]);

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this photo?')) {
      await deletePhoto(photo);
      await deleteBucket(photoPath);
      history.goBack();
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

  const handleBack = () => {
    history.goBack();
  };
  if (loading) return <span className={spinner}></span>;
  return (
    <div className={imageContainer}>
      <div className={back}>
        <a className={back2} onClick={handleBack}>
          ← go back
        </a>
      </div>
      <div>
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
              <button onClick={() => setIsEditing(false)}>Back</button>
            </div>
          </>
        ) : (
          <div className={details}>
            <>
              {!loading && (
                <>
                  <Link to={`/${currentPhoto.username}`} className={userName}>
                    @{currentPhoto.username}
                  </Link>
                  <span className={caption}>{currentPhoto.caption}</span>
                  <span className={date}>
                    {' '}
                    posted {displayDate} in{' '}
                    <a
                      href={`/${currentPhoto.username}/${currentPhoto.album_id}`}
                    >
                      {currentPhoto.album}
                    </a>
                  </span>
                </>
              )}
              {currentPhoto.username === username && !loading && (
                <button onClick={() => setIsEditing(true)}>Edit</button>
              )}
            </>
          </div>
        )}
      </div>
    </div>
  );
}
