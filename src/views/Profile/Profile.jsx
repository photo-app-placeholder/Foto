import React, { useEffect, useState } from 'react';
import {
  fetchAlbumsByUser,
  fetchAlbumsByUserIdByUsername,
} from '../../services/albums';
import { useUser } from '../../context/UserContext';
import styles from './Profile.css';
import folderImage from '../../assets/folder.jpg';
import locked from '../../assets/locked.png';
import { Link, NavLink, useParams } from 'react-router-dom';
import profileHook from '../../hooks/profileHook';
import { findPhotoById } from '../../services/photos';
import { getProfile, getProfileByUserId } from '../../services/profiles';

const { albumDiv, albumCard, alert, spinner } = styles;

export default function Profile() {
  const { username } = useParams();
  const [loading, setLoading] = useState(true);
  const [albumUser, setAlbumUser] = useState('');
  const [currentUser, setCurrentUser] = useState({});

  const { user } = useUser();

  const [albums, setAlbums] = useState([{}]);
  useEffect(() => {
    const fetchData = async () => {
      const data2 = await fetchAlbumsByUserIdByUsername(username);
      setAlbumUser(data2[0].username);
      const data = await fetchAlbumsByUser(data2[0].user_id);
      setAlbums(data);
      const data3 = await getProfileByUserId(user.id);
      setCurrentUser(data3[0]);

      setLoading(false);
    };
    fetchData();
  }, [username, loading]);
  if (loading) return <span className={spinner}></span>;
  return (
    <div className={albumDiv}>
      {!loading && (
        <>
          <h1>@{albumUser}</h1>
          <div>
            {albumUser === currentUser.username && (
              <>
                <Link to="/newAlbum">New Album</Link>
              </>
            )}
            {albumUser === currentUser.username && albums.length >= 1 && (
              <Link to="/addImage">Add Image</Link>
            )}
          </div>
          <div className={albumCard}>
            {albums.length >= 1
              ? albums.map((album) =>
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
                )
              : albumUser === currentUser.username && (
                  <span className={alert}>
                    Your albums will go here. Make a new album to get started.{' '}
                  </span>
                )}
          </div>
        </>
      )}
    </div>
  );
}
