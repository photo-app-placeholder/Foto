import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { signOutUser } from '../../services/users';

export default function Header() {
  const { user, setUser } = useUser();

  const handleLogout = async () => {
    await signOutUser();
    setUser({});
  };
  return (
    <header>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/noodles">Your Profile</Link>
      <Link to="/noodles/album1">Album1</Link>
      <Link to="/newAlbum">Add Album</Link>
      <Link to="/addImage">Add Image</Link>
      <Link to="/noodles/album1/photo1">Album1's photo</Link>
      <Link to="/noodles/album1/photo1/edit">Edit Album1's photo</Link>
      <button onClick={handleLogout}>Log Out</button>
    </header>
  );
}
