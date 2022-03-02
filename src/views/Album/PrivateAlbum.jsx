import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { findAlbumById } from '../../services/albums';
import { fetchPhotosByAlbumId } from '../../services/photos';
import './PrivateAlbum.css';

export default function PrivateAlbum() {
  const [loading, setLoading] = useState(true);
  const [enterCode, setEnterCode] = useState('');
  const [photos, setPhotos] = useState([]);
  const [currentAlbum, setCurrentAlbum] = useState({});
  const { album } = useParams();
  const [isEntering, setIsEntering] = useState(true);

  useEffect(() => {
    findAlbumById(album)
      .then((data) => setCurrentAlbum(data))
      .finally(() => setLoading(false));
    fetchPhotosByAlbumId(album).then((data) => setPhotos(data));
  }, []);

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      if (enterCode === currentAlbum.code) {
        alert('correct');
        setIsEntering(false);
      } else {
        alert('incorrect');
      }
    } catch {
      throw new Error('error');
    }
  };

  return (
    <div>
      {isEntering === false && (
        <>
          {photos.map((photo) => (
            <div key={photo.id}>
              <img src={photo.photo} />
            </div>
          ))}
        </>
      )}

      <form className="hide">
        {isEntering ? (
          <>
            <label>Enter Password: </label>
            <input
              type="password"
              value={enterCode}
              onChange={(e) => setEnterCode(e.target.value)}
            ></input>
            <button onClick={handleSubmit}>Enter</button>
          </>
        ) : null}
      </form>
    </div>
  );
}
