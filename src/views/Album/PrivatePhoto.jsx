import React, { useEffect, useState } from 'react';
import { findPhotoById } from '../../services/photos';
import './PrivateAlbum.css';

export default function PrivatePhoto({
  clickPhoto = true,
  setClickPhoto,
  paramsPhoto,
}) {
  const [loading, setLoading] = useState(true);
  const [photo, setPhoto] = useState({});
  console.log(paramsPhoto);

  useEffect(async () => {
    await findPhotoById(paramsPhoto)
      .then((data) => setPhoto(data))
      .finally(() => setLoading(false));
  }, []);
  console.log(photo);
  return (
    <div>
      {clickPhoto ? (
        <></>
      ) : (
        <>
          <div>
            <img src={photo.photo} />
            <span>{photo.caption}</span>
            <span>{photo.created_at}</span>
            <a onClick={(e) => setClickPhoto(true)}>back</a>
          </div>
        </>
      )}
    </div>
  );
}
