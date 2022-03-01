import React, { useEffect, useState } from 'react';
import { fetchAlbumsByUser } from '../../services/albums';
import { useUser } from '../../context/UserContext';
import styles from './Profile.css';
import folderImage from '../../assets/folder.jpg';
import { Link } from 'react-router-dom';
import profileHook from '../../hooks/profileHook';

const { albumDiv } = styles;

export default function Profile() {
  const { user } = useUser();
  const { profile } = profileHook();
  const { username } = profile[0];

  console.log(username);

  const [albums, setAlbums] = useState([{}]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAlbumsByUser(user.id);
      setAlbums(data);
      console.log(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      {albums.map((album) => (
        <Link
          to={`/${username}/${album.title}`}
          key={album.id}
          className={albumDiv}
        >
          <img src={folderImage} />
          <h3>{album.title}</h3>
        </Link>
      ))}
    </div>
  );
}
