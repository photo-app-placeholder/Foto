import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { findAlbumById } from '../../services/albums';
import { findPhotoById } from '../../services/photos';

export default function AlbumView() {
  const [currentAlbum, setCurrentAlbum] = useState({});
  const { album } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const data = await findAlbumById(album);
      setCurrentAlbum(data);
      console.log(data);
      const data2 = a;
    };
    fetchData();
  }, [album]);

  return <div></div>;
}
