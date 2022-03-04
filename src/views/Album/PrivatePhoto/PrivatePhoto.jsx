import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import profileHook from '../../../hooks/profileHook';
import {
  deleteBucket,
  deletePhoto,
  findPhotoById,
  updatePhoto,
} from '../../../services/photos';
import '../PrivateAlbum/PrivateAlbum.css';
import styles from './PrivatePhoto.css';

const {
  privateView,
  details,
  editing,
  userName,
  caption,
  date,
  deleteButton,
  spinner,
} = styles;

export default function PrivatePhoto({
  clickPhoto = true,
  setClickPhoto,
  paramsPhoto,
}) {
  const [loading, setLoading] = useState(true);
  const [photoPath, setPhotoPath] = useState('');
  const [photo, setPhoto] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const { profile } = profileHook();
  const { username } = profile[0];
  const [newCaption, setNewCaption] = useState('');
  const [displayDate, setDisplayDate] = useState('');
  const history = useHistory();

  useEffect(async () => {
    const data = await findPhotoById(paramsPhoto);
    setPhoto(data);
    const dateUpdated = data.created_at.split('T').shift();
    setDisplayDate(dateUpdated);
    setPhotoPath(data.photo.split('photos/').pop());
    setLoading(false);
  }, [isEditing]);

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this photo?')) {
      await deletePhoto(photo.id);
      await deleteBucket(photoPath);
      history.goBack();
    }
  };

  const handleEdit = async () => {
    try {
      await updatePhoto(newCaption, photo.id);
      setIsEditing(false);
    } catch (error) {
      alert(error);
    }
  };

  if (loading) return <span className={spinner}></span>;

  return (
    <div className={privateView}>
      {clickPhoto ? (
        <></>
      ) : (
        <>
          <img src={photo.photo} />
          <div className={details}>
            {isEditing ? (
              <div className={editing}>
                <input
                  placeholder="New Caption"
                  type="text"
                  defaultValue={photo.caption}
                  onChange={(e) => setNewCaption(e.target.value)}
                />
                <button onClick={handleEdit}>Update</button>
                <button className={deleteButton} onClick={() => handleDelete()}>
                  Delete Photo
                </button>
                <button onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            ) : (
              <>
                <Link to={`/${photo.username}`} className={userName}>
                  @{photo.username}
                </Link>
                <span className={caption}>{photo.caption}</span>
                <span className={date}> posted {displayDate}</span>
                {photo.username === username && (
                  <button onClick={() => setIsEditing(true)}>Edit</button>
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
