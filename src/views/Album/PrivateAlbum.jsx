import React, { useEffect, useRef, useState } from 'react';
import { render } from 'react-dom';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Link, Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import profileHook from '../../hooks/profileHook';
import { findAlbumById } from '../../services/albums';
import { fetchPhotosByAlbumId, findPhotoById } from '../../services/photos';
import ImageView from './ImageView';
import styles from './PrivateAlbum.css';
import PrivatePhoto from './PrivatePhoto';
const { privateAlbum } = styles;
export default function PrivateAlbum() {
  const [loading, setLoading] = useState(true);
  const [enterCode, setEnterCode] = useState('');
  const [photos, setPhotos] = useState([]);
  const [currentAlbum, setCurrentAlbum] = useState({});
  const { album } = useParams();
  const [isEntering, setIsEntering] = useState(true);
  const [clickPhoto, setClickPhoto] = useState(true);
  const [paramsPhoto, setParamsPhoto] = useState('');
  const [currentPhoto, setCurrentPhoto] = useState('');

  console.log(paramsPhoto);
  useEffect(() => {
    findAlbumById(album)
      .then((data) => setCurrentAlbum(data))
      .finally(() => setLoading(false));
    fetchPhotosByAlbumId(album).then((data) => setPhotos(data));
    findPhotoById(paramsPhoto).then((data) => setCurrentPhoto(data));
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
      console.log(rando);
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
          {photos.map((photo) => (
            <a onClick={handlePhotoClick}>
              <img id={photo.id} src={photo.photo} />
            </a>
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
