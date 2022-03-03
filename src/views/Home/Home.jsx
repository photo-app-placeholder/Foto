import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchRandomPhotos } from '../../services/photos';
import styles from './Home.css';

const { home } = styles;
export default function Home() {
  const [randomPhotoArray, setRandomPhotoArray] = useState([{}]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchRandomPhotos();
      const randomData = data.sort((a, b) => 0.5 - Math.random());
      setRandomPhotoArray(randomData);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <h1>LOADING...</h1>;

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
