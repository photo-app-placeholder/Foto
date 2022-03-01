import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { signOutUser } from '../../services/users';
import profileHook from '../../hooks/profileHook';

export default function Header() {
  const { user, setUser } = useUser();
  const { profile } = profileHook();
  const { username } = profile[0];

  const handleLogout = async () => {
    await signOutUser();
    setUser({});
  };
  return (
    <header>
      <h1>{user.email}</h1>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Link to={`/${username}`}>Your Profile</Link>
      <Link to="/newAlbum">Add Album</Link>
      <Link to="/addImage">Add Image</Link>
      <Link to="/noodles/album1/photo1/edit">Edit Album1's photo</Link>
      {user.email && <button onClick={handleLogout}>Log Out</button>}
    </header>
  );
}
