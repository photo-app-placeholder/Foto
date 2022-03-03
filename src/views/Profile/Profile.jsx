import React, { useEffect, useState } from 'react';
import {
  fetchAlbumsByUser,
  fetchAlbumsByUserIdByUsername,
} from '../../services/albums';
import { useUser } from '../../context/UserContext';
import styles from './Profile.css';
import folderImage from '../../assets/folder.jpg';
import locked from '../../assets/locked.png';
import { Link, useParams } from 'react-router-dom';
import profileHook from '../../hooks/profileHook';

const { albumDiv, albumCard } = styles;

export default function Profile() {
  const { user } = useUser();
  const { profile } = profileHook();
  const { profUsername } = profile[0] || '';
  const { username } = useParams();
  const [loading, setLoading] = useState(true);

  const [albums, setAlbums] = useState([{}]);

  useEffect(() => {
    const fetchData = async () => {
      const data2 = await fetchAlbumsByUserIdByUsername(username);
      const dataUser = data2[0].user_id;
      console.log(dataUser);
      const data = await fetchAlbumsByUser(dataUser);
      setAlbums(data);
      setLoading(false);
    };
    fetchData();
  }, [username]);

  return (
    <div className={albumDiv}>
      <div>
        <Link to="/newAlbum">New Album</Link>
        <Link to="/addImage">Add Image</Link>
      </div>
      {loading && <h1>LOADING...</h1>}
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
