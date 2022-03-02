import React, { useEffect, useState } from 'react';
import { fetchRandomPhotos } from '../../services/photos';

export default function Home() {
  const [randomPhotoArray, setRandomPhotoArray] = useState([{}]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchRandomPhotos();
      setRandomPhotoArray(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      {randomPhotoArray.map((photo) => (
        <div key={photo.id}>
          <img src={photo.photo} alt="random photo" />
        </div>
      ))}
    </div>
  );
}
