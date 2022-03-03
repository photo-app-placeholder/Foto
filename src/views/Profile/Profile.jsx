import React, { useEffect, useState } from 'react';
import { fetchAlbumsByUser } from '../../services/albums';
import { useUser } from '../../context/UserContext';
import styles from './Profile.css';
import folderImage from '../../assets/folder.jpg';
import locked from '../../assets/locked.png';
import { Link } from 'react-router-dom';
import profileHook from '../../hooks/profileHook';

const { albumDiv, albumCard } = styles;

export default function Profile() {
  const { user } = useUser();
  const { profile } = profileHook();
  const { username } = profile[0] || '';

  const [albums, setAlbums] = useState([{}]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAlbumsByUser(user.id);
      setAlbums(data);
    };
    fetchData();
  }, []);

  return (
    <div className={albumDiv}>
      <div>
        <Link to="/newAlbum">New Album</Link>
        <Link to="/addImage">Add Image</Link>
      </div>
      <div className={albumCard}>
        {albums.map((album) =>
          album.private_public ? (
            // private
            <Link
              to={`/${username}/${album.id}/unlock`}
              key={album.id}
              className={albumDiv}
            >
              <div>
                <img src={locked} />
                <h3>{album.title}</h3>
              </div>
            </Link>
          ) : (
            // public
            <Link
              to={`/${username}/${album.id}`}
              key={album.id}
              className={albumDiv}
            >
              <div>
                <img src={folderImage} />
                <h3>{album.title}</h3>
              </div>
            </Link>
          )
        )}
      </div>
    </div>
  );
}
