import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { fetchRandomPhotos } from '../../services/photos';
import { getProfileByUserId } from '../../services/profiles';
import styles from './Home.css';

const { home } = styles;
export default function Home() {
  const [randomPhotoArray, setRandomPhotoArray] = useState([{}]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchRandomPhotos();
      const randomData = data.sort((a, b) => 0.5 - Math.random());
      setRandomPhotoArray(randomData);
      const data2 = await getProfileByUserId();
      console.log(data);
    };
    fetchData();
  }, []);

  return (
    <div className={home}>
      {randomPhotoArray.map((photo) => (
        <Link
          to={`/${photo.username}/${photo.album_id}/${photo.id}`}
          key={photo.id}
        >
          <img src={photo.photo} />
        </Link>
      ))}
    </div>
  );
}
