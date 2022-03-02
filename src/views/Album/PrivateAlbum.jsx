import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

import { findAlbumById } from '../../services/albums';
import { fetchPhotosByAlbumId } from '../../services/photos';

import styles from './PrivateAlbum.css';
import PrivatePhoto from './PrivatePhoto';
const { privateAlbum, title, entering } = styles;

export default function PrivateAlbum() {
  const [loading, setLoading] = useState(true);
  const [enterCode, setEnterCode] = useState('');
  const [photos, setPhotos] = useState([]);
  const [currentAlbum, setCurrentAlbum] = useState({});
  const { album } = useParams();
  const [isEntering, setIsEntering] = useState(true);
  const [clickPhoto, setClickPhoto] = useState(true);
  const [paramsPhoto, setParamsPhoto] = useState('');

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

  const handlePhotoClick = async (e) => {
    try {
      e.preventDefault();
      setParamsPhoto(e.target.id);
      setClickPhoto(false);
      alert('click');
    } catch {
      throw new Error('yoinks');
    }
  };
  return (
    <div className={privateAlbum}>
      {clickPhoto === false && (
        <PrivatePhoto
          clickPhoto={clickPhoto}
          setClickPhoto={setClickPhoto}
          paramsPhoto={paramsPhoto}
        />
      )}
      {isEntering === false && clickPhoto === true && (
        <>
          <div className={title}>
            <h1>{currentAlbum.title}</h1>
            <Link to="/addImage">Add Image</Link>
          </div>
          {photos.map((photo) => (
            <a onClick={handlePhotoClick}>
              <img id={photo.id} src={photo.photo} />
            </a>
          ))}
        </>
      )}

      <form className={entering}>
        {isEntering ? (
          <>
            <input
              type="password"
              value={enterCode}
              placeholder="Access Code"
              onChange={(e) => setEnterCode(e.target.value)}
            ></input>
            <button onClick={handleSubmit}>Enter</button>
          </>
        ) : null}
      </form>
    </div>
  );
}
